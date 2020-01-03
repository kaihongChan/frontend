import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { STColumn, STColumnTag, STComponent, STPage, STRes } from '@delon/abc';

const TAG: STColumnTag = {
  1: { text: '主管', color: 'orange' },
};

@Component({
  selector: 'app-config-department-view',
  templateUrl: './view.component.html',
})
export class ConfigDepartmentViewComponent implements OnInit {
  record: any = {};
  i: any;
  deptUsers: any;
  @ViewChild('st', { static: false }) st: STComponent;
  columns: STColumn[] = [
    { title: 'ID', index: 'id', className: 'text-center' },
    { title: '用户名', index: 'name', className: 'text-center' },
    { title: '', index: 'is_manager', type: 'tag', tag: TAG },
    { title: '昵称', index: 'nickname', className: 'text-center' },
    { title: '邮箱', index: 'email', className: 'text-center' },
    { title: '手机号', index: 'mobile', className: 'text-center', default: '-' },

  ];
  res: STRes = {
    reName: {
      total: 'total',
      list: 'data.data',
    },
  };
  paginate: STPage = {
    showSize: true,
  };

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
  ) {
  }

  ngOnInit(): void {
    this.http.get(`admin/departments/${this.record.key}`).subscribe(res => {
      const responseData = res.data;
      this.deptUsers = responseData.users;
      this.i = responseData;
    });
  }

  close() {
    this.modal.destroy();
  }
}
