import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { _HttpClient, Menu } from '@delon/theme';

@Component({
  selector: 'app-system-menu-view',
  templateUrl: './view.component.html',
})
export class SystemMenuViewComponent implements OnInit {
  record: Menu = {};
  i: Menu;
  
  constructor(
    private modal: NzModalRef,
    private http: _HttpClient,
  ) {
  }
  
  ngOnInit(): void {
    this.http.get(`admin/menus/` + this.record.key).subscribe((res: any) => this.i = res.data);
  }
  
  close() {
    this.modal.destroy();
  }
}
