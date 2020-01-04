import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService, UploadFile } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { Observable, Observer, zip } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-system-user-edit',
  templateUrl: './edit.component.html',
})
export class SystemUserEditComponent implements OnInit {
  record: any = {};
  i: any;
  validateForm: FormGroup;
  controlsConfig = {
    id: [null, []],
    name: ['', [Validators.required]],
    nickname: ['', []],
    email: ['', [Validators.email, Validators.required]],
    roles: [[], [Validators.required]],
    departments: [[], [Validators.required]],
    avatar: ['', []],
  };
  roleOptionList: any[] = [];
  deptOptionList: any[] = [];
  loading = false;
  avatarUrl: string;
  avatarAction = 'api/system/users/uploadAvatar';

  /**
   * 构造函数
   * @param modal modal
   * @param msgSrv msgSrv
   * @param http http
   * @param fb fb
   */
  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private fb: FormBuilder,
  ) {
    this.validateForm = this.fb.group(this.controlsConfig);
  }

  /**
   * 密码校验
   * @param control control
   */
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  /**
   * 密码校验
   */
  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  /**
   * 组件初始化
   */
  ngOnInit(): void {
    // 密码&确认密码验证
    if (!this.record.id) {
      this.validateForm.addControl('password', new FormControl(null, Validators.required));
      this.validateForm.addControl('checkPassword',
        new FormControl(null, [Validators.required, this.confirmationValidator]));
    }
    zip(
      this.http.get(`admin/roles/all`),
      this.http.get(`admin/departments`),
    ).pipe(
      // 接收其他拦截器后产生的异常消息
      catchError((data) => {
        return data;
      }),
    ).toPromise().then(res => {
      this.roleOptionList = res[0].data;
      this.deptOptionList = res[1].data;
      if (this.record.id) {
        this.http.get(`admin/users/` + this.record.id).subscribe(response => {
          const responseData = response.data;
          responseData.roles.forEach((value, index) => {
            responseData.roles[index] = parseInt(value.id, 10);
          });
          responseData.departments.forEach((value, index) => {
            responseData.departments[index] = parseInt(value.id, 10);
          });
          // 表单数据绑定
          this.validateForm.patchValue(responseData);

          this.avatarUrl = responseData.avatar ? responseData.avatar : './assets/tmp/img/avatar.jpg';
          this.i = responseData;
        });
      }
    });
  }

  /**
   * 图片校验
   * @param file 文件
   */
  beforeUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msgSrv.error('图片不能大于2M');
        observer.complete();
        return;
      }
      // check height
      this.checkImageDimension(file).then(dimensionRes => {
        if (!dimensionRes) {
          this.msgSrv.error('图片大小300*300');
          observer.complete();
          return;
        }
        observer.next(isLt2M && dimensionRes);
        observer.complete();
      });
    });
  };

  /**
   *
   * @param img ''
   * @param callback ''
   */
  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  /**
   *
   * @param file 文件
   */
  private checkImageDimension(file: File): Promise<boolean> {
    return new Promise(resolve => {
      const img = new Image();
      img.src = window.URL.createObjectURL(file);
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        window.URL.revokeObjectURL(img.src!);
        resolve(width === height && width >= 300);
      };
    });
  }

  /**
   * 上传
   * @param info ''
   */
  handleChange(info: { file: UploadFile }): void {
    console.log(info.file);
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
          console.log(this.avatarUrl);
        });
        this.i.avatar = info.file.response.path;
        break;
      case 'error':
        this.msgSrv.error('网络错误');
        this.loading = false;
        break;
    }
  }

  /**
   * 表单提交
   * @param formData ''
   */
  submitForm(formData: any) {
    if (formData.id) {
      this.http.put(`admin/users/${formData.id}`, formData).subscribe(() => {
        this.msgSrv.success('更新成功！');
        this.modal.close(true);
      });
    } else {
      this.http.post(`admin/users`, formData).subscribe(() => {
        this.msgSrv.success('保存成功！');
        this.modal.close(true);
      });
    }
  }

  /**
   * 关闭弹窗
   */
  close() {
    this.modal.destroy();
  }
}
