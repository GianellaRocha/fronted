import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { canActivateFn } from './guard/auth.guard';
import { Restaurant } from './pages/restaurant/restaurant';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register';
import { NewComponent } from './pages/new-restaurant/new-restaurant';
import { EditComponent } from './pages/edit-restaurant/edit-restaurant';

export const routes: Routes = [
    {
        path: '',
        component: Restaurant,
        canActivate: [canActivateFn],
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'restaurant',
        component: Restaurant,
        canActivate: [canActivateFn]
    },
    {
        path: 'restaurant/new',
        component: NewComponent,
        canActivate: [canActivateFn]
    },
    {
        path: 'restaurant/edit/:id',
        component: EditComponent,
        canActivate: [canActivateFn]
    }
];
