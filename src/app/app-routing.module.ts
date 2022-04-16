import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './pages/log-in/log-in.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { AuthGuard } from './security/auth-guard';

const routes: Routes = [
  { path: 'login', component: LogInComponent },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: '',   redirectTo: '/orders', pathMatch: 'full' },
  { path: '**', redirectTo: '/orders' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
