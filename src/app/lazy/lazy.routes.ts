import { Routes } from '@angular/router';


export const lazyRoutes: Routes = [
    {
        path: '', loadComponent: () => import('../components/ui/ui-layouts/ui-layouts.component').then((c) => c.UiLayoutsComponent),
        children: [
            { path: '', loadChildren: () => import('./ui.routes').then((r) => r.UiRoute) }
        ],
    },
    {
        path: 'admin', loadComponent: () => import('../components/admin/layouts/layouts.component').then((c) => c.LayoutsComponent),
        children: [
            { path: '', loadChildren: () => import('./admin.routes').then((r) => r.AdminRoute) }
        ],
    },
    { path: 'login', loadComponent: () => import('../components/admin/login/login.component').then((c) => c.LoginComponent) },
    { path: '**', loadComponent: () => import('../components/admin/not-found/not-found.component').then((c) => c.NotFoundComponent) }
];
