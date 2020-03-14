import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import {apiUrl} from './../constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {

  constructor(private http:HttpClient) { }

  isAuthenticated() {
    let token = localStorage.getItem('token');
    if(!token || token == null )
    {
      return false;
    }
    let data={
      token
    }
    return this.http.post(apiUrl + 'users/verify', JSON.stringify(data), httpOptions)
    .subscribe(res=>
      {
        if(res['success'])
        {
          return true;
        }
        else
        {
          return false;
        }
      })
}
}
