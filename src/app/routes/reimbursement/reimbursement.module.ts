import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ReimbursementRoutingModule } from './reimbursement-routing.module';
import { ReimbursementTypeComponent } from './type/type.component';
import { ReimbursementTypeEditComponent } from './type/edit/edit.component';
import { ReimbursementProjectComponent } from './project/project.component';
import { ReimbursementProjectEditComponent } from './project/edit/edit.component';
import { ReimbursementApplyComponent } from './apply/apply.component';
import { ReimbursementApplyEditComponent } from './apply/edit/edit.component';
import { ReimbursementApplyViewComponent } from './apply/view/view.component';
import { ReimbursementCheckComponent } from './check/check.component';
import { ReimbursementApplyLogsComponent } from './apply/logs/logs.component';
import { ReimbursementCheckReviewComponent } from './check/review/review.component';

const COMPONENTS = [
  ReimbursementTypeComponent,
  ReimbursementProjectComponent,
  ReimbursementApplyComponent,
  ReimbursementCheckComponent];
const COMPONENTS_NOROUNT = [
  ReimbursementTypeEditComponent,
  ReimbursementProjectEditComponent,
  ReimbursementApplyEditComponent,
  ReimbursementApplyViewComponent,
  ReimbursementApplyLogsComponent,
  ReimbursementCheckReviewComponent];

@NgModule({
  imports: [
    SharedModule,
    ReimbursementRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class ReimbursementModule { }
