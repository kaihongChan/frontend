import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-reimbursement-apply-view',
  templateUrl: './view.component.html',
})
export class ReimbursementApplyViewComponent implements OnInit {
  record: any = {};
  i: any;

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get(`admin/reimbursements/${this.record.id}`).subscribe(res => this.i = res.data);
  }

  close() {
    this.modal.destroy();
  }
}
