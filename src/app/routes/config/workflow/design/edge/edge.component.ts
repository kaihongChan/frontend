import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { objectKeys } from 'codelyzer/util/objectKeys';

@Component({
  selector: 'app-config-workflow-design-edge',
  templateUrl: './edge.component.html',
  styles: [`
    .dynamic-delete-button {
      cursor: pointer;
      position: relative;
      top: 2px;
      left: 6px;
      font-size: 20px;
      color: #ff4d4f;
      max-width: 4%;
      vertical-align: middle;
    }`,
  ],
})
export class ConfigWorkflowDesignEdgeComponent implements OnInit {
  validateForm: FormGroup;
  record: any = {};
  edge: any;
  clearHidden = true;
  conditionColumns: any[] = [];
  relationalOperators: string[] = [];
  logicalOperators: string[] = [];
  controlsConfig: any = {
    id: [null, []],
    workflow_id: [null, [Validators.required]],
    source: [null, [Validators.required]],
    target: [null, [Validators.required]],
    label: [null, []],
    conditions: this.fb.array([]),
  };
  conditionControlsConfig: any = {
    column: [null, [Validators.required]],
    relational_operator: [null, [Validators.required]],
    value: [null, [Validators.required]],
  };

  constructor(
    private http: _HttpClient,
    private modalRef: NzModalRef,
    private msgSrv: NzMessageService,
    private fb: FormBuilder,
  ) {
    this.validateForm = this.fb.group(this.controlsConfig);
  }

  ngOnInit() {
    zip(
      this.http.get(`admin/reimbursement/columns`),
      this.http.get(`admin/reimbursement/operators`),
    ).pipe(
      catchError((data) => {
        return data;
      }),
    ).toPromise().then(resp => {
      this.conditionColumns = resp[0].data;
      this.relationalOperators = resp[1].data.relational_operators;
      this.logicalOperators = resp[1].data.logical_operators;
      if (this.record.id) {
        this.http.get(`admin/workflow_edges/${this.record.id}`).subscribe(res => {
          const responseData = res.data;
          const condition = responseData.condition;
          objectKeys(condition).forEach((v, i) => {
            const field = this.createCondition();
            field.patchValue(condition[i]);
            this.conditions.push(field);
            this.clearHidden = false;
          });
          const edge = {
            ...responseData, ...{
              workflow_id: parseInt(this.record.workflow_id, 10),
              source: parseInt(this.record.source, 10),
              target: parseInt(this.record.target, 10),
              source_node: this.record.source_node,
              target_node: this.record.target_node,
            },
          };
          this.validateForm.patchValue(edge);
          this.edge = edge;
        });
      } else {
        const recordData = {
          workflow_id: parseInt(this.record.workflow_id, 10),
          source: parseInt(this.record.source, 10),
          target: parseInt(this.record.target, 10),
          source_node: this.record.source_node,
          target_node: this.record.target_node,
        };
        this.validateForm.patchValue(recordData);
        this.edge = recordData;
      }
    });

  }

  /**
   * 表单提交
   * @param formData 表单数据
   */
  submitForm(formData: any) {
    if (formData.id) {
      this.http.put(`admin/workflow_edges/${formData.id}`, formData).subscribe(res => {
        this.msgSrv.success(res.message);
        this.modalRef.close(res.data);
      });
    } else {
      this.http.post(`admin/workflow_edges`, formData).subscribe(res => {
        this.msgSrv.success(res.message);
        this.modalRef.close(res.data);
      });
    }
  }

  close() {
    this.modalRef.triggerCancel();
  }

  /**
   * 清空条件设置
   */
  removeCondition() {
    this.clearHidden = true;
    this.conditions.clear();
  }

  /**
   * 获取条件
   */
  get conditions() {
    return this.validateForm.controls.conditions as FormArray;
  }

  /**
   * 创建条件formGroup
   */
  createCondition(logicalOperator = false): FormGroup {
    delete this.conditionControlsConfig.logical_operator;
    if (logicalOperator) {
      this.conditionControlsConfig.logical_operator = [null, [Validators.required]];
    }
    return this.fb.group(this.conditionControlsConfig);
  }

  /**
   * 删除条件
   * @param index 下标
   */
  delCondition(index: number) {
    this.conditions.removeAt(index);
    if (this.conditions.length === 0) {
      this.clearHidden = true;
    } else if (this.conditions.length === 1) {
      const value: any = this.conditions.at(0).value;
      this.conditions.clear();
      this.conditions.push(this.createCondition());
      this.conditions.at(0).patchValue(value);
    }
  }

  /**
   * 添加条件
   */
  addCondition() {
    this.clearHidden = false;
    if (this.conditions.length === 0) {
      this.conditions.push(this.createCondition());
    } else {
      this.conditions.push(this.createCondition(true));
    }
  }

}
