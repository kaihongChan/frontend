import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';
import { RouteRoutingModule } from './routes-routing.module';
// dashboard pages
import { DashboardV1Component } from './dashboard/v1/v1.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
// single pages
import { UserLockComponent } from './passport/lock/lock.component';

const COMPONENTS = [
  DashboardV1Component,
  // passport pages
  UserLoginComponent,
  // single pages
  UserLockComponent,
];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, RouteRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class RoutesModule {}
