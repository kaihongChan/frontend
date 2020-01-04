import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, STData, STPage, STRes } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { ReimbursementProjectEditComponent } from './edit/edit.component';

@Component({
  selector: 'app-reimbursement-project',
  templateUrl: './project.component.html',
})
export class ReimbursementProjectComponent implements OnInit {
  url = `admin/reimbursement_projects`;
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
      title: '操作',
      className: 'text-center',
      buttons: [
        {
          text: '编辑', type: 'modal',
          modal: {
            component: ReimbursementProjectEditComponent,
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

  searchHandle(params: any) {
    const requestParams: any = {};
    Object.keys(params).forEach(value => {
      requestParams[`${value}`] = params[value].toString();
    });
    this.st.load(1, requestParams);
  }

  add() {
    this.modal
      .createStatic(ReimbursementProjectEditComponent, { i: { id: 0 } })
      .subscribe(() => this.st.reload());
  }

  del(id: number) {
    this.http.delete(`admin/reimbursement_projects/${id}`).subscribe(() => {
      this.st.reload();
    });
  }

}
