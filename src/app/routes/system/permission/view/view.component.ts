import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-system-permission-view',
  templateUrl: './view.component.html',
})
export class SystemPermissionViewComponent implements OnInit {
  record: any = {};
  i: any;

  constructor(
    private modal: NzModalRef,
    private http: _HttpClient,
  ) {
  }

  ngOnInit(): void {
    this.http.get(`admin/permissions/` + this.record.id).subscribe((res: any) => this.i = res.data);
  }

  close() {
    this.modal.destroy();
  }
}
