import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigWorkflowComponent } from './workflow/workflow.component';
import { ConfigWorkflowDesignComponent } from './workflow/design/design.component';
import { ConfigWorkflowDesignNodeComponent } from './workflow/design/node/node.component';
import { ConfigWorkflowDesignEdgeComponent } from './workflow/design/edge/edge.component';
import { ConfigDepartmentComponent } from './department/department.component';
import { ConfigWorkflowDesignNodeReviewerSetComponent } from './workflow/design/node/reviewer-set/reviewer-set.component';

const routes: Routes = [

  { path: 'workflow', component: ConfigWorkflowComponent },
  {
    path: 'workflow/design', component: ConfigWorkflowDesignComponent, data: {
      title: '流程设计'
    },
  },
  { path: 'workflow/node', component: ConfigWorkflowDesignNodeComponent },
  { path: 'workflow/edge', component: ConfigWorkflowDesignEdgeComponent },
  { path: 'department', component: ConfigDepartmentComponent },
  { path: 'reviewer-set', component: ConfigWorkflowDesignNodeReviewerSetComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigRoutingModule {
}
