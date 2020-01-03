import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NzModalRef,
  NzMessageService,
  NzTreeSelectComponent,
  NzTreeNode,
  NzTreeNodeOptions,
  TransferChange,
} from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { zip } from 'rxjs';

@Component({
  selector: 'app-system-role-edit',
  templateUrl: './edit.component.html',
})
export class SystemRoleEditComponent implements OnInit {
  record: any = {};
  i: any;
  validateForm: FormGroup;
  controlsConfig = {
    id: [0, null],
    identify: ['', [Validators.required]],
    name: ['', [Validators.required]],
    policies: [[], [Validators.required]],
    menus: [[], [Validators.required]],
    description: ['', null],
  };
  policyList = [];
  menuOptionList = [];
  @ViewChild('treeSelectComponent', { static: false }) treeSelectComponent: NzTreeSelectComponent;

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private fb: FormBuilder,
  ) {
    this.validateForm = this.fb.group(this.controlsConfig);
  }

  ngOnInit(): void {
    zip(
      this.http.get(`admin/policies/all`),
      this.http.get(`admin/menus`),
    ).pipe(
      // 接收其他拦截器后产生的异常消息
      catchError((data) => {
        return data;
      }),
    ).toPromise().then(res => {
      const policiesTemp = [];
      res[0].data.forEach((value) => {
        policiesTemp.push({
          key: value.id,
          title: value.name + '[' + value.identify + ']',
        });
      });

      this.policyList = policiesTemp;
      this.menuOptionList = res[1].data;

      if (this.record.id) {
        this.http.get(`admin/roles/` + this.record.id).subscribe(response => {
          const responseData = response.data;
          responseData.policies.forEach((value, index) => {
            responseData.policies[index] = parseInt(value.id, 10);
          });
          this.policyList.forEach(value => {
            if (responseData.policies.indexOf(parseInt(value.key, 10) !== -1)) {
              value.direction = 'right';
            }
          });

          // 保留不含子菜单的节点(勾选不含子菜单的节点以实现半勾选状态)
          responseData.menus = this.filterMenuIds(responseData.menus, []);
          // 表单数据绑定
          this.validateForm.patchValue(responseData);
          this.i = responseData;
        });
      }
    });
  }

  /**
   * 权限穿梭
   * @param event event
   */
  transferChange(event: TransferChange) {
    let policiesTmp = [];
    if (event.from === 'left' && event.to === 'right') {
      event.list.forEach(val => {
        policiesTmp.push(parseInt(val.key, 10));
      });
    } else {
      event.list.forEach(val => {
        policiesTmp = policiesTmp.filter(value => value !== parseInt(val.key, 10));
      });
    }

    this.validateForm.get('policies').setValue(policiesTmp);
  }

  /**
   * 获取不含子菜单的节点id
   * @param menus NzTreeNode[]
   * @param noChildrenIds number[]
   * @return number[]
   */
  filterMenuIds(menus: NzTreeNode[], noChildrenIds: number[]) {
    menus.forEach(value => {
      if (value.children.length) {
        this.filterMenuIds(value.children, noChildrenIds);
      } else {
        noChildrenIds.push(parseInt(value.key, 10));
      }
    });

    return noChildrenIds;
  }

  /**
   * 获取勾选菜单
   * （含父级节点）
   * @param roleMenus 勾选数组
   * @param checkedMenus 勾选数组
   */
  getCheckedMenus(roleMenus: NzTreeNode[], checkedMenus: number[]) {
    roleMenus.forEach(value => {
      if (value.children.length) {
        this.getCheckedMenus(value.children, checkedMenus);
      }
      checkedMenus.push(parseInt(value.key, 10));
    });
    return checkedMenus;
  }

  /**
   * 获取用户可见菜单
   * (含父级节点)
   */
  getRoleMenus() {
    const checkedMenus = this.getCheckedMenus(this.treeSelectComponent.getCheckedNodeList(), []);
    const halfCheckedMenus = this.treeSelectComponent.getHalfCheckedNodeList();
    halfCheckedMenus.forEach(value => {
      checkedMenus.push(parseInt(value.key, 10));
    });
    return checkedMenus.sort();
  }

  /**
   * 提交表单
   * @param formData 表单数据
   */
  submitForm(formData: any) {
    formData.menus = this.getRoleMenus();
    if (formData.id) {
      this.http.put(`admin/roles/` + formData.id, formData).subscribe(() => {
        this.msgSrv.success('更新成功！');
        this.modal.close(true);
      });
    } else {
      this.http.post(`admin/roles`, formData).subscribe(() => {
        this.msgSrv.success('保存成功！');
        this.modal.close(true);
      });
    }
  }

  /**
   * 关闭弹窗
   */
  close() {
    this.modal.destroy();
  }
}
