import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService, TransferChange } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-system-policy-edit',
  templateUrl: './edit.component.html',
})
export class SystemPolicyEditComponent implements OnInit {
  record: any = {};
  i: any;
  validateForm: FormGroup;
  controlsConfig = {
    id: ['', null],
    identify: ['', [Validators.required]],
    name: ['', [Validators.required]],
    permissions: ['', [Validators.required]],
    description: ['', []],
  };
  permissions = [];

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private fb: FormBuilder,
  ) {
    this.validateForm = this.fb.group(this.controlsConfig);
  }

  /**
   * 组件初始化
   */
  ngOnInit(): void {
    this.http.get(`admin/permissions/all`).toPromise().then(res => {
      const permissionsTmp = [];
      res.data.forEach(value => {
        permissionsTmp.push({
          key: value.id.toString(),
          title: value.name + '【' + value.route_name + '】',
        });
      });
      this.permissions = [...permissionsTmp];

      if (this.record && this.record.id) {
        this.http.get(`admin/policies/` + this.record.id).subscribe(response => {
          const responseData = response.data;
          responseData.permissions.forEach((value, index) => {
            responseData.permissions[index] = parseInt(value.id, 10);
          });
          this.permissions.forEach(val => {
            if (responseData.permissions.indexOf(parseInt(val.key, 10)) !== -1) {
              val.direction = 'right';
            }
          });
          // 表单数据绑定
          this.validateForm.patchValue(responseData);
          this.i = responseData;
        });
      }
    });
  }

  /**
   * 表单提交
   *
   * @param formData 表单参数
   */
  submit(formData: any) {
    if (formData.id) {
      this.http.put(`admin/policies/` + formData.id, formData).subscribe(() => {
        this.msgSrv.success('更新成功！');
        this.modal.close(true);
      });
    } else {
      this.http.post(`admin/policies`, formData).subscribe(() => {
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

  /**
   * 选项在两栏之间转移时的回调函数
   *
   * @param event ''
   */
  transferChange(event: TransferChange) {
    let permissionsTmp = [];
    if (event.from === 'left' && event.to === 'right') {
      event.list.forEach(value => {
        permissionsTmp.push(parseInt(value.key, 10));
      });
    } else {
      event.list.forEach(val => {
        permissionsTmp = permissionsTmp.filter(value => value !== parseInt(val.key, 10));
      });
    }

    this.validateForm.get('permissions').setValue(permissionsTmp);
  }
}
