import { CommonModule } from "@angular/common";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { importProvidersFrom } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";


import { AppComponent } from "./app/app.component";
import { AuthInterceptor } from "./app/interceptors/auth.interceptor";
import { lazyRoutes } from "./app/lazy/lazy.routes";//routeları import ediyorum.
import { JwtModule } from "@auth0/angular-jwt";


// const routes:Routes=[
//   {
//     path:"",
//     loadChildren:()=>import("./app/lazy/lazy.routes").then(m=>m.lazyRoutes)
//   }
// ]

bootstrapApplication(AppComponent,{
  providers:[
    provideHttpClient(
      withInterceptors([AuthInterceptor])
    ),
    //{ provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor,multi:true},
    { provide: 'apiUrl', useValue:'http://localhost:5028/api/'},


    importProvidersFrom(
      CommonModule,

      RouterModule.forRoot(lazyRoutes),

      JwtModule.forRoot({
        config:{
          tokenGetter:tokenGetter,
          allowedDomains:["http://localhost:4200/"]
        }
      })
      
      )
  ]
})

export function tokenGetter(){
  return localStorage.getItem("token");
}
