import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STColumnBadge, STComponent, STData, STPage, STRes } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { ReimbursementApplyViewComponent } from '../apply/view/view.component';
import { ReimbursementCheckReviewComponent } from './review/review.component';

const STATUS: STColumnBadge = {
  0: { text: '待提审', color: 'default' },
  1: { text: '流转中', color: 'processing' },
  2: { text: '通过', color: 'success' },
  3: { text: '驳回', color: 'error' },
};

@Component({
  selector: 'app-reimbursement-apply',
  templateUrl: './check.component.html',
})

export class ReimbursementCheckComponent implements OnInit {
  url = `admin/reimbursement/audit_index`;
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
          text: '审核', type: 'modal',
          modal: {
            component: ReimbursementCheckReviewComponent,
            params: (record: STData) => record,
            modalOptions: { nzMaskClosable: false },
          },
          click: 'reload',
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
  current: number;

  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
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

}
