import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import {apiUrl} from './../constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserSearchService {
  base_url = apiUrl;
  users = new BehaviorSubject([]);
  key = new BehaviorSubject("");

  constructor( private http:HttpClient ) { }

  public searchUser(data)
  {
    this.key.next(data.key);
    this.http.post(this.base_url + 'users/searchUser', JSON.stringify(data), httpOptions)
    .subscribe(res=>
      {
        if(res['success'])
        {
          this.users.next(res['data'])
        }
        else
        this.users.next([]);
      })
  }
}
