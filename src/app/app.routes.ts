import { Routes } from '@angular/router';
import {MainLayoutComponent} from '../main-layout/main-layout.component';
import {TechnicianDashboardComponent} from '../technician-dashboard/technician-dashboard.component';
import {AuthGuard} from './auth.guard';
import {CreateOrderComponent} from '../create-order/create-order.component';
import {AvailableOrdersComponent} from '../available-orders/available-orders.component';
import {RegisterCustomerComponent} from '../register-customer/register-customer.component';
import {CustomerdataComponent} from '../customerdata/customerdata.component';
import {CustomerorderComponent} from '../customerorder/customerorder.component';
import {LoginComponent} from '../login/login.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    data: { role: 'Admin' },
    children: [],
  },
  {
    path: 'main-layout/customer/:username',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    data: { role: 'Customer' },
    children: [
      { path: 'customer:userName', component: CustomerdataComponent },
      { path: '', component: CustomerorderComponent },
      { path: 'customerorder', component: CustomerorderComponent },
    ],
  },
  {
    path: 'main-layout/technician/:username',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    data: { role: 'Technician' },
    children: [
      { path: '', component: TechnicianDashboardComponent },
      { path: 'technician-dashboard', component: TechnicianDashboardComponent },
      { path: 'available-orders', component: AvailableOrdersComponent },
      { path: 'register-customer', component: RegisterCustomerComponent },
      { path: 'create-order', component: CreateOrderComponent },
    ],
  },
  { path: '**', redirectTo: 'main-layout', pathMatch: 'full' },
  { path: 'main-layout', component: MainLayoutComponent },
];

