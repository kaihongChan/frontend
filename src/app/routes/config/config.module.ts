import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ConfigRoutingModule } from './config-routing.module';
import { ConfigWorkflowComponent } from './workflow/workflow.component';
import { ConfigWorkflowEditComponent } from './workflow/edit/edit.component';
import { ConfigWorkflowDesignComponent } from './workflow/design/design.component';
import { ConfigWorkflowDesignNodeComponent } from './workflow/design/node/node.component';
import { ConfigWorkflowDesignEdgeComponent } from './workflow/design/edge/edge.component';
import { ConfigDepartmentComponent } from './department/department.component';
import { ConfigDepartmentEditComponent } from './department/edit/edit.component';
import { ConfigDepartmentViewComponent } from './department/view/view.component';
import { ConfigDepartmentMemberComponent } from './department/member/member.component';
import { ConfigWorkflowDesignNodeReviewerSetComponent } from './workflow/design/node/reviewer-set/reviewer-set.component';

const COMPONENTS = [
  ConfigWorkflowComponent,
  ConfigWorkflowDesignComponent,
  ConfigWorkflowDesignNodeComponent,
  ConfigWorkflowDesignEdgeComponent,
  ConfigDepartmentComponent,
  ConfigWorkflowDesignNodeReviewerSetComponent];
const COMPONENTS_NOROUNT = [
  ConfigWorkflowEditComponent,
  ConfigDepartmentEditComponent,
  ConfigDepartmentViewComponent,
  ConfigDepartmentMemberComponent];

@NgModule({
  imports: [
    SharedModule,
    ConfigRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class ConfigModule { }
