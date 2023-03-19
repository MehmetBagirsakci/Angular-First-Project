import { Route } from "@angular/router";
import { LoginGuard } from "../guards/login.guard";

export const UiRoute:Route[]=[
    // {
    //     path: "",
    //     loadComponent: () => import("../components/ui/home/home.component").then(c => c.HomeComponent)
    // },
    {
        path:"",
        loadComponent:()=>import("../components/ui/products/products.component").then(c=>c.ProductsComponent)
    },
    {
        path: "blank",
        loadComponent: () => import("../components/ui/blank/blank.component").then(c => c.BlankComponent)
    },
    {
        path: "contact",
        loadComponent: () => import("../components/ui/contact/contact.component").then(c => c.ContactComponent)
    },
    {
        path: "products",
        loadComponent: () => import("../components/ui/products/products.component").then(c => c.ProductsComponent)
    },
    {
        path: "products/category/:categoryId",
        loadComponent: () => import("../components/ui/products/products.component").then(c => c.ProductsComponent)
    },
    {
        path: "products/add",
        loadComponent: () => import("../components/ui/products/product-add/product-add.component").then(c => c.ProductAddComponent)
        ,canActivate:[LoginGuard]
    },
    {
        path: "products/category/:categoryId/ikinciParametre/:ikinci",
        loadComponent: () => import("../components/ui/products/products.component").then(c => c.ProductsComponent)
    },
    {
        path: "categories",
        loadComponent: () => import("../components/ui/category/category.component").then(c => c.CategoryComponent)
    }
]