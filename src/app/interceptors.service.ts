import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorsService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>, next: HttpHandler
  ) : Observable<HttpEvent<any>> {
    console.log(req.url);
    if (req.url.indexOf('/login') !== -1) {
      return next.handle(req); 
    }
    else if (req.url.indexOf('/signup') !== -1) {
      return next.handle(req); 
    }
    else if (req.url.indexOf('/signup') !== -1) {
      return next.handle(req); 
    }
    else
    {
      let newHeaders = req.headers;
      let token = localStorage.getItem('token');
      if(token)
      {
        newHeaders = newHeaders.append('authorization', token);
        const authReq = req.clone({headers: newHeaders});
  
      return next.handle(authReq);
      }
      else
      return next.handle(req);
    }

  }
}