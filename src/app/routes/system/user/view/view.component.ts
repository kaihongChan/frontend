import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-system-user-view',
  templateUrl: './view.component.html',
})
export class SystemUserViewComponent implements OnInit {
  record: any = {};
  i: any;

  constructor(
    private modal: NzModalRef,
    private http: _HttpClient,
  ) {
  }

  ngOnInit(): void {
    this.http.get(`admin/users/` + this.record.id).subscribe(res => this.i = res.data);
  }

  close() {
    this.modal.destroy();
  }
}
