import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-reimbursement-apply-logs',
  templateUrl: './logs.component.html',
})
export class ReimbursementApplyLogsComponent implements OnInit {
  record: any = {};
  i: any;

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
  ) {
  }

  ngOnInit(): void {
    this.http.get(`admin/reimbursement/logs`, { id: this.record.id }).subscribe(res => {
      this.i = res.data;
    });
  }

  close() {
    this.modal.destroy();
  }
}
