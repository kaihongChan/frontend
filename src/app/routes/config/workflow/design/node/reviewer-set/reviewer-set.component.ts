import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzModalRef, TransferItem } from 'ng-zorro-antd';

@Component({
  selector: 'app-config-workflow-design-node-reviewer-set',
  templateUrl: './reviewer-set.component.html',
})
export class ConfigWorkflowDesignNodeReviewerSetComponent implements OnInit {

  record: any = {};
  roles: any[];
  departments: any[];
  users: TransferItem[];
  columns: any[];

  constructor(
    private http: _HttpClient,
    private modalRef: NzModalRef,
  ) {
  }

  ngOnInit() {
    this.getRoles();
    console.log(this.record);
  }

  tabSelectedIndexChange(index: number): void {
    switch (index) {
      case 0:
        if (!this.roles) {
          this.getRoles();
        }
        break;
      case 1:
        if (!this.departments) {
          this.getDepartments();
        }
        break;
      case 2:
        if (!this.users) {
          this.getUsers();
        }
        break;
      case 3:
        if (!this.columns) {
          this.getColumns();
        }
        break;
      default:
        break;
    }
  }

  getRoles() {
    this.http.get(`admin/roles/all`).subscribe(res => {
      this.roles = res.data;
    });
  }

  getDepartments() {
    this.http.get(`admin/departments`).subscribe(res => {
      this.departments = res.data;
    });
  }

  getUsers() {
    this.http.get(`admin/users/all`).subscribe(res => {
      this.users = res.data;
    });
  }

  getColumns() {
    this.http.get(`admin/workflow_model/columns`, { id: this.record.workflow_id }).subscribe(res => {
      this.columns = res.data;
    });
  }

  close() {
    this.modalRef.destroy();
  }

  select(ret: {}): void {
    console.log('nzSelectChange', ret);
  }

  change(ret: {}): void {
    console.log('nzChange', ret);
  }

}
