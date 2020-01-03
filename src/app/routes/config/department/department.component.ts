import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzFormatEmitEvent, NzMessageService, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd';
import { ConfigDepartmentEditComponent } from './edit/edit.component';
import { ConfigDepartmentViewComponent } from './view/view.component';
import { ConfigDepartmentMemberComponent } from './member/member.component';

@Component({
  selector: 'app-config-department',
  templateUrl: './department.component.html',
})
export class ConfigDepartmentComponent implements OnInit {
  deptTree: NzTreeNodeOptions[] = [];
  searchValue: string;
  expandedKeys: string[] = [];
  isExpandAll = false;
  loading = false;

  constructor(
    private http: _HttpClient,
    private modalHelper: ModalHelper,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.getDepartments();
    this.cdr.detectChanges();
  }

  /**
   * 获取树
   */
  getDepartments() {
    this.http.get(`admin/departments`).subscribe(res => {
      this.deptTree = res.data;
      this.cdr.detectChanges();
      this.loading = false;
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
   * @param node 节点
   */
  add(node?: NzTreeNode) {
    const params: any = { i: {} };
    if (node) {
      params.i.pid = node.key;
    }
    this.modalHelper.createStatic(ConfigDepartmentEditComponent, params).subscribe(() => {
      this.expandedKeys = node ? [node.key] : [];
      this.getDepartments();
    });
  }

  /**
   * 编辑
   * @param node 节点
   */
  edit(node: NzTreeNode) {
    this.modalHelper.createStatic(ConfigDepartmentEditComponent, { record: node }).subscribe(() => {
      this.expandedKeys = node.parentNode ? [node.parentNode.key] : [node.key];
      this.getDepartments();
    });
  }

  /**
   * 删除
   * @param node 节点
   */
  del(node: NzTreeNode) {
    if (node.children.length > 0) {
      this.msgSrv.error('失败！请先删除子级!');
    } else {
      this.http.delete(`admin/departments/${node.key}`).subscribe(() => {
        this.msgSrv.success('删除成功!');
        this.expandedKeys = [node.parentNode.key];
        this.getDepartments();
      });
    }
  }

  show(node: NzTreeNode) {
    this.modalHelper.create(ConfigDepartmentViewComponent,
      { record: node }).subscribe(() => {
    });
  }

  /**
   * 展开/收起
   */
  expandAll() {
    this.isExpandAll = !this.isExpandAll;
    this.deptTree.forEach(val => {
      if (!val.isLeaf) {
        val.expanded = this.isExpandAll;
      }
    });
    this.deptTree = [...this.deptTree];
  }

  /**
   * 刷新树
   */
  refresh() {
    this.loading = true;
    this.getDepartments();
  }

  members(node: NzTreeNode) {
    this.modalHelper.createStatic(ConfigDepartmentMemberComponent,
      { record: node }, {
        size: 'xl',
      }).subscribe(() => {});
  }

}
