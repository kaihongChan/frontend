import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SystemRoutingModule } from './system-routing.module';
import { SystemPermissionComponent } from './permission/permission.component';
import { SystemPermissionEditComponent } from './permission/edit/edit.component';
import { SystemPermissionViewComponent } from './permission/view/view.component';
import { SystemMenuComponent } from './menu/menu.component';
import { SystemMenuEditComponent } from './menu/edit/edit.component';
import { SystemMenuViewComponent } from './menu/view/view.component';
import { SystemRoleComponent } from './role/role.component';
import { SystemUserComponent } from './user/user.component';
import { SystemRoleViewComponent } from './role/view/view.component';
import { SystemUserViewComponent } from './user/view/view.component';
import { SystemUserEditComponent } from './user/edit/edit.component';
import { SystemRoleEditComponent } from './role/edit/edit.component';
import { SystemPolicyComponent } from './policy/policy.component';
import { SystemPolicyViewComponent } from './policy/view/view.component';
import { SystemPolicyEditComponent } from './policy/edit/edit.component';
import { SystemPolicyPermissionsComponent } from './policy/permissions/permissions.component';

const COMPONENTS = [
  SystemPermissionComponent,
  SystemMenuComponent,
  SystemRoleComponent,
  SystemUserComponent,
  SystemPolicyComponent];
const COMPONENTS_NOROUNT = [
  SystemPermissionEditComponent,
  SystemPermissionViewComponent,
  SystemMenuEditComponent,
  SystemMenuViewComponent,
  SystemRoleViewComponent,
  SystemUserViewComponent,
  SystemUserEditComponent,
  SystemRoleEditComponent,
  SystemPolicyViewComponent,
  SystemPolicyEditComponent,
  SystemPolicyPermissionsComponent];

@NgModule({
  imports: [
    SharedModule,
    SystemRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class SystemModule { }
