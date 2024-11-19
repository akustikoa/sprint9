import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListDaysComponent } from './components/list-days/list-days.component';
import { DetailsComponent } from './components/details/details.component';
import { WeekComponent } from './components/week/week.component';
import { LoginComponent } from './components/login/login.component';
import { ContactComponent } from './components/contact/contact.component';
import { AuthGuard } from './guards/auth.guards';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'days', component: ListDaysComponent, canActivate: [AuthGuard] },
    { path: 'detail/:id', component: DetailsComponent, canActivate: [AuthGuard] }, //'details/id'
    { path: 'discover', component: WeekComponent, canActivate: [AuthGuard] }, //'discover/id'
    { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' }
];

