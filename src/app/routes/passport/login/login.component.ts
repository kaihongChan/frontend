import { SettingsService, _HttpClient } from '@delon/theme';
import { Component, OnDestroy, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { ReuseTabService } from '@delon/abc';
import { StartupService } from '@core';

@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [],
})
export class UserLoginComponent implements OnDestroy {

  form: FormGroup;

  constructor(
    fb: FormBuilder,
    modalSrv: NzModalService,
    private router: Router,
    private settingsService: SettingsService,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private startupSrv: StartupService,
    public http: _HttpClient,
    public msg: NzMessageService,
  ) {
    this.form = fb.group({
      username: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, Validators.required],
      remember: [false],
    });
    modalSrv.closeAll();
  }

  // #region fields

  get username() {
    return this.form.controls.username;
  }

  get password() {
    return this.form.controls.password;
  }

  get remember() {
    return this.form.controls.remember;
  }

  /**
   * 登录
   */
  submit() {
    this.username.markAsDirty();
    this.username.updateValueAndValidity();
    this.password.markAsDirty();
    this.password.updateValueAndValidity();
    if (this.username.invalid || this.password.invalid) {
      return;
    }

    // 默认配置中对所有HTTP请求都会强制 [校验](https://ng-alain.com/auth/getting-started) 用户 Token
    // 然一般来说登录请求不需要校验，因此可以在请求URL加上：`/login?_allow_anonymous=true` 表示不触发用户 Token 校验
    this.http.post('admin/login/password?_allow_anonymous=true', {
      username: this.username.value,
      password: this.password.value,
      remember: this.remember.value,
    }).subscribe((res: any) => {
      const responseData = res.data;
      // 清空路由复用信息
      this.reuseTabService.clear();
      // 设置用户Token信息
      this.tokenService.set({ token: responseData.token.access_token, ...responseData.token });
      this.settingsService.setUser(responseData.user);
      // 重新获取 StartupService 内容，我们始终认为应用信息一般都会受当前用户授权范围而影响
      this.startupSrv.load().then(() => {
        let url = this.tokenService.referrer!.url || '/';
        if (url.includes('/passport')) {
          url = '/';
        }
        this.router.navigateByUrl(url);
      });
    });
  }

  ngOnDestroy(): void {

  }
}
