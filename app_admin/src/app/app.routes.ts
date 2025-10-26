import { Routes } from '@angular/router';
import { TripsListComponent } from './trips-list/trips-list';
import { TripFormComponent } from './trip-form/trip-form';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: TripsListComponent },
  { path: 'add', component: TripFormComponent, canActivate: [AuthGuard] },
  { path: 'edit/:code', component: TripFormComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];
