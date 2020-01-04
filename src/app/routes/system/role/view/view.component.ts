import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzTreeNodeOptions } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-system-role-view',
  templateUrl: './view.component.html',
})
export class SystemRoleViewComponent implements OnInit {
  record: any = {};
  i: any;
  rolePolicies: any[];
  roleMenus: NzTreeNodeOptions[];
  tagColors: any[] = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple',
  ];

  constructor(
    private modal: NzModalRef,
    public http: _HttpClient,
  ) {
  }

  ngOnInit(): void {
    this.http.get(`admin/roles/` + this.record.id).subscribe((res: any) => {
      const responseData = res.data;
      responseData.policies.forEach(val => val.color = this.getRandomColor());
      this.rolePolicies = responseData.policies;
      this.roleMenus = responseData.menus;

      this.i = responseData;
    });
  }

  close() {
    this.modal.destroy();
  }

  /**
   * 随机获取tag颜色
   */
  getRandomColor(): string {
    const randomIndex = Math.floor(Math.random() * this.tagColors.length);
    return this.tagColors[randomIndex];
  }
}
