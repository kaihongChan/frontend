import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, STData, STPage, STRes } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { SystemPolicyViewComponent } from './view/view.component';
import { SystemPolicyEditComponent } from './edit/edit.component';
import { SystemPolicyPermissionsComponent } from './permissions/permissions.component';

@Component({
  selector: 'app-system-policy',
  templateUrl: './policy.component.html',
})

export class SystemPolicyComponent implements OnInit {
  url = `admin/policies`;
  searchSchema: SFSchema = {
    properties: {
      keywords: {
        type: 'string',
        title: '',
        ui: {
          placeholder: '关键词',
        },
      },
    },
  };
  @ViewChild('st', { static: true }) st: STComponent;
  columns: STColumn[] = [
    { title: 'ID', index: 'id', className: 'text-center' },
    { title: '名称', index: 'name', className: 'text-center' },
    { title: '创建时间', type: 'date', index: 'created_at', className: 'text-center' },
    {
      title: '包含权限', className: 'text-center',
      buttons: [
        {
          text: '查看',
          type: 'modal',
          modal: {
            component: SystemPolicyPermissionsComponent,
            params: (record: STData) => record,
          },
        },
      ],
    },
    {
      title: '操作',
      className: 'text-center',
      buttons: [
        {
          text: '查看',
          type: 'modal',
          modal: {
            component: SystemPolicyViewComponent,
            params: (record: STData) => record,
          },
        },
        {
          text: '编辑', type: 'modal',
          modal: {
            component: SystemPolicyEditComponent,
            params: (record: STData) => record,
            modalOptions: { nzMaskClosable: false },
          },
          click: 'reload',
        },
        { text: '删除', type: 'del', click: (item: any) => this.del(item.id) },
      ],
    },
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
  showSearch = false;

  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
  ) {
  }

  ngOnInit() {
  }

  /**
   * 添加
   */
  add() {
    this.modal.createStatic(SystemPolicyEditComponent, { i: {} }).subscribe(() => this.st.reload());
  }

  /**
   * 搜索
   * @param event 搜索参数
   */
  searchHandle(event: any) {
    const requestParams: any = {};
    Object.keys(event).forEach(value => {
      requestParams[`${value}`] = event[value].toString();
    });
    this.st.load(1, requestParams);
  }

  /**
   * 删除
   * @param id 数据id
   */
  del(id: number) {
    this.http.delete(`admin/policies/` + id).subscribe(() => {
      this.st.reload();
    });
  }

}
