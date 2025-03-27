import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListDaysComponent } from './components/list-days/list-days.component';
import { DetailsComponent } from './components/details/details.component';
import { DiscoverComponent } from './components/discover/discover.component';
import { LoginComponent } from './components/login/login.component';
import { ContactComponent } from './components/contact/contact.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './guards/auth.guards';
import { AdminFormComponent } from './components/admin-form/admin-form.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'days', component: ListDaysComponent, canActivate: [AuthGuard] },
    { path: 'detail/:id', component: DetailsComponent, canActivate: [AuthGuard] },
    { path: 'discover', component: DiscoverComponent, canActivate: [AuthGuard] },
    { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
    { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard] },
    { path: 'admin-form', component: AdminFormComponent, canActivate: [AuthGuard] },
    { path: 'admin-form/:id', component: AdminFormComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' }
];

