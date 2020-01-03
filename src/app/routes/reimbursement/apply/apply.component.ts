import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STChange, STColumn, STColumnBadge, STComponent, STData, STPage, STRes } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { ReimbursementApplyEditComponent } from './edit/edit.component';
import { ReimbursementApplyViewComponent } from './view/view.component';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';
import { ReimbursementApplyLogsComponent } from './logs/logs.component';

const STATUS: STColumnBadge = {
  0: { text: '待提审', color: 'default' },
  1: { text: '流转中', color: 'processing' },
  2: { text: '通过', color: 'success' },
  3: { text: '驳回', color: 'error' },
};

@Component({
  selector: 'app-reimbursement-apply',
  templateUrl: './apply.component.html',
})

export class ReimbursementApplyComponent implements OnInit {
  url = `admin/reimbursements`;
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
    { title: '金额', index: 'amount', type: 'number', className: 'text-center' },
    { title: '状态', index: 'status', type: 'badge', badge: STATUS, className: 'text-center' },
    { title: '创建时间', type: 'date', index: 'created_at', className: 'text-center' },
    {
      title: '操作',
      className: 'text-center',
      buttons: [
        {
          text: '查看', type: 'modal',
          modal: {
            component: ReimbursementApplyViewComponent,
            params: (record: STData) => record,
          },
          click: 'reload',
        },
        {
          iif: (item: any) => item.status !== 1 || item.status !== 2,
          text: '编辑', type: 'modal',
          modal: {
            size: 'xl',
            component: ReimbursementApplyEditComponent,
            params: (record: STData) => record,
            modalOptions: { nzMaskClosable: false },
          },
          click: 'reload',
        },

        {
          iif: (item: any) => item.status === 0,
          text: '删除', type: 'del', click: (item: any) => this.del(item.id),
        },
        {
          text: '更多',
          children: [
            {
              iif: (item: any) => item.status === 0 || item.status === 3,
              text: '提审', type: 'link',
              pop: true,
              popTitle: '确认提交审核？',
              click: (item: any) => this.submit(item.id),
            },
            {
              iif: (item: any) => item.status === 1,
              text: '撤回', type: 'link',
              pop: true,
              popTitle: '确认撤回？',
              click: (item: any) => this.submit(item.id),
            },
            {
              text: '日志', type: 'modal',
              modal: {
                size: 'lg',
                component: ReimbursementApplyLogsComponent,
                params: (record: STData) => record,
                modalOptions: { nzMaskClosable: false },
              },
            },
          ],
        },
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
  process: any[];

  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    public msgSrv: NzMessageService,
  ) {
  }

  ngOnInit() {
  }

  searchHandle(params: any) {
    const requestParams: any = {};
    Object.keys(params).forEach(value => {
      requestParams[`${value}`] = params[value].toString();
    });
    this.st.load(1, requestParams);
  }

  /**
   * 添加
   */
  add() {
    this.modal
      .createStatic(ReimbursementApplyEditComponent, { i: { id: 0 } },
        {
          size: 'xl',
          modalOptions: {},
        }).subscribe(() => this.st.reload());
  }

  /**
   * 提交审核
   * @param id id
   */
  submit(id: number) {
    this.http.post(`admin/reimbursement/submit`, { id }).subscribe(() => {
      this.st.reload();
    });
  }

  /**
   * 删除
   * @param id id
   */
  del(id: number) {
    this.http.delete(`admin/reimbursements/${id}`).subscribe(() => {
      this.st.reload();
    });
  }

  /**
   * st表格改变事件
   * @param change change
   */
  stChange(change: STChange) {
    const expand = change.expand;
    if (change.type === 'expand' && expand.expand) {
      this.process = null;
      const id = expand.id;
      const times = expand.apply_times;
      zip(
        this.http.get(`admin/reimbursement/process`, { id }),
        this.http.get(`admin/reimbursement/logs`, { id, times }),
      ).pipe(
        catchError((data) => {
          return data;
        }),
      ).toPromise().then(res => {
        this.process = res[0].data;
        const logs: any[] = res[1].data;

        this.process.forEach((value, index) => {
          logs.forEach(v => {
            if (v.node_id === value.id) {
              value.action = v.action;
              value.createdBy = v.creator.nickname;
              value.createdAt = v.created_at;
              value.remarks = v.remarks;
            }
          });

          // 节点状态
          value.status = 'wait';
          const previous = index - 1;
          if (previous >= 0) {
            if (this.process[previous].action === 'pass' || this.process[previous].action === 'submit') {
              this.process[previous].status = 'finish';
              value.status = this.process.length === index + 1 ? 'finish' : 'process';
            }
          }
          if (value.action === 'reject') {
            value.status = 'error';
          }
        });
        console.log(this.process);
      });
    }
  }
}
