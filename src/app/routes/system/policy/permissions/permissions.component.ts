import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-system-policy-policy-permissions',
  templateUrl: './permissions.component.html',
})
export class SystemPolicyPermissionsComponent implements OnInit {
  record: any = {};
  i: any;

  constructor(
    private modal: NzModalRef,
    public http: _HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get(`/user/${this.record.id}`).subscribe(res => this.i = res);
  }

  close() {
    this.modal.destroy();
  }
}
