import { LoginPage } from './../login/login';
import { Component, Directive, Attribute } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Business } from '../../models/business.model';
import { RestProvider } from './../../providers/rest/rest';
import { Geolocation } from '@ionic-native/geolocation';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { Toast } from '@ionic-native/toast';
import { BrModel } from './../../models/brModel';

const DATABASE_FILE_NAME: string ="data.db";


/**
 * Generated class for the FormsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forms',
  templateUrl: 'forms.html',
})

export class FormsPage {
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  error: any;
  isLoading: any;
  isToast: any;
  latitude: any;
  longitude: any;
  base64Image: any;
  photos: any;
  currentLocation: any;

  imageURI:any;
  imageFileName:any;

  selectedId: any;
  selectedName: any;
  selectedGroup: any;

  showSelectedForm: boolean = false;
  sikafoneForm: boolean = false;
  farmersForm: boolean = false;
  public farmerForm: boolean = false;
  public electricianForm: boolean = false;
  public plumberForm: boolean = false;
  public egalAgentForm: boolean = false;
  public ecobankXpressAccount: boolean = false;
  merchanicsForm: boolean = false;
  shopsForm: boolean = false;
  schoolsForm: boolean= false;
  servicesForm: boolean =false;
  churchesForm: boolean = false;
  dealersForm: boolean = false;
  momoForm: boolean = false;
  
  formValues = {} as Business;
  userId: string;
  public db:SQLiteObject;
  
  data = {} as Business;

  expenses: any = [];
  totalIncome = 0;
  totalExpense = 0;
  
  balance = 0;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private restProvider: RestProvider,
              private loadingCtrl: LoadingController,
              private geolocation: Geolocation,
              private camera: Camera,
              private transfer: FileTransfer,
              private toastCtrl: ToastController,
              public storage: Storage,
              private sqlite: SQLite,
              private toast: Toast) {

    this.selectedId = this.navParams.get('id');
    this.selectedName = this.navParams.get('name');
    this.selectedGroup = this.navParams.get('group');

    // this.formValues.userId = this.userId;
    this.formValues.directory = this.selectedName;
    this.formValues.group = this.selectedGroup;
    this.formValues.latitude = this.latitude;
    this.formValues.longitude = this.longitude;
    // this.formValues.fileUpload = this.base64Image;
    this.setGeoLocation();
    console.log('form values', this.formValues);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormsPage');
    this.createDBFile();
    this.getData();
    console.log('selected navParams >>>' + 'id: ' + this.selectedId + '' + 'name: ' + this.selectedName + ' '+ 'group'+ this.selectedGroup);
    this.storage.get('username').then((userId) => {
      console.log('@forms username >>>', userId);
      this.userId = userId;
      this.formValues.userId = userId;
      this.formValues.findMeId = this.restProvider.generateFindMeId();
      // this.formValues.findMeId = "FNDM2020";
    });
    if (this.selectedName == 'Electrician') {
      this.electricianForm = true;
      console.log('selected Electrician form', this.electricianForm);
    } else if (this.selectedName == "Plumber") {
      this.plumberForm = true;
      console.log('selected Plumber form', this.plumberForm);
    } else if (this.selectedName == 'Carpenter') {
      this.merchanicsForm = true;
      console.log('selected Carpenter form', this.merchanicsForm);
    }else if (this.selectedName == "Painter") {
      this.merchanicsForm = true;
      console.log('selected Painter form', this.merchanicsForm);
    }else if (this.selectedName == "Merchanic") {
      this.merchanicsForm = true;
      console.log('selected Merchanic form', this.merchanicsForm);
    }else if (this.selectedName == "Welder") {
      this.merchanicsForm = true;
      console.log('selected Welder form', this.merchanicsForm);
    }else if (this.selectedName == "Coffin Makers") {
      this.merchanicsForm = true;
      console.log('selected Coffin Makers form', this.merchanicsForm);
    }else if (this.selectedName == "Shoemaker(cobbler)") {
      this.merchanicsForm = true;
      console.log('selected Shoemaker(cobbler) form', this.merchanicsForm);
    }else if (this.selectedName == "Mason") {
      this.merchanicsForm = true;
      console.log('selected Mason form', this.merchanicsForm);
    }else if (this.selectedName == "Farmer") {
      this.farmerForm = true;
      console.log('selected main farm form', this.farmerForm);
    }else if (this.selectedName == "Butcher") {
      this.farmersForm = true;
      console.log('selected services form', this.farmersForm);
    }else if (this.selectedName == "Food Vendor") {
      this.farmersForm = true;
      console.log('selected services form', this.farmersForm);
    }else if (this.selectedName == "Fisherman") {
      this.farmersForm = true;
      console.log('selected fisherman form', this.farmersForm);
    }else if (this.selectedName == "Fruit Vendor") {
      this.farmersForm = true;
      console.log('selected Fruit Vendor form', this.farmersForm);
    }else if (this.selectedName == "Petty Food Joints") {
      this.farmersForm = true;
      console.log('selected Petty Food Joints form', this.farmersForm);
    }else if (this.selectedName == "Poultry Breeder") {
      this.farmersForm = true;
      console.log('selected Poultry Breeder form', this.farmersForm);
    }else if (this.selectedName == "Restaurant") {
      this.farmersForm = true;
      console.log('selected Restaurants form', this.farmersForm);
    }else if (this.selectedName == "Police Station") {
      this.servicesForm = true;
      console.log('selected police form', this.servicesForm);
    }else if (this.selectedName == "Fire Service") {
      this.servicesForm = true;
      console.log('selected Fire service form', this.servicesForm);
    }else if (this.selectedName == "Ambulance Service") {
      this.servicesForm = true;
      console.log('selected Ambulance Service form', this.servicesForm);
    }else if (this.selectedName == "Security Guards") {
      this.servicesForm = true;
      console.log('selectedSecurity Guards form', this.servicesForm);
    }else if (this.selectedName == "Immigration") {
      this.servicesForm = true;
      console.log('selectedSecurity Guards form', this.servicesForm);
    }else if (this.selectedName == "Hospital") {
      this.servicesForm = true;
      console.log('selected dealers form', this.servicesForm);
    }else if (this.selectedName == "Clinic") {
      this.servicesForm = true;
      console.log('selected dealers form', this.servicesForm);
    }else if (this.selectedName == "Herbal Center") {
      this.servicesForm = true;
      console.log('selected dealers form', this.servicesForm);
    }else if (this.selectedName == "Pharmacy") {
      this.servicesForm = true;
      console.log('selected pharmacy form', this.servicesForm);
    }else if (this.selectedName == "Computer Engineer") {
      this.servicesForm = true;
      console.log('selected Computer Engineer form', this.servicesForm);
    }else if (this.selectedName == "Banker") {
      this.servicesForm = true;
      console.log('selected Banker form', this.servicesForm);
    }else if (this.selectedName == "Administrator") {
      this.servicesForm = true;
      console.log('selected Administrator form', this.servicesForm);
    }else if (this.selectedName == "Counselor") {
      this.servicesForm = true;
      console.log('selected Counselor form', this.servicesForm);
    }else if (this.selectedName == "Journalist") {
      this.servicesForm = true;
      console.log('selected Journalist form', this.servicesForm);
    }else if (this.selectedName == "Sikafone Agent") {
      this.momoForm = true;
      console.log('selected Sikafone Agent form', this.momoForm);
    }else if (this.selectedName == "Other Mobile Money") {
      this.momoForm = true;
      console.log('selected Other Mobile Money form', this.momoForm);
    }else if (this.selectedName == "Lawyer") {
      this.servicesForm = true;
      console.log('selected Lawyer form', this.servicesForm);
    }else if (this.selectedName == "Doctor") {
      this.servicesForm = true;
      console.log('selected Doctor form', this.servicesForm);
    }else if (this.selectedName == "Nurse") {
      this.servicesForm = true;
      console.log('selected Nurse form', this.servicesForm);
    }else if (this.selectedName == "Teacher") {
      this.servicesForm = true;
      console.log('selected Teacher form', this.servicesForm);
    }else if (this.selectedName == "Tertiary") {
      this.schoolsForm = true;
      console.log('selected Teacher form', this.schoolsForm);
    }else if (this.selectedName == "High schools") {
      this.schoolsForm = true;
      console.log('selected High schools form', this.schoolsForm);
    }else if (this.selectedName == "Junior High schools") {
      this.schoolsForm = true;
      console.log('selectedJunior High schools form', this.schoolsForm);
    }else if (this.selectedName == "Training Institutions") {
      this.schoolsForm = true;
      console.log('selected Training form', this.schoolsForm);
    }else if (this.selectedName == "Vocational") {
      this.schoolsForm = true;
      console.log('selected Vocational form', this.schoolsForm);
    }else if (this.selectedName == "Technical") {
      this.schoolsForm = true;
      console.log('selected Technical form', this.schoolsForm);
    }else if (this.selectedName == "Police Station") {
      this.servicesForm = true;
      console.log('selected police form', this.servicesForm);
    }else if (this.selectedName == "Fire Service") {
      this.servicesForm = true;
      console.log('selected Fire service form', this.servicesForm);
    }else if (this.selectedName == "Fashion Designer") {
      this.servicesForm = true;
      console.log('selected Fashion Designer form', this.servicesForm);
    }else if (this.selectedName == "Barber") {
      this.merchanicsForm = true;
      console.log('selected Barber form', this.merchanicsForm);
    }else if (this.selectedName == "Cooks") {
      this.servicesForm = true;
      console.log('selected cooks form', this.servicesForm);
    }else if (this.selectedName == "General Deliveries") {
      this.servicesForm = true;
      console.log('selected General deliveries form', this.servicesForm);
    }else if (this.selectedName == "Cleaners") {
      this.merchanicsForm = true;
      console.log('selected Banker form', this.merchanicsForm);
    }else if (this.selectedName == "Gardeners") {
      this.merchanicsForm = true;
      console.log('selected Gardeners form', this.merchanicsForm);
    }else if (this.selectedName == "Makeup Artist") {
      this.merchanicsForm = true;
      console.log('selected Makeup Artist form', this.merchanicsForm);
    }else if (this.selectedName == "Seamstress") {
      this.merchanicsForm = true;
      console.log('selected Seamstress form', this.merchanicsForm);
    }else if (this.selectedName == "Tailor") {
      this.merchanicsForm = true;
      console.log('selected Tailor form', this.merchanicsForm);
    }else if (this.selectedName == "Information Centers") {
      this.merchanicsForm = true;
      console.log('selected Information Centers form', this.merchanicsForm);
    }else if (this.selectedName == "Photographer") {
      this.servicesForm = true;
      console.log('selected Photographer form', this.servicesForm);
    }else if (this.selectedName == "Decor") {
      this.servicesForm = true;
      console.log('selected Decor form', this.servicesForm);
    }else if (this.selectedName == "Internet Cafe") {
      this.servicesForm = true;
      console.log('selected Internet Cafe form', this.servicesForm);
    }else if (this.selectedName == "Media House") {
      this.servicesForm = true;
      console.log('selected Media House form', this.servicesForm);
    }else if (this.selectedName == "Printing Press") {
      this.servicesForm = true;
      console.log('selected Printing Press form', this.servicesForm);
    }else if (this.selectedName == "Petty Traders") {
      this.shopsForm = true;
      console.log('selected Petty Traders form', this.shopsForm);
    }else if (this.selectedName == "Spare Parts Dealer") {
      this.shopsForm = true;
      console.log('selected Spare Parts Dealer form', this.shopsForm);
    }else if (this.selectedName == "Supermarkets") {
      this.shopsForm = true;
      console.log('selected Supermarkets form', this.shopsForm);
    }else if (this.selectedName == "Hairdressers") {
      this.shopsForm = true;
      console.log('selected Hairdressers form', this.shopsForm);
    }else if (this.selectedName == "Canopy and Chair Rentals") {
      this.shopsForm = true;
      console.log('selected Canopy and Chair Rentals form', this.shopsForm);
    }else if (this.selectedName == "Laundry") {
      this.shopsForm = true;
      console.log('selected Laundry form', this.shopsForm);
    }else if (this.selectedName == "Building Materials") {
      this.shopsForm = true;
      console.log('selected building materials  form', this.shopsForm);
    }else if (this.selectedName == "Salons") {
      this.shopsForm = true;
      console.log('selected Salons form', this.shopsForm);
    }else if (this.selectedName == "Boutiques") {
      this.shopsForm = true;
      console.log('selected Boutiques form', this.shopsForm);
    }else if (this.selectedName == "Cosmetics Shop") {
      this.shopsForm = true;
      console.log('selected Cosmetics Shop form', this.shopsForm);
    }else if (this.selectedName == "Agro-chemical Shop") {
      this.shopsForm = true;
      console.log('selected Agro-chemical Shop form', this.shopsForm);
    }else if (this.selectedName == "Shops") {
      this.shopsForm = true;
      console.log('selected Shops form', this.shopsForm);
    }else if (this.selectedName == "Car Rentals") {
      this.dealersForm = true;
      console.log('selected Car Rentals form', this.dealersForm);
    }else if (this.selectedName == "Ticketing") {
      this.dealersForm = true;
      console.log('selected Ticketing form', this.dealersForm);
    }else if (this.selectedName == "Travel and Tour Agents") {
      this.dealersForm = true;
      console.log('selected Travel and Tour Agents form', this.dealersForm);
    }else if (this.selectedName == "Car Sales") {
      this.dealersForm = true;
      console.log('selected Car Sales form', this.dealersForm);
    }else if (this.selectedName == "Trotro/Taxi stations") {
      this.dealersForm = true;
      console.log('selected Trotro/Taxi stations form', this.dealersForm);
    }else if (this.selectedName == "Train station") {
      this.dealersForm = true;
      console.log('selected Train station form', this.dealersForm);
    }else if (this.selectedName == "Filling Station") {
      this.servicesForm = true;
      console.log('selected Filling Station form', this.servicesForm);
    }else if (this.selectedName == "LPG Station") {
      this.servicesForm = true;
      console.log('selected LPG Station form', this.servicesForm);
    }else if (this.selectedName == "Egal Directories") {
      this.egalAgentForm = true;
      console.log('selected Egal Directories form', this.egalAgentForm);
    }else if (this.selectedName == "Ecobank Xpress Account") {
      this.ecobankXpressAccount = true;
      console.log('selected Ecobank Xpress Account form', this.ecobankXpressAccount);
    }
    
    this.setGeoLocation();
  }

  ionViewWillEnter() { this.getData(); }

  createDBFile():void {
    this.sqlite.create({
      name: DATABASE_FILE_NAME,
      location: 'default'
    }).then((db: SQLiteObject) => {
      console.log('data.db created!!! ');
      // this.presentToast('data.db created!!! ');
      this.db = db;
      this.createDBTables();
      }).catch(e => console.log(JSON.stringify(e)));
  }

  createDBTables(): void{
    this.db.executeSql('CREATE TABLE IF NOT EXISTS `business`( `id` INTEGER PRIMARY KEY,`userId` TEXT,`findMeId` TEXT,`officeName` TEXT,`otherNames` TEXT,`directory` TEXT,`group` TEXT,`mobile` TEXT,`email` TEXT,`gender` TEXT,`location` TEXT,`latitude` TEXT,`longitude` TEXT,`landSize` TEXT,`websiteUrl` TEXT,`fileUpload` TEXT,`timeDate` DATE,`dob` DATE,`otherInfo` TEXT,`gravatar` TEXT,`uploaded` BOOLEAN)', {}) 
    .then(()=>{
      console.log('Table business is created >>>>');
      // this.presentToast('Table business is created >>>>');

    }).catch(e => {  this.presentToast('error creating table  business >>'+e); console.log(JSON.stringify(e))});
  }

  setGeoLocation() {
    this.geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 30000,
      maximumAge: 30000
    }).then((resp) => {
      this.longitude = resp.coords.longitude;
      this.latitude = resp.coords.latitude;
      this.formValues.longitude = this.longitude
      this.formValues.latitude = this.latitude
      console.log('position resp >> ', resp.coords);
    }).catch((error) => {
      // this.error = error;
      console.log('error: true, '+' message: ', error);
      this.presentErrorToast('NO GPS coordinates, NO Geolocation');
      this.presentErrorToast('Please turn on GPS Location service');
      this.toast.show('Check Network Location service', '5000', 'top').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }
  
  takeCardPicture(){
    console.log('take id card picture ...');
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
      this.formValues.fileUpload = this.base64Image;
      this.formValues.idPicture = imageData;
      this.photos = this.base64Image;
      this.photos.reverse();
    }, (err) => {
     // Handle error
     let errMsg = 'error taking picture'
     console.log('error taking picture>>>' + err);
     this.presentErrorToast(errMsg);
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
      this.formValues.fileUpload = this.base64Image;
      this.formValues.gravatar = imageData;
      this.photos = this.base64Image;
      this.photos.reverse();
    }, (err) => {
     // Handle error
     let errMsg = 'error taking picture'
     console.log('error taking picture>>>' + err);
     this.presentErrorToast(errMsg);
    });
  }

  onSubmit() {
    this.showLoader();
    console.log('user login');
    if (this.formValues) {
      console.log('Business credentials', this.formValues);
      this.isLoading.dismiss();
      this.navCtrl.push('TabsPage');
    }
  }

  getData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS egal(rowid INTEGER PRIMARY KEY, userId TEXT, findMeId TEXT,officeName TEXT, otherNames TEXT, directory TEXT, group TEXT, mobile TEXT,email TEXT,gender TEXT,location TEXT,latitude TEXT,longitude TEXT,farmSize TEXT,websiteUrl TEXT,fileUpload TEXT,timeDate DATE,dob DATE,otherInfo TEXT,gravatar TEXT,uploaded BOOLEAN)', {})
      .then(res => console.log('Executed SQL'))
      .catch(e => console.log(e));
      db.executeSql('SELECT * FROM egal ORDER BY rowid DESC', {})
      .then(res => {
        this.expenses = [];
        for(var i=0; i<res.rows.length; i++) {
          this.expenses.push({rowid:res.rows.item(i).rowid,userId:res.rows.item(i).userId,findMeId:res.rows.item(i).findMeId,officeName:res.rows.item(i).officeName,otherNames:res.rows.item(i).otherNames})
        }
      })
      .catch(e => console.log(e));
      db.executeSql('SELECT SUM(amount) AS totalIncome FROM expense WHERE type="Income"', {})
      .then(res => {
        if(res.rows.length>0) {
          this.totalIncome = parseInt(res.rows.item(0).totalIncome);
          this.balance = this.totalIncome-this.totalExpense;
        }
      })
      .catch(e => console.log(e));
      db.executeSql('SELECT SUM(amount) AS totalExpense FROM expense WHERE type="Expense"', {})
      .then(res => {
        if(res.rows.length>0) {
          this.totalExpense = parseInt(res.rows.item(0).totalExpense);
          this.balance = this.totalIncome-this.totalExpense;
        }
      })
    }).catch(e => console.log(e));
  }

  addData() {
    this.navCtrl.push("AddDataPage");
  }

  addBusiness() {
    this.showLoader();
    console.log('formValues >>>', this.formValues);
    if(this.formValues.userId !==null){
      this.restProvider.createBusiness(this.formValues).then((result) => {
        console.log('Business added successfully',result);
        this.isLoading.dismiss();
        this.presentToast('Business added successfully') 
        this.navCtrl.pop();
      }, (err) => {
        console.log(JSON.stringify(err));
        // this.error = err;
        this.isLoading.dismiss();
        this.presentErrorToast("An error occured >>> ");
        console.log('duplicate entry');
        this.presentErrorToast("duplicate entry: phone number used >>> "+ JSON.stringify(err));
        this.toast.show('Check Network Location service', '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      });
    }else{
      let msg = 'No username, Signout and';
      this.isLoading.dismiss();
      this.presentErrorToast('No username');
      this.presentErrorToast('Please signout and restart the app');
      this.navCtrl.setRoot(LoginPage);
    }
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
    duration: 6000,
    position: 'middle'
  });
  this.isToast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });
  this.isToast.present();
 }

}

