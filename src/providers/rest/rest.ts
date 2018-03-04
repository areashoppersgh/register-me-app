import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Directory } from '../../models/directory.model';
import { Business } from './../../models/business.model';

/*
  Generated class for the RestProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  //host nabiypy@hotmail.co.uk
  // baseUrl: string = "https://sikafone-pymvrkzhqa.now.sh";
  baseUrl: any = 'http://app-a8f9bd8b-8769-4f5e-b771-34aa090657d0.cleverapps.io';
  // baseUrl: any = 'https://sikafone-vlqfqnvtfv.now.sh';
  // baseUrl: any = 'http://localhost:8080';

  result: any;
  constructor(public http: HttpClient, public storage: Storage) {
    console.log('Hello RestProvider Provider');
  }

  getDirectories() {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl + '/api/directories')
        .map(res => this.result = res)
        .subscribe(data => {
          this.storage.set('data',data);
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }
  
  getLocalDirectories() {
    return new Promise((resolve, reject) => {
      this.http.get('./assets/directory.modal.json')
        .map(res => this.result = res)
        .subscribe(data => {
          this.storage.set('data',data);
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  createDirectory(post: Directory) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/api/directory', JSON.stringify(post))
        .map(res => this.result = res)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  RemoveDirectory(id) {
    return new Promise((resolve, reject) => {
      this.http.delete(this.baseUrl + '/api/directory/remove/' + id).subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  createBusiness(post: Business) {
    console.log('@rest.ts Business credentials >>', JSON.stringify(post));
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/api/business', JSON.stringify(post),{
        headers: new HttpHeaders({'Content-type':'application/json'})    
       })
        .map(res => this.result = res)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getBusinessess() {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl + '/api/businessess')
        .map(res => this.result = res)
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }
  
  updateBusiness(post: Business) {
    console.log('@rest.ts update Business >>', JSON.stringify(post));
    console.log('@rest.ts post id >>>', post.id);
    return new Promise((resolve, reject) => {
      this.http.put(this.baseUrl + '/api/business/update/'+post.id, JSON.stringify(post),{
        headers: new HttpHeaders({'Content-type':'application/json'})    
       })
        .map(res => this.result = res)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  removeBusiness(post: Business) {
    console.log('@rest.ts remove business >>', JSON.stringify(post));
    console.log('@rest.ts post id >>>', post.id);
    return new Promise((resolve, reject) => {
      this.http.delete(this.baseUrl + '/api/business/remove/'+post.id,{
        headers: new HttpHeaders({'Content-type':'application/json'})    
       })
        .map(res => this.result = res)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  
  generateFindMeId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  
    for (var i = 0; i < 8; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    var id = text;
    return id;
  }
  

}

