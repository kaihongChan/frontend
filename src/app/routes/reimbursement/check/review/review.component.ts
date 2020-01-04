import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reimbursement-check-review',
  templateUrl: './review.component.html',
})
export class ReimbursementCheckReviewComponent implements OnInit {
  record: any = {};
  validateForm: FormGroup;
  controlsConfig = {
    id: [null, null],
    action: ['', [Validators.required]],
    remarks: ['', []],
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
    this.validateForm.patchValue({
      id: this.record.id,
    });
  }

  /**
   * 表单提交
   * @param formData 表单参数
   */
  submitForm(formData: any) {
    this.http.post(`admin/reimbursement/audit`, formData).subscribe(() => {
      this.msgSrv.success('更新成功！');
      this.modal.close(true);
    });
  }

  /**
   * 关闭弹窗
   */
  close() {
    this.modal.destroy();
  }
}
