import { AfterViewInit, Component, OnInit } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Grid from '@antv/g6/plugins/grid';
import * as G6 from '@antv/g6';
import { NzModalService } from 'ng-zorro-antd';
import { ConfigWorkflowDesignNodeComponent } from './node/node.component';
import { ConfigWorkflowDesignEdgeComponent } from './edge/edge.component';

@Component({
  selector: 'app-config-workflow-design',
  templateUrl: './design.component.html',
})
export class ConfigWorkflowDesignComponent implements OnInit, AfterViewInit {
  itemSelected: G6.Item;
  requestParams: any;
  validateForm: FormGroup;
  loading = false;
  graph: G6.Graph;
  data: any;
  addingEdge = false;
  edgeTmp = null;
  multiple = false;

  constructor(
    private http: _HttpClient,
    public selectedRoute: ActivatedRoute,
    private modalSrv: NzModalService,
    private modalHelper: ModalHelper,
  ) {
  }

  ngOnInit() {
    G6.Global.nodeStateStyle.selected = {
      stroke: '#5394ef',
      lineWidth: 3,
      lineDash: [5, 5],
    };
    G6.Global.edgeStateStyle.selected = {
      stroke: '#5394ef',
      lineWidth: 3,
      lineDash: [5, 5],
    };

    G6.registerBehavior('select-item', {
      getDefaultCfg: () => ({ multiple: this.multiple }),
      getEvents: () => ({
        'node:click': 'onItemClick',
        'edge:click': 'onItemClick',
        'canvas:click': 'onCanvasClick',
      }),
      onItemClick: e => {
        const graph = this.graph;
        const item = e.item;
        this.removeItemsState();
        graph.setItemState(item, 'selected', true);
        this.itemSelected = item;
      },
      onCanvasClick: () => {
        this.removeItemsState();
      },
    });

    // 节点添加行为注册
    G6.registerBehavior('click-add-node', {
      getEvents: () => ({ 'canvas:click': 'onCanvasClick' }),
      onCanvasClick: e => {
        const nodeTmp: any = this.graph.add('node', { x: e.x, y: e.y });
        this.graph.setItemState(nodeTmp, 'selected', true);
        this.nodeModal(nodeTmp);
      },
    });

    // 边添加行为注册
    G6.registerBehavior('click-add-edge', {
      getEvents: () => ({
        'node:click': 'onNodeClick',
        'mousemove': 'onMousemove',
        'edge:click': 'onEdgeClick',
      }),
      onNodeClick: e => {
        const point = { x: e.x, y: e.y };
        const model = e.item.getModel();
        if (this.addingEdge && this.edgeTmp) {
          this.graph.updateItem(this.edgeTmp, {
            target: model.id,
          });
          this.edgeModal(this.edgeTmp);
        } else {
          this.edgeTmp = this.graph.add('edge', {
            source: model.id,
            target: point,
          });
          this.graph.setItemState(this.edgeTmp, 'selected', true);
          this.addingEdge = true;
        }
      },
      onMousemove: e => {
        const point = { x: e.x, y: e.y };
        if (this.addingEdge && this.edgeTmp) {
          this.graph.update(this.edgeTmp, {
            target: point,
          });
        }
      },
      onEdgeClick: e => {
        const currentEdge = e.item;
        if (this.addingEdge && this.edgeTmp === currentEdge) {
          this.graph.remove(currentEdge);
          this.edgeTmp = null;
          this.addingEdge = false;
        }
      },
    });
  }

  /**
   * 移除选中状态
   */
  removeItemsState() {
    this.itemSelected = null;
    this.graph.findAllByState('node', 'selected').forEach(node => {
      this.graph.setItemState(node, 'selected', false);
    });
    this.graph.findAllByState('edge', 'selected').forEach(edge => {
      this.graph.setItemState(edge, 'selected', false);
    });
  }

  ngAfterViewInit(): void {
    this.selectedRoute.queryParams.subscribe(params => {
      this.requestParams = params;
    });
    this.http.get(`admin/workflow_node/design`, this.requestParams).toPromise().then(res => {
      this.data = res.data;
      setTimeout(() => {
        this.render();
      });
    });
  }

  /**
   * 渲染
   */
  render() {
    const grid = new Grid;
    this.graph = new G6.Graph({
      container: 'mountNode',
      width: window.innerWidth,
      height: window.innerHeight,
      modes: {
        default: ['drag-canvas', 'drag-node', 'select-item'],
        addNode: ['click-add-node'],
        addEdge: ['click-add-edge'],
      },
      defaultNode: {
        shape: 'rect',
        size: [150, 40],
        style: {
          stroke: '#5B8FF9',
          fill: '#C6E5FF',
          lineWidth: 0,
          lineDash: null,
          radius: 5,
        },
        labelCfg: {
          style: {
            fontSize: 16,
            fill: '#00287E',
          },
        },
      },
      defaultEdge: {
        shape: 'polyline',
        color: '#ccc',
        size: 2,
        style: {
          radius: 20,
          offset: 45,
          endArrow: true,
          lineWidth: 2,
          stroke: '#C2C8D5',
          lineAppendWidth: 50,
          lineDash: null,
        },
        labelCfg: {
          style: {
            fill: '#C2C8D5',
            fontSize: 16,
          },
        },
      },
      plugins: [grid],
    });
    this.graph.read(this.data);
  }

  /**
   * 设置模式
   *
   * @param mode 模式
   */
  setMode(mode: string): void {
    this.graph.setMode(mode);
  }

  /**
   * 删除
   *
   * @param target 目标
   * @param obj 对象
   */
  remove(target: string, obj: any) {
    this.modalSrv.confirm({
      nzTitle: '确定删除？',
      nzContent: '此操作不可逆！可能会造成审核流程错误！',
      nzOkText: '确定',
      nzCancelText: '取消',
      nzOnOk: () => {
        if (target === 'node') {

        } else if (target === 'edge') {

        }
        this.graph.remove(obj);
        this.graph.setMode('default');
      },
      nzOnCancel: () => {
        this.graph.setMode('default');
      },
    });
  }

  /**
   * 编辑
   * @param item 节点｜边
   */
  editModal(item: any) {
    if (item.getType() === 'node') {
      this.nodeModal(item);
    } else {
      this.edgeModal(item);
    }
  }

  /**
   * 节点弹窗
   * @param node 节点
   */
  nodeModal(node: G6.Node) {
    const extraParams = {
      workflow_id: this.requestParams.workflow_id,
    };
    this.modalHelper.createStatic(ConfigWorkflowDesignNodeComponent, {
      record: { ...extraParams, ...node.getModel() },
    }, {
      size: 'xl',
      modalOptions: {
        nzOnCancel: () => {
          this.graph.setItemState(node, 'selected', false);
          if (!node.getModel().id) {
            this.graph.remove(node);
          }
          this.itemSelected = null;
          this.graph.setMode('default');
        },
      },
    }).subscribe(res => {
      if (res) {
        this.graph.setItemState(node, 'selected', false);
        const nodes: [] = this.data.nodes;
        const filter = nodes.filter((value: any) => value.id === res.id);
        if (filter.length) { // 更新节点
          this.graph.update(node, res);
        } else { // 新建节点
          this.data.nodes.push(res);
          this.graph.read(this.data);
        }
      }
      this.graph.refresh();
      this.itemSelected = null;
      this.graph.setMode('default');
    });
  }

  /**
   * 连线弹窗
   */
  edgeModal(edge: G6.Edge) {
    this.graph.setItemState(edge, 'selected', true);
    this.addingEdge = false;
    const extraParams = {
      workflow_id: this.requestParams.workflow_id,
    };
    this.modalHelper.createStatic(ConfigWorkflowDesignEdgeComponent, {
      record: {
        ...extraParams, ...edge.getModel(), ...{
          source_node: edge.getSource().getModel().label,
          target_node: edge.getTarget().getModel().label,
        },
      },
    }, {
      size: 'xl',
      modalOptions: {
        nzOnCancel: () => {
          this.graph.setItemState(edge, 'selected', false);
          this.itemSelected = null;
          if (!edge.getModel().id) {
            this.graph.remove(edge);
          }
          this.graph.setMode('default');
        },
      },
    }).subscribe(res => {
      if (res) {
        this.graph.setItemState(edge, 'selected', false);
        const nodes: [] = this.data.nodes;
        const filter = nodes.filter((value: any) => value.id === res.id);
        if (filter.length) { // 更新节点
          this.graph.update(edge, res);
        } else { // 新建节点
          this.data.nodes.push(res);
          this.graph.read(this.data);
        }
      }
      this.graph.refresh();
      this.edgeTmp = null;
      this.itemSelected = null;
      this.graph.setMode('default');
    });
  }

  del(item: G6.Item) {
    let delUrl = '';
    const id = item.getModel().id;
    delUrl = item.getType() === 'node' ? '' : '';

    this.http.delete(delUrl).subscribe(() => {

    });
  }

}
