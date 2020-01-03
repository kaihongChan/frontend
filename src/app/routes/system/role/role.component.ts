import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, STData, STPage, STRes } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { SystemRoleEditComponent } from './edit/edit.component';
import { SystemRoleViewComponent } from './view/view.component';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-system-role',
  templateUrl: './role.component.html',
})
export class SystemRoleComponent implements OnInit {
  url = `admin/roles`;
  searchSchema: SFSchema = {
    properties: {
      keywords: {
        type: 'string', title: '',
        ui: {
          placeholder: '关键词',
        },
      },
    },
  };
  @ViewChild('st', { static: true }) st: STComponent;
  columns: STColumn[] = [
    { title: 'ID', index: 'id', className: 'text-center' },
    { title: '唯一标识', index: 'identify', className: 'text-center' },
    { title: '名称', index: 'name', className: 'text-center' },
    { title: '创建时间', type: 'date', index: 'created_at', className: 'text-center' },
    { title: '更新时间', type: 'date', index: 'updated_at', className: 'text-center' },
    {
      title: '操作', className: 'text-center',
      buttons: [
        {
          text: '查看', type: 'modal',
          modal: {
            component: SystemRoleViewComponent,
            params: (record: STData) => record,
          },
        },
        {
          text: '编辑', type: 'modal', click: 'reload',
          modal: {
            component: SystemRoleEditComponent,
            params: (record: STData) => record,
            modalOptions: { nzMaskClosable: false },
          },
        },
        {
          text: '删除', type: 'del',
          click: (item: any) => this.del(item),
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
  showFilter = false;

  constructor(
    private http: _HttpClient,
    private msg: NzMessageService,
    private modal: ModalHelper) {
  }

  ngOnInit() {
  }

  /**
   * 新建
   */
  add() {
    this.modal.createStatic(SystemRoleEditComponent, { i: {} }).subscribe(() => this.st.reload());
  }

  /**
   * 删除
   * @param id
   */
  del(id: number) {
    this.http.delete(`admin/roles/` + id).subscribe(() => {
      this.msg.success('删除成功！');
      this.st.reload();
    });
  }

}
