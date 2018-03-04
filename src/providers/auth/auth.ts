import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';

import 'rxjs/add/operator/map';

import { User } from '../../models/user.model';
import { UserResponse } from './../../models/token.model';

/*
  Generated class for the AuthProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  result: any;
   
  //  baseUrl: string = "https://sikafone-pymvrkzhqa.now.sh"; //host nabiypy@hotmail.co.uk cape coast
  baseUrl: any = 'http://app-a8f9bd8b-8769-4f5e-b771-34aa090657d0.cleverapps.io';
  // baseUrl: any = 'https://sikafone-vlqfqnvtfv.now.sh';
  // baseUrl: any = 'http://localhost:8080';

  public token: any;
  userId: string;
  credentials = {} as User;

  constructor(public http: HttpClient, public storage: Storage, private geolocation: Geolocation) {
    console.log('Hello AuthProvider Provider');
  }


  createAccount(details) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl+'/api/signup', JSON.stringify(details))
        .subscribe(res => {
          let data = res;
          console.log('create account >>>', data);
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  
  createNewUser(data: User) {
    console.log('user data >>>', data);
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl+'/api/signup', JSON.stringify(data),{
        headers: new HttpHeaders({'Content-type':'application/json'})    
      })
        .subscribe(res => {
          console.log('@auth.ts response from creating new user >>>',res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  login(credentials: User) {
    console.log('@auth.ts login credentials >>', credentials);
    return new Promise((resolve, reject) => {
      this.http.post<UserResponse>(this.baseUrl+'api/authenticate', JSON.stringify(credentials),{
        headers: new HttpHeaders({'Content-type':'application/json'})    
      })
        .subscribe(res => {
          console.log('response from user login >>>',res);
          this.token = res.token;
          this.userId = res.userId;
          this.storage.set('token', this.token);
          this.storage.set('userId', this.userId);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  signIn(data: User){
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({"Content-Type" : "application/json"})
      this.http.post<UserResponse>(this.baseUrl+'/api/authenticate', JSON.stringify(data),{headers})
        .map(res => this.result = res)
        .subscribe(res => {
          console.log('User signIn response >>>',res.token);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  logout() {
    this.storage.set('token', '');
  }

  isLoggedIn() {
    return this.storage.get('token').then(value =>{
      this.token = value;
      console.log('isLoggedIn >>>', this.token);
    })
  }

}
