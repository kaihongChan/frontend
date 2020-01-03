import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, STData, STPage, STRes } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { NzMessageService } from 'ng-zorro-antd';
import { ConfigWorkflowEditComponent } from './edit/edit.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-config-workflow',
  templateUrl: './workflow.component.html',
})
export class ConfigWorkflowComponent implements OnInit {
  loading = false;
  url = `admin/workflow`;
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
    { title: '适用模型', index: 'model', className: 'text-center' },
    { title: '名称', index: 'name', className: 'text-center' },
    { title: '状态', index: 'status', className: 'text-center', render: 'statusCell' },
    { title: '创建时间', type: 'date', index: 'created_at', className: 'text-center' },
    { title: '更新时间', type: 'date', index: 'updated_at', className: 'text-center' },
    {
      title: '操作',
      className: 'text-center',
      buttons: [
        {
          text: '编辑',
          type: 'modal',
          modal: {
            component: ConfigWorkflowEditComponent,
            params: (record: STData) => record,
          },
          click: 'reload',
        },
        {
          text: '设计',
          click: record => this.router.navigate(
            ['design'], {
              relativeTo: this.activeRoute,
              skipLocationChange: true,
              queryParams: { workflow_id: record.id },
            }),
        },
        {
          text: '删除',
          type: 'del',
          click: (item: any) => this.del(item.model),
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
    private router: Router,
    public activeRoute: ActivatedRoute,
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
    this.modal.createStatic(ConfigWorkflowEditComponent, { i: {} }).subscribe(() => this.st.reload());
  }

  /**
   * 删除
   */
  del(id: number) {
    this.http.delete(`admin/workflow/` + id).subscribe(() => {
      this.msg.success('删除成功！');
      this.st.reload();
    });
  }

  /**
   * 启用/禁用
   * @param item 数据项
   */
  statusSwitchChange(item: any) {
    this.loading = true;
    this.http.patch(`admin/workflow/` + parseInt(item.id, 10), {
      model: item.id,
      status: Number(!item.status),
    }).subscribe(() => {
      this.loading = false;
    });
  }

}
