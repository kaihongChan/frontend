import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService, NzTreeNodeOptions, NzTreeNode, toBoolean } from 'ng-zorro-antd';
import { _HttpClient, Menu } from '@delon/theme';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-system-menu-edit',
  templateUrl: './edit.component.html',
})
export class SystemMenuEditComponent implements OnInit {
  record: any = {};
  i: any;
  validateForm: FormGroup;
  controlsConfig = {
    id: [0, null],
    pid: [0, null],
    name: ['', [Validators.required]],
    type: [0, [Validators.required]],
    i18n: ['', [Validators.required]],
    roles: [[], null],
    icon: ['', null],
    sort: [0, null],
  };
  menuOptionList: (NzTreeNodeOptions | NzTreeNode)[] = [];
  roleOptionList: any[] = [];
  linkControlShow = false;

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private fb: FormBuilder,
  ) {
    this.validateForm = this.fb.group(this.controlsConfig);
  }

  ngOnInit(): void {
    zip(
      this.http.get(`admin/menus`),
      this.http.get(`admin/roles/all`),
    ).pipe(
      // 接收其他拦截器后产生的异常消息
      catchError((data) => {
        return data;
      }),
    ).toPromise().then(res => {
      this.menuOptionList = res[0].data || [];
      this.roleOptionList = res[1].data || [];
      if (this.record.key) {
        this.http.get(`admin/menus/${this.record.key}`).subscribe(response => {
          const responseData = response.data;
          responseData.roles.forEach((value, index) => {
            responseData.roles[index] = parseInt(value.id, 10);
          });
          // 表单数据绑定
          Object.keys(this.controlsConfig).map(controlsConfigKey => {
            this.validateForm.get(controlsConfigKey).setValue(responseData[controlsConfigKey]);
          });
          this.linkControlShow = toBoolean(responseData.type);
          this.typeChange(responseData.link);
          this.i = responseData;
        });
      }

      if (this.i && this.i.pid) {
        this.validateForm.get('pid').setValue(this.i.pid);
      }
    });
  }

  /**
   * 类型切换事件
   */
  typeChange(value?: string) {
    if (this.validateForm.get('type').value > 0) {
      this.linkControlShow = true;
      this.validateForm.addControl('link',
        new FormControl(value, Validators.required));
    } else {
      this.linkControlShow = false;
      this.validateForm.removeControl('link');
    }
  }

  /**
   * 表单提交
   */
  submitForm(formData: any) {
    if (formData.id > 0) {
      this.http.put(`admin/menus/${formData.id}`, formData).subscribe(() => {
        this.msgSrv.success('更新成功');
        this.modal.close(true);
      });
    } else {
      this.http.post(`admin/menus`, formData).subscribe(() => {
        this.msgSrv.success('创建成功！');
        this.modal.close(true);
      });
    }
  }

  /**
   * 关闭
   */
  close() {
    this.modal.destroy();
  }
}
