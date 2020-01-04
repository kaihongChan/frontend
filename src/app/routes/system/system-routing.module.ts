import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemPermissionComponent } from './permission/permission.component';
import { SystemMenuComponent } from './menu/menu.component';
import { SystemRoleComponent } from './role/role.component';
import { SystemUserComponent } from './user/user.component';
import { SystemPolicyComponent } from './policy/policy.component';

const routes: Routes = [

  { path: 'permission', component: SystemPermissionComponent },
  { path: 'policy', component: SystemPolicyComponent },
  { path: 'menu', component: SystemMenuComponent },
  { path: 'role', component: SystemRoleComponent },
  { path: 'user', component: SystemUserComponent },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
