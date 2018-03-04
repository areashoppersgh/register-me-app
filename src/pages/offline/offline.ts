import { Business } from './../../models/business.model';
import { RestProvider } from './../../providers/rest/rest';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the OfflinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-offline',
  templateUrl: 'offline.html',
})
export class OfflinePage {
  businessess: any;
  isLoading: any;
  allBusiness: any;
  isToast: any;
  public userId: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private restProvider: RestProvider,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private storage: Storage) {
                // this.userId = userId;
                // this.reloadBusiness();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfflinePage');
    this.storage.get('username').then((userId) => {
      console.log('@offlinePage isLoggedIn >>>', userId);
      this.userId = userId;
      console.log('@offlinePage this.userId >>>', this.userId);
    });
    this.reloadBusiness();
  }
  reloadBusiness(){
    this.showLoader();
    this.restProvider.getBusinessess().then((data) => {
      this.isLoading.dismiss().catch(() => {});;
      this.businessess = data;
      console.log('all businessess >>>', this.businessess);
    }, (err) => {
      console.log("@reloadBusiness an error occured ~",JSON.stringify(err));
      this.isLoading.dismiss().catch(() => {});;
    });
  }
  
  editBusiness(post: Business) {
    console.log('edit business', post);
    this.navCtrl.push("EditUploadPage", { post: post});
  }
  
  deleteBusiness(bus) {
    console.log('delele business', bus);
    this.showLoader();
    this.restProvider.removeBusiness(bus).then((result) => {
      console.log('business successfully deleted ~',result);
      this.presentToast('Business successfully removed');
      this.isLoading.dismiss().catch(() => {});;
      this.navCtrl.pop();
      this.reloadBusiness();
    }, (err) => {
      console.log(err);
      // this.error = err;
      this.isLoading.dismiss().catch(() => {});
      this.presentToast('an error occured deleting business');
    });
  }

  showLoader() {
    this.isLoading = this.loadingCtrl.create({
      content: 'Loading uploads...'
    });
    this.isLoading.present();

  }

  presentToast(msg) {
    this.isToast = this.toastCtrl.create({
    message: msg,
    duration: 4000,
    position: 'middle'
  });

  this.isToast.present();
}

}
