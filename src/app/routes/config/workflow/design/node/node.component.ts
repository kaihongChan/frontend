import { Component, OnInit } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { ConfigWorkflowDesignNodeReviewerSetComponent } from './reviewer-set/reviewer-set.component';

@Component({
  selector: 'app-config-workflow-design-node',
  templateUrl: './node.component.html',
})
export class ConfigWorkflowDesignNodeComponent implements OnInit {
  validateForm: FormGroup;
  record: any = {};
  node: any;
  controlsConfig = {
    id: [null, []],
    workflow_id: [null, [Validators.required]],
    name: [null, [Validators.required]],
    position_x: [null, []],
    position_y: [null, []],
    type: [0, [Validators.required]],
    mode: [0, [Validators.required]],
    roles: [null, []],
    users: [null, []],
  };

  constructor(
    private http: _HttpClient,
    private fb: FormBuilder,
    private msgSrv: NzMessageService,
    private modal: NzModalRef,
    private modalHelper: ModalHelper,
  ) {
    this.validateForm = this.fb.group(this.controlsConfig);
  }

  ngOnInit() {
    if (this.record.id > 0) {
      this.http.get(`admin/workflow_nodes/` + this.record.id).subscribe(response => {
        const responseData = response.data;
        this.validateForm.patchValue(responseData);
        this.node = responseData;
      });
    } else {
      const recordData = {
        workflow_id: parseInt(this.record.workflow_id, 10),
        position_x: this.record.x,
        position_y: this.record.y,
      };
      this.validateForm.patchValue(recordData);
      this.node = recordData;
    }
  }

  /**
   * 表单提交
   *
   * @param formData 表单数据
   */
  submitForm(formData: any) {
    if (formData.id) {
      this.http.put(`admin/workflow_nodes/` + formData.id, formData).subscribe(res => {
        this.msgSrv.success(res.message);
        this.modal.close(res.data);
      });
    } else {
      this.http.post(`admin/workflow_nodes`, formData).subscribe(res => {
        this.msgSrv.success(res.message);
        this.modal.close(res.data);
      });
    }
  }

  /**
   * 审核人设置
   * @param node 节点
   */
  reviewerSet(node: any) {
    this.modalHelper.createStatic(ConfigWorkflowDesignNodeReviewerSetComponent, {
      record: node,
    }, {
      size: 'lg',
      modalOptions: {
        nzOnCancel: () => {

        },
      },
    }).subscribe(res => {
      if (res) {

      }
    });
  }

  close() {
    this.modal.triggerCancel();
  }

}
