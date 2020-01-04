import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-reimbursement-apply-edit',
  templateUrl: './edit.component.html',
})
export class ReimbursementApplyEditComponent implements OnInit {
  record: any = {};
  i: any;
  editIndex = -1;
  editObj = {};
  validateForm: FormGroup;
  controlsConfig = {
    id: [null, null],
    name: ['', [Validators.required]],
    type_id: ['', [Validators.required]],
    remarks: ['', []],
    attachments: this.fb.array([]),
    details: this.fb.array([]),
  };
  typeOptionList = [];
  projectOptionList = [];
  isLoading = false;
  projects = {};

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
    private fb: FormBuilder,
  ) {
    this.validateForm = this.fb.group(this.controlsConfig);
  }

  /**
   * 组件初始化
   */
  ngOnInit(): void {
    zip(
      this.http.get(`admin/reimbursement_types/all`),
      this.http.get(`admin/reimbursement_projects/all`),
    ).pipe(
      catchError((data) => {
        return data;
      }),
    ).toPromise().then(resp => {
      this.typeOptionList = resp[0].data;
      this.projectOptionList = resp[1].data;
      this.projectOptionList.forEach((value) => {
        this.projects[value.id] = value.name;
      });
      if (this.record.id) {
        this.http.get(`admin/reimbursements/${this.record.id}`).subscribe(res => {
          const responseData = res.data;
          const details = responseData.details;
          details.forEach(i => {
            const field = this.createDetail();
            field.patchValue(i);
            this.details.push(field);
          });
          this.validateForm.patchValue(responseData);
          this.i = responseData;
        });
      }
    });


  }

  /**
   * 获取
   */
  get details() {
    return this.validateForm.controls.details as FormArray;
  }

  /**
   * 表单提交
   * @param formData 表单参数
   */
  save(formData: any) {
    for (const detailsKey in formData.details) {
      if (formData.details[detailsKey]) {
        formData.details[detailsKey].date =
          formatDate(formData.details[detailsKey].date, 'yyyy-MM-dd', 'zh');
      }
    }
    if (formData.id) {
      this.http.put(`admin/reimbursements/${formData.id}`, formData).subscribe(() => {
        this.msgSrv.success('更新成功！');
        this.modal.close(true);
      });
    } else {
      this.http.post(`admin/reimbursements`, formData).subscribe(() => {
        this.msgSrv.success('保存成功！');
        this.modal.close(true);
      });
    }
  }

  /**
   * 提交审核
   * @param formData 表单数据
   */
  submit(formData: any) {
    formData.status = 1;
    this.save(formData);
  }

  /**
   * 关闭弹窗
   */
  close() {
    this.modal.destroy();
  }

  /**
   * 创建明细formGroup
   */
  createDetail(): FormGroup {
    return this.fb.group({
      id: [null, []],
      project_id: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      remarks: [null, []],
    });
  }

  /**
   * 取消
   * @param index 下标
   */
  cancelDetail(index: number) {
    if (!this.details.at(index).value.key) {
      this.delDetail(index);
    } else {
      this.details.at(index).patchValue(this.editObj);
    }
    this.editIndex = -1;
  }

  /**
   * 删除明细
   * @param index 下标
   */
  delDetail(index: number) {
    this.details.removeAt(index);
  }

  /**
   * 编辑明细
   * @param index 下标
   */
  editDetail(index: number) {
    if (this.editIndex !== -1 && this.editObj) {
      this.details.at(this.editIndex).patchValue(this.editObj);
    }
    this.editObj = { ...this.details.at(index).value };
    this.editIndex = index;
  }

  /**
   * 添加明细
   */
  addDetail() {
    this.details.push(this.createDetail());
    this.editDetail(this.details.length - 1);
  }

  /**
   * 保存明细
   * @param index 下标
   */
  saveDetail(index: number) {
    this.details.at(index).markAsDirty();
    this.details.at(index).updateValueAndValidity();
    if (this.details.at(index).invalid) return;
    console.log(this.details.at(index).value.date.toString());
    this.editIndex = -1;
  }
}
