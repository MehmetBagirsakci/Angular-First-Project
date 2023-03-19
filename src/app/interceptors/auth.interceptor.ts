import { HttpInterceptorFn } from "@angular/common/http";


export const AuthInterceptor:HttpInterceptorFn=(req,next)=>{
  let token = localStorage.getItem("token");
  req=req.clone({
    headers:req.headers.set('Authorization','Bearer '+token)
  })

  return next(req);
}

//Error Handling: Servis bir hata verdiğinde ne yapayım.