import { Routes } from '@angular/router';
import { TemplateComponent } from './pages/template/template.component';
import { HomeComponent } from './pages/home/home.component';
import { canActivateFn } from './guard/auth.guard';
import { Restaurant } from './pages/restaurant/restaurant';

export const routes: Routes = [
    {
        path: '',
        component: TemplateComponent,
        children: [
            {
                path: '',
                component: Restaurant,
                canActivate: [canActivateFn], // Protege la ruta raíz
            },
        ],
    },
    {
        path: 'gome',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/register/register').then(m => m.RegisterComponent)
    },
    {
        path: 'restaurant',
        loadComponent: () => import('./pages/restaurant/restaurant').then(m => m.Restaurant),
        canActivate: [canActivateFn]
    },
    {
        path: 'restaurant/new',
        loadComponent: () => import('./pages/new-restaurant/new-restaurant').then(m => m.NewComponent),
        canActivate: [canActivateFn]
    },
    {
        path: 'restaurant/edit/:id',
        loadComponent: () => import('./pages/edit-restaurant/edit-restaurant').then(m => m.EditComponent),
        canActivate: [canActivateFn]
    }
];
//definir rutas de la aplicacion
//los q se van a renderizan en el router outlet