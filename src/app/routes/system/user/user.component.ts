import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper, User } from '@delon/theme';
import { STColumn, STComponent, STData, STPage, STRes } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { SystemUserEditComponent } from './edit/edit.component';
import { NzMessageService } from 'ng-zorro-antd';
import { SystemUserViewComponent } from './view/view.component';

@Component({
  selector: 'app-system-user',
  templateUrl: './user.component.html',
})
export class SystemUserComponent implements OnInit {
  loading = false;
  url = `admin/users`;
  searchSchema: SFSchema = {
    properties: {
      keywords: {
        type: 'string',
        title: '',
        ui: {
          placeholder: '关键词',
        },
      },
      status: {
        type: 'number',
        title: '状态',
        enum: [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 },
        ],
        ui: {
          widget: 'tag',
        },
      },
    },
  };

  @ViewChild('st', { static: true }) st: STComponent;
  columns: STColumn[] = [
    { title: 'ID', index: 'id', className: 'text-center' },
    { title: '用户名', index: 'name', className: 'text-center' },
    { title: '昵称', index: 'nickname', className: 'text-center' },
    { title: '头像', index: 'avatar', render: 'avatarCell', className: 'text-center hidden-mobile' },
    { title: '创建时间', type: 'date', index: 'created_at', className: 'text-center hidden-mobile' },
    { title: '更新时间', type: 'date', index: 'updated_at', className: 'text-center hidden-mobile' },
    { title: '状态', index: 'status', className: 'text-center hidden-mobile', render: 'statusCell' },
    {
      title: '操作',
      className: 'text-center',
      buttons: [
        {
          text: '查看',
          type: 'modal',
          modal: {
            component: SystemUserViewComponent,
            params: (record: STData) => record,
          },
        },
        {
          text: '编辑',
          type: 'modal',
          modal: {
            component: SystemUserEditComponent,
            params: (record: STData) => record,
            modalOptions: { nzMaskClosable: false },
          },
          click: 'reload',
        },
        {
          text: '删除',
          type: 'del',
          click: (item: any) => this.del(item.id),
        },
      ],
    },
  ];
  res: STRes = {
    reName: {
      total: 'data.total',
      list: 'data.data',
    },
  };
  paginate: STPage = {
    showSize: true,
  };
  showFilter = false;

  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    public msg: NzMessageService,
  ) {
  }

  ngOnInit() {
  }

  /**
   * 搜索
   * @param event 搜索值
   */
  searchHandle(event: any) {
    const requestParams: any = {};
    Object.keys(event).forEach(value => {
      requestParams[`${value}`] = event[value].toString();
    });
    this.st.load(1, requestParams);
  }

  /**
   * 添加
   */
  add() {
    this.modal.createStatic(SystemUserEditComponent, { i: {} }).subscribe(() => this.st.reload());
  }

  /**
   * 删除
   */
  del(id: number) {
    this.http.delete(`admin/users/` + id).subscribe(() => {
      this.msg.success('删除成功！');
      this.st.reload();
    });
  }

  /**
   * 启用/禁用
   * @param item 禁用项
   */
  statusSwitchChange(item: any) {
    this.loading = true;
    this.http.patch('admin/users', { id: item.id, status: !item.status }).subscribe(() => {
      this.loading = false;
    });
  }

}
