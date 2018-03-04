import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading   } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { RestProvider } from './../../providers/rest/rest';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-add-data',
  templateUrl: 'add-data.html',
})
export class AddDataPage {
  public userId: any="";
  public findMeId: any= "";
  lastImage: string = null;
  loading: Loading;
  imageUrl:string='null';
  data = { userId:"", findMeId:"", officeName:"", otherNames:"", mobile:"", directory:"", latitude:"", longitude:"",location:"", gender:"", fileUpload:"",otherInfo:""};
  // data = { date:"", type:"", description:"", amount:0 };
  latitude: any='';
  longitude: any="";
  base64Image: any;
  photos: any;

  imageURI:any;
  imageFileName:any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    private toast: Toast,
    private restProvider: RestProvider,
    private camera: Camera, 
    private transfer: Transfer,
    private file: File, 
    private filePath: FilePath, 
    public actionSheetCtrl: ActionSheetController, 
    public toastCtrl: ToastController, 
    public platform: Platform,
    private geolocation: Geolocation,
    public storage: Storage) {
      
    }
    
    ionViewDidLoad(){
      this.data.findMeId= this.restProvider.generateFindMeId();
      // this.data.findMeId= 'FINDMEiD';
      this.storage.get('username').then((userId) => {
        console.log('@AddDataPage isLoggedIn >>>', userId);
        this.userId = userId;
        this.data.userId = userId;
        console.log('@AddDataPage this.data.userId >>>', this.data.userId);
      });
      console.log("@AddDataPage data payload >>> ", JSON.stringify(this.data));
      this.setGeoLocation()
    }

    setGeoLocation() {
      this.geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 30000
      }).then((resp) => {
        this.longitude = resp.coords.longitude;
        this.latitude = resp.coords.latitude;
        this.data.latitude = JSON.stringify(resp.coords.latitude);
        this.data.longitude = JSON.stringify(resp.coords.longitude);
        console.log('resp.coords.latitude >> ', JSON.stringify(resp.coords.latitude));
        console.log('resp.coords.longitude >> ', JSON.stringify(resp.coords.longitude));
        console.log("this.data.latitude >> ", this.data.latitude);
        console.log("this.data.longitude >>" , this.data.longitude);

      }).catch((error) => {
        // this.error = error;
        console.log('error: true',JSON.stringify(error));
      });
    }

    takePicture(){
      console.log('take picture');
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        targetWidth: 100,
        targetHeight: 100,
        saveToPhotoAlbum: false
      }
      
      this.camera.getPicture(options).then((imageData) => {
       // imageData is either a base64 encoded string or a file URI
       // If it's base64:
        this.base64Image = 'data:image/jpeg;base64,' + imageData;
        this.imageURI = imageData;
        // this.data.fileUpload = this.base64Image;
        this.photos = this.base64Image;
        this.photos.reverse();
      }, (err) => {
       // Handle error
       let errMsg = 'error taking picture'
       console.log('error taking picture>>>' + err);
       this.presentToast(errMsg);
      });
    }
  

  
     // Create a new name for the image
  private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  }
 
// Copy the image to a local folder
private copyFileToLocalDir(namePath, currentName, newFileName) {
  // this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
  //   this.lastImage = newFileName;
  // }, error => {
  //   this.presentToast('Error while storing file.');
  // });
}

private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}
 
// Always get the accurate path to your apps folder
public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    // return cordova.file.dataDirectory + img;
  }
}

    
  saveData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO tester VALUES(NULL,?,?,?,?,?,?,?,?,?,?,?,?)',[
        this.data.userId,
        this.data.findMeId,
        this.data.officeName,
        this.data.otherNames,
        this.data.mobile,
        this.data.directory,
        this.data.latitude,
        this.data.longitude,
        this.data.location,
        this.data.gender,
        this.data.fileUpload,
        this.data.otherInfo
      ]).then(res => {
          console.log("Save offline data >>> ",JSON.stringify(res));
          console.log("offline data to be save >>> ",JSON.stringify(this.data));
          this.toast.show('Data saved', '5000', 'center').subscribe(
            toast => {
              this.navCtrl.popToRoot();
            }
          );
        })
        .catch(e => {
          console.log("error saving offline data >>> ",JSON.stringify(e));
          this.toast.show(e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(e => {
      console.log("error inserting to offline database >>>",JSON.stringify(e));
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

}