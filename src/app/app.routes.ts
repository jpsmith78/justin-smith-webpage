import { Route } from '@angular/router';

export const routes: Route[] = [
    {
        path: '', redirectTo: '/home', pathMatch: 'full'
    },
    {
        path: 'map',
        loadComponent: () => import('./map/map.component')
        .then(mod => mod.MapComponent)
    },
    {
        path: 'home',
        loadComponent: () => import('./home-page/home-page.component')
        .then(mod => mod.HomePageComponent)
    },
    {
        path: 'connect-four',
        loadComponent: () => import('./connect-four/connect-four.component')
        .then(mod => mod.ConnectFourComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./register/register.component')
        .then(mod => mod.RegisterComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./login/login.component')
        .then(mod => mod.LoginComponent)
    },

];
