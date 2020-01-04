import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { SystemMenuEditComponent } from './edit/edit.component';
import { NzFormatEmitEvent, NzMessageService, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd';
import { SystemMenuViewComponent } from './view/view.component';

@Component({
  selector: 'app-system-menu',
  templateUrl: './menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SystemMenuComponent implements OnInit {
  menuList: NzTreeNodeOptions[] = [];
  searchValue: string;
  expandedKeys: string[] = [];
  isExpandAll = false;
  loading = false;

  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.getMenus();
  }

  /**
   * 获取菜单树
   */
  getMenus() {
    this.loading = true;
    this.http.get(`admin/menus`).subscribe(res => {
      this.menuList = res.data;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  /**
   * 树形展开
   */
  openFolder(data: NzFormatEmitEvent): void {
    if (data instanceof NzTreeNode) {
      data.isExpanded = !data.isExpanded;
    } else {
      const node = data.node;
      if (node) {
        node.isExpanded = !node.isExpanded;
      }
    }
  }

  /**
   * 新建
   * @param node 菜单节点
   */
  add(node?: NzTreeNode) {
    const params: any = { i: {} };
    if (node) {
      params.i.pid = node.key;
    }
    this.modal.createStatic(SystemMenuEditComponent, params).subscribe(() => {
      this.expandedKeys = node ? [node.key] : [];
      this.getMenus();
    });
  }

  /**
   * 编辑
   * @param node 菜单节点
   */
  edit(node: NzTreeNode) {
    this.modal.createStatic(SystemMenuEditComponent, { record: node }).subscribe(() => {
      this.expandedKeys = node.parentNode ? [node.parentNode.key] : [node.key];
      this.getMenus();
    });
  }

  /**
   * 删除菜单
   * @param node 菜单节点
   */
  del(node: NzTreeNode) {
    if (node.children.length > 0) {
      this.msgSrv.error('失败！请先删除子级!');
    } else {
      this.http.delete(`admin/menus/${node.key}`).subscribe(() => {
        this.msgSrv.success('删除成功!');
        this.expandedKeys = [node.parentNode.key];
        this.getMenus();
      });
    }
  }

  /**
   * 详情
   * @param node 节点
   */
  show(node: NzTreeNode) {
    this.modal.create(SystemMenuViewComponent, { record: node }).subscribe(() => {
    });
  }

  /**
   * 刷新
   */
  refresh() {
    this.getMenus();
  }

  /**
   * 展开/收起
   */
  expandAll() {
    this.isExpandAll = !this.isExpandAll;
    this.menuList.forEach(val => {
      if (!val.isLeaf) {
        val.expanded = this.isExpandAll;
      }
    });
    this.menuList = [...this.menuList];
  }

}
