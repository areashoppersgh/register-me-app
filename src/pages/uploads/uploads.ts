import { RestProvider } from './../../providers/rest/rest';
import { LoginPage } from './../login/login';
import { Geolocation } from '@ionic-native/geolocation';
import { Directory } from './../../models/directory.model';
import { Business } from './../../models/business.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast';

/**
 * Generated class for the UploadsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-uploads',
  templateUrl: 'uploads.html',
})
export class UploadsPage {
  database:SQLiteObject;
  public mybusiness: Array<Business>;
  public myUpBusiness: Array<Object>;
  public myPenBusiness: Array<Object>;
  
  loadOffliners:boolean=false;
  loadUploaders:boolean=false;
  loadPending:boolean=false;

  expenses: any = [];
  totalIncome = 0;
  totalExpense = 0;
  balance = 0;
  latitude: any="";
  longitude: any="";
  findMeId: any;
  userId: any;
  isLoading: any;
  isToast: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private sqlite: SQLite,
              private geolocation: Geolocation,
              public storage: Storage,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private toast: Toast,
              private restProvider: RestProvider) {
            console.log('all expenses >>>',JSON.stringify(this.expenses));
            console.log('geocode >>>',JSON.stringify(this.latitude));
            console.log('const userId >>>',JSON.stringify(this.userId));
            this.setGeoLocation();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadsPage');
    this.storage.get('username').then((userId) => {
      console.log('@offlinePage isLoggedIn >>>', userId);
      this.userId = userId;
      console.log('@offlinePage this.userId >>>', this.userId);
    });
    this.getData();
    this.setGeoLocation();
  }

  ionViewWillEnter() { this.getData(); }

  setGeoLocation() {
    this.geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 30000,
      maximumAge: 30000
    }).then((resp) => {
      this.longitude = resp.coords.longitude;
      this.latitude = resp.coords.latitude;
      console.log('position resp >> ', resp.coords);
    }).catch((error) => {
      this.presentToast('NO GPS coordinates, NO Geolocation');
      // this.error = error;
      console.log('error: true, '+' message: ', error);
      this.presentToast('Please turn on your GPS Locator');
      this.toast.show('Check Network Location service', '5000', 'bottom').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

  getData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      // db.executeSql('CREATE TABLE IF NOT EXISTS expense(rowid INTEGER PRIMARY KEY, date TEXT, type TEXT, description TEXT, amount INT)', {})
      db.executeSql('CREATE TABLE IF NOT EXISTS tester(rowid INTEGER PRIMARY KEY, userId TEXT, findMeId TEXT,officeName TEXT, otherNames TEXT, mobile TEXT, directory TEXT, latitude TEXT, longitude TEXT, location TEXT, gender TEXT, fileUpload BLOB, otherInfo TEXT)', {})
      .then(res => console.log('Executed SQL: ' + ' CREATE TABLE IF NOT EXISTS tester'))
      .catch(e => console.log(JSON.stringify(e)));
      db.executeSql('SELECT * FROM tester ORDER BY rowid DESC', {})
      .then(res => {
        console.log("SELECT * FROM tester ORDER BY rowid DESC resp >>>", JSON.stringify(res));
        this.expenses = [];
        for(var i=0; i<res.rows.length; i++) {
          this.expenses.push({rowid:res.rows.item(i).rowid,userId:res.rows.item(i).userId,findMeId:res.rows.item(i).findMeId,officeName:res.rows.item(i).officeName,otherNames:res.rows.item(i).otherNames,mobile:res.rows.item(i).mobile,directory:res.rows.item(i).directory,latitude:res.rows.item(i).latitude,longitude:res.rows.item(i).longitude,location:res.rows.item(i).location,gender:res.rows.item(i).gender,fileUpload:res.rows.item(i).fileUpload,otherInfo:res.rows.item(i).otherInfo})
        }
      })
      .catch(e => console.log('error select * from tester ',e));
      db.executeSql('SELECT SUM(amount) AS totalIncome FROM tester WHERE type="Income"', {})
      .then(res => {
        if(res.rows.length>0) {
          this.totalIncome = parseInt(res.rows.item(0).totalIncome);
          this.balance = this.totalIncome-this.totalExpense;
        }
      })
      .catch(e => console.log(e));
      db.executeSql('SELECT SUM(amount) AS totalExpense FROM tester WHERE type="Expense"', {})
      .then(res => {
        if(res.rows.length>0) {
          this.totalExpense = parseInt(res.rows.item(0).totalExpense);
          this.balance = this.totalIncome-this.totalExpense;
        }
      })
    }).catch(e => console.log(e));
  }

  addData() { this.navCtrl.push("AddDataPage"); }
  
  editData(rowid) {
    this.navCtrl.push("EditDataPage", { rowid:rowid });
  }

  deleteData(rowid) {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM tester WHERE rowid=?', [rowid])
      .then(res => {
        console.log("Delete from tester", JSON.stringify(res));
        this.getData();
      })
      .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }



  uploadOnline(data) {
    this.showLoader();
    console.log('offline form data >>>', JSON.stringify(data));
    if(data.userId !==null){
      this.restProvider.createBusiness(data).then((result) => {
        console.log('Business added successfully',JSON.stringify(result));
        this.deleteData(data.rowid); 
        this.isLoading.dismiss();
        this.presentToast('offline data uploaded successfully')
        this.getData();
        this.navCtrl.pop();
        // window.location.reload();
      }, (err) => {
        console.log('error posting offline form data',JSON.stringify(err));
        // this.error = err;
        this.isLoading.dismiss();
        this.presentToast("error posting offline form data"+"check your location serivce");
        this.toast.show('Check Network Location service', '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      });
    }else{
      let msg = 'Oops, no user records, Login';
      this.isLoading.dismiss();
      this.presentToast(msg);
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
    duration: 6000,
    position: 'middle'
    });
    this.isToast.present();
  }

}