import { Route } from "@angular/router";

export const AdminRoute:Route[]=[
    {
        path: "",
        loadComponent: () => import("../components/admin/dashboard/dashboard.component").then(c => c.DashboardComponent)
    },
    {
        path:"register",
        loadComponent:()=>import("../components/admin/auth/register/register.component").then(c=>c.RegisterComponent)
    },
    {
        path:"products",
        loadComponent:()=>import("../components/admin/products/products.component").then(c=>c.ProductsComponent)
    }
]