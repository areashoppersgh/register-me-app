import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../models/user.model';
import { SignupPage } from '../signup/signup';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  myForm: FormGroup;
  error: any;
  isLoading: any;
  credentials = {} as User;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public authService: AuthProvider,
    public loadingCtrl: LoadingController,
    public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

    this.storage.get('username').then((userId) => {
      console.log('isLoggedIn >>>', userId);
      if(userId !== null){
        this.navCtrl.setRoot('TabsPage');
      }
    });
  
  }

  onLogin() {
    console.log('user login');
    if(this.credentials){
      console.log('user credentials',this.credentials);
      this.navCtrl.setRoot('TabsPage');
    }
  }

  login(){
    console.log('login credentials', JSON.stringify(this.credentials))
    this.showLoader();
    this.storage.set('username', this.credentials.username);
    this.authService.signIn(this.credentials).then((result) => {
        console.log('@LoginCtrl login result >>>',result);
        this.isLoading.dismiss();
        this.navCtrl.setRoot('TabsPage');
    }, (err) => {
        this.isLoading.dismiss();
        console.log(err);
        this.navCtrl.setRoot('TabsPage');
    });
  }


  signUp(){
    this.navCtrl.push(SignupPage);
 }
  showLoader(){
    this.isLoading = this.loadingCtrl.create({
        content: 'authenticating...'
    });

    this.isLoading.present();
}



}
