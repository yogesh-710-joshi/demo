import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import {apiUrl} from './../constants';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserCrudService {
  base_url = apiUrl;
  constructor(private http:HttpClient ) { }
  
  public register(userdata) {
    return this.http.post(this.base_url + 'addUser', JSON.stringify(userdata), httpOptions);
  }

  public login(data:any) {
      return this.http.post(this.base_url + 'login', JSON.stringify(data), httpOptions);
  }

  public getAllUsers() {
    return this.http.get(this.base_url + 'users/allUsers', httpOptions);
}

  public removeUser(data)
  {
    return this.http.post(this.base_url + 'users/removeUser', JSON.stringify(data), httpOptions);
  }

  public updateUser(data)
  {
    return this.http.post(this.base_url + 'users/updateUser', JSON.stringify(data), httpOptions);
  }
  public checkEmailExists(data)
{
  return this.http.post(this.base_url + "checkEmail", JSON.stringify(data),httpOptions);
}

}
