import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReimbursementTypeComponent } from './type/type.component';
import { ReimbursementProjectComponent } from './project/project.component';
import { ReimbursementApplyComponent } from './apply/apply.component';
import { ReimbursementCheckComponent } from './check/check.component';

const routes: Routes = [

  { path: 'type', component: ReimbursementTypeComponent },
  { path: 'project', component: ReimbursementProjectComponent },
  { path: 'apply', component: ReimbursementApplyComponent },
  { path: 'check', component: ReimbursementCheckComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReimbursementRoutingModule { }
