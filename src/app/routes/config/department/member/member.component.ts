import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema } from '@delon/form';
import { STChange, STColumn, STColumnTag, STComponent, STPage, STRes } from '@delon/abc';

const TAG: STColumnTag = {
  1: { text: '主管', color: 'orange' },
};

@Component({
  selector: 'app-config-department-member',
  templateUrl: './member.component.html',
})

export class ConfigDepartmentMemberComponent implements OnInit {
  record: any = {};
  memberChecked: number[] = [];
  searchSchema: SFSchema = {
    properties: {
      keywords: {
        type: 'string',
        title: '',
        ui: {
          placeholder: '关键词',
        },
      },
      is_manager: {
        type: 'number',
        title: '主管',
        enum: [
          { label: '是', value: 1 },
          { label: '否', value: 0 },
        ],
        ui: {
          widget: 'radio',
        },
      },
    },
  };
  @ViewChild('st', { static: false }) st: STComponent;
  columns: STColumn[] = [
    { title: 'ID', type: 'checkbox', index: 'id', className: 'text-center' },
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
    private http: _HttpClient,
    private modalRef: NzModalRef,
    private msgSrv: NzMessageService,
  ) {
  }

  ngOnInit() {
  }

  close() {
    this.modalRef.destroy();
  }

  /**
   * 搜索
   * @param params 参数
   */
  searchHandle(params: any) {
    this.st.load(1, params);
  }

  /**
   * 勾选监听
   * @param e 事件
   */
  checkHandle(e: STChange) {
    if (e.type === 'checkbox') {
      this.memberChecked = [];
      e.checkbox.forEach(value => {
        if (value.checked) {
          this.memberChecked.push(value.id);
        }
        console.log(this.memberChecked);
      });
    }
  }

  /**
   * 设置主管
   */
  setAsManager() {
    if (!this.memberChecked) {
      this.msgSrv.error('请勾选成员！');
      return;
    }

    this.http.post(`admin/department/set_managers`,
      { id: this.record.key, managers: this.memberChecked }).subscribe(() => {
      this.memberChecked = [];
      this.st.reload();
      this.msgSrv.success('部门主管设置成功！');
    });
  }

  /**
   * 主管移除
   */
  removeManager() {
    if (!this.memberChecked) {
      this.msgSrv.error('请勾选成员！');
      return;
    }

    this.http.post(`admin/department/remove_managers`,
      { id: this.record.key, managers: this.memberChecked }).subscribe(() => {
      this.memberChecked = [];
      this.st.reload();
      this.msgSrv.success('部门主管移除成功！');
    });
  }
}
