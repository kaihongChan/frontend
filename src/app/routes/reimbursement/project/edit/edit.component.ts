import { Component, OnInit} from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reimbursement-project-edit',
  templateUrl: './edit.component.html',
})
export class ReimbursementProjectEditComponent implements OnInit {
  record: any = {};
  i: any;
  validateForm: FormGroup;
  controlsConfig = {
    id: [null, null],
    name: ['', [Validators.required]],
    description: ['', []],
  };

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
    if (this.record.id) {
      this.http.get(`admin/reimbursement_projects/` + this.record.id).subscribe(res => {
        const responseData = res.data;
        this.validateForm.patchValue(responseData);
        this.i = responseData;
      });
    }
  }

  /**
   * 表单提交
   * @param formData 表单参数
   */
  save(formData: any) {
    if (formData.id) {
      this.http.put(`admin/reimbursement_projects/${formData.id}`, formData).subscribe(() => {
        this.msgSrv.success('更新成功！');
        this.modal.close(true);
      });
    } else {
      this.http.post(`admin/reimbursement_projects`, formData).subscribe(() => {
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
