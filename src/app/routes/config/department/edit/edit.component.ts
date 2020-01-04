import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService, NzTreeNodeOptions, NzTreeNode } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-system-menu-edit',
  templateUrl: './edit.component.html',
})
export class ConfigDepartmentEditComponent implements OnInit {
  record: any = {};
  i: any;
  validateForm: FormGroup;
  controlsConfig = {
    id: [0, null],
    pid: [0, null],
    name: ['', [Validators.required]],
  };
  deptOptionList: (NzTreeNodeOptions | NzTreeNode)[] = [];

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private fb: FormBuilder,
  ) {
    this.validateForm = this.fb.group(this.controlsConfig);
  }

  ngOnInit(): void {
    this.http.get(`admin/departments`).toPromise().then(res => {
      this.deptOptionList  = res.data;
      console.log(res.data);
      if (this.record.key) {
        this.http.get(`admin/departments/` + this.record.key).subscribe(response => {
          const responseData = response.data;
          this.validateForm.patchValue(responseData);
          this.i = responseData;
        });
      }
      if (this.i && this.i.pid) {
        this.validateForm.get('pid').setValue(this.i.pid);
      }
    });

    console.log(this.i);
  }

  /**
   * 表单提交
   */
  submitForm(formData: any) {
    if (formData.id > 0) {
      this.http.put(`admin/departments/` + formData.id, formData).subscribe(() => {
        this.msgSrv.success('更新成功');
        this.modal.close(true);
      });
    } else {
      this.http.post(`admin/departments`, formData).subscribe(() => {
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
