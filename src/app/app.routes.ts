import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListDaysComponent } from './components/list-days/list-days.component';
import { DetailsComponent } from './components/details/details.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'days', component: ListDaysComponent },
    { path: 'details/id', component: DetailsComponent },
    { path: '**', redirectTo: '' }

];

