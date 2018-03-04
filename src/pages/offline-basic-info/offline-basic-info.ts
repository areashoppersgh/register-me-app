import { SQLiteObject, SQLite } from '@ionic-native/sqlite';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading  } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

/**
 * Generated class for the OfflineBasicInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-offline-basic-info',
  templateUrl: 'offline-basic-info.html',
})

export class OfflineBasicInfoPage {

  lastImage: string = null;
  loading: Loading;
  basic:FormGroup;
  imageUrl:string='null';
  constructor(public navCtrl: NavController, public navParams: NavParams,private fb:FormBuilder, private camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController,private sqlite:SQLite) {

    this.basic = fb.group({
      surname:[null,Validators.compose([Validators.required,Validators.minLength(2)])],
      othernames:[null,Validators.compose([Validators.required,Validators.minLength(2)])],
      gender:[null,Validators.compose([Validators.required,Validators.minLength(4)])],
      email:[null,Validators.compose([Validators.minLength(5)])],
      phone:[null,Validators.compose([Validators.required,Validators.minLength(10)])],
      password:[null,Validators.compose([Validators.required,Validators.minLength(5)])],
      dob:[null,Validators.required]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfflineBasicInfoPage');
  }

  
  public presentActionSheet() {
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
  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
   
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            
            let realPicName =this.createFileName();
            this.copyFileToLocalDir(correctPath, currentName, realPicName);

            // get picture name for offline DB storage
            this.imageUrl = correctPath+currentName;
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        let realPicName =this.createFileName();
      this.copyFileToLocalDir(correctPath, currentName, realPicName);
      this.imageUrl = correctPath+currentName;
      
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
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
  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.lastImage = newFileName;
  }, error => {
    this.presentToast('Error while storing file.');
  });
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
    return cordova.file.dataDirectory + img;
  }
}

saveBasic() {
  
  this.sqlite.create({
    name:'findMe.db',
    location:'default'
  }).then((db:SQLiteObject)=>{
      db.executeSql('INSERT INTO user VALUES(NULL,?,?,?,?,?,?,?,?,?,?)',
      [
        this.basic.controls.surname.value,
        this.basic.controls.othernames.value,
        this.basic.controls.email.value,
        this.basic.controls.gender.value,
        this.basic.controls.phone.value,
        this.basic.controls.dob.value,
        this.basic.controls.password.value,
        this.imageUrl,
        localStorage.getItem('agentId'),
        0
        
      
      ]).then((response)=>{
       //foreign key of created user to be referenced as user_id in relating tables
        localStorage.setItem('insertId',JSON.stringify(response['insertId'])); 
         
        this.presentToast('Offline data stored');
        this.navCtrl.popTo("OfflineRegistrationPage");
     
       
      }).catch((error=>{
        this.presentToast('Offline data storage failed '+error);
        
      }));
  }).catch((error)=>{
    this.presentToast('Offline database error 2'+error);
  })
 
  
}


}
