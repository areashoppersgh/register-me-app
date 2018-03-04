import { User } from './../../models/user.model';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  error: any;
  isLoading: any;
  isToast: any;
  credentials = {} as User;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public authService: AuthProvider,
              public loadingCtrl: LoadingController,
              public storage: Storage,
              private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signUp(){
    console.log('signup credentials', this.credentials)
    this.showLoader();
    this.authService.createNewUser(this.credentials).then((result) => {
        this.isLoading.dismiss();
        console.log('signup response >>>',result);
        this.navCtrl.pop();
    }, (err) => {
        this.isLoading.dismiss();
        console.log('an error occured creating account >>>',JSON.stringify(err));
        this.presentToast("username or mobile already exists!");

        // this.navCtrl.setRoot('TabsPage');
    });
}

login(){
  this.navCtrl.push('SignupPage');
 }
  showLoader(){
    this.isLoading = this.loadingCtrl.create({
        content: 'Registering...'
    });

    this.isLoading.present();
  } 

  presentToast(msg) {
    this.isToast = this.toastCtrl.create({
    message: msg,
    duration: 4000,
    position: 'middle'
  });
  this.isToast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });
  this.isToast.present();
 }  

}
