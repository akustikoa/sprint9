import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListDaysComponent } from './components/list-days/list-days.component';
import { DetailsComponent } from './components/details/details.component';
import { WeekComponent } from './components/week/week.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'days', component: ListDaysComponent },
    { path: 'detail', component: DetailsComponent }, //'details/id'
    { path: 'discover', component: WeekComponent }, //'discover/id'
    { path: '**', redirectTo: '' }
];

