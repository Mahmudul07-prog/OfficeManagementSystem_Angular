import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { OfficesComponent } from './features/offices/offices.component';
import { EmployeesComponent } from './features/employees/employees.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'offices', component: OfficesComponent, canActivate: [AuthGuard] },
  { path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];
