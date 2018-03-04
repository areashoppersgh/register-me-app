import { Storage } from '@ionic/storage';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  addDirectory():void{ console.log('add directory');}

  logout(){
    console.log('user logout');
    this.storage.remove('username');
    this.navCtrl.setRoot(LoginPage);
    // window.location.reload();
  }
}
