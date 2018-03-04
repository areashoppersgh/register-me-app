import { AuthProvider } from './../../providers/auth/auth';
import { Camera } from '@ionic-native/camera';
import { Business } from './../../models/business.model';
import { Component } from '@angular/core';
import { IonicPage, NavController,ModalController, ActionSheetController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { RestProvider } from './../../providers/rest/rest';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the EditUploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-upload',
  templateUrl: 'edit-upload.html',
})
export class EditUploadPage {
  // public data: any[]=[];
  data = {} as Business;
  isToast: any;
  isLoading: any;
  avatar: any;
  geocode: any;
  latitude: any="";
  longitude: any="";

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private camera: Camera,
    private actionSheetCtrl: ActionSheetController, 
    private modalCtrl: ModalController,
    private restProvider: RestProvider,
    private authProvider: AuthProvider,
    private geolocation: Geolocation) {
    // this.data = this.navParams.get("post");
    this.reloadImages();
    // console.log('@editUpload data >>>', this.data);
    this.avatar = this.data.gravatar;
   

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditUploadPage');
    this.reloadImages();
    // this.setGeoLocation();
    // this.data.latitude = this.latitude;
    // this.data.longitude = this.longitude;
    // console.log("latitude >>>",this.data.latitude);
    // console.log("longitude >>>",this.data.longitude);

  }
  // setGeoLocation() {
  //   this.geolocation.getCurrentPosition({
  //     enableHighAccuracy: true,
  //     timeout: 30000,
  //     maximumAge: 30000
  //   }).then((resp) => {
  //     this.longitude = resp.coords.longitude;
  //     this.latitude = resp.coords.longitude;
  //     console.log('position resp >>> ', this.longitude);
  //     console.log('position resp >>> ', this.latitude);
  //   }).catch((error) => {
  //     // this.error = error;
  //     console.log('error: true'+'error setgeolocation', JSON.stringify(error) );
  //   });
  // }
  reloadImages(){
    console.log('reload images')
    return this.data = this.navParams.get("post");
  }

  updateUpload(){
    console.log('@editUploads data >>> ',this.data);
    this.showLoader();
    this.restProvider.updateBusiness(this.data).then((result) => {
      console.log('Business added successfully ~',result);
      this.presentToast('Business updated successfully');
      this.reloadImages();
      this.isLoading.dismiss();
      this.navCtrl.pop();
    }, (err) => {
      console.log(err);
      // this.error = err;
      this.isLoading.dismiss();
      this.presentErrorToast(JSON.stringify(err));
    });
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }
  
  editimage() {
    let statusalert = this.alertCtrl.create({
      buttons: ['okay']
    });
  }
  
  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
 
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      this.avatar = 'data:image/jpeg;base64,' + imagePath;
      this.data.fileUpload = 'data:image/jpeg;base64,' + imagePath;
    }, (err) => {
      console.log('Error: ', err);
    });
  }
  
  
  showLoader(){
    this.isLoading = this.loadingCtrl.create({
        content: 'submitting forms...'
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

  presentErrorToast(msg) {
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
