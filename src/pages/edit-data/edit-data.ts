import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

@IonicPage()
@Component({
  selector: 'page-edit-data',
  templateUrl: 'edit-data.html',
})
export class EditDataPage {

  // data = { rowid:0, userId:"", findMeId:"", officeName:"", otherNames:"", mobile:"", directory:"", latitude:"", location:"", longitude:"", gender:"", fileUpload:"", otherInfo:""};
  data = { rowid:0, userId:"", findMeId:"", officeName:"", firstName:"", middleName:"", lastName:"", otherNames:"", dateOfBirth:"", idType:"", idNo:"", email:"", mobile:"", directory:"", latitude:"", longitude:"",location:"", gender:"", street:"", city:"", state:"", country:"", maritalStatus:"", homeTown:"", landSize:"", fileUpload:"",otherInfo:""};


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    private toast: Toast) {
      this.getCurrentData(navParams.get("rowid"));
  }

  getCurrentData(rowid) {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM tfosu WHERE rowid=?', [rowid])
        .then(res => {
          if(res.rows.length > 0) {
            this.data.rowid = res.rows.item(0).rowid;
            this.data.userId = res.rows.item(0).userId;
            this.data.findMeId = res.rows.item(0).findMeId;
            this.data.officeName = res.rows.item(0).officeName;
            this.data.otherNames = res.rows.item(0).otherNames;
            this.data.mobile = res.rows.item(0).mobile;
            this.data.directory = res.rows.item(0).directory;
            this.data.latitude = res.rows.item(0).latitude;
            this.data.longitude = res.rows.item(0).longitude;
            this.data.location = res.rows.item(0).location;
            this.data.gender = res.rows.item(0).gender;
            this.data.firstName = res.rows.item(0).firstName
            this.data.middleName = res.rows.item(0).middleName
            this.data.lastName = res.rows.item(0).lastName
            this.data.dateOfBirth = res.rows.item(0).dateOfBirth
            this.data.idType = res.rows.item(0).idType
            this.data.idNo = res.rows.item(0).idNo
            this.data.email = res.rows.item(0).email
            this.data.street = res.rows.item(0).street
            this.data.city = res.rows.item(0).city
            this.data.state = res.rows.item(0).state
            this.data.country = res.rows.item(0).country
            this.data.maritalStatus = res.rows.item(0).maritalStatus
            this.data.homeTown = res.rows.item(0).homeTown
            this.data.landSize= res.rows.item(0).landSize
            this.data.fileUpload = res.rows.item(0).fileUpload;
            this.data.otherInfo = res.rows.item(0).otherInfo;
          }
        })
        .catch(e => {
          console.log(JSON.stringify(e));
          this.toast.show(e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

  updateData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('UPDATE tfosu SET findMeId=?,officeName=?,otherNames=?,mobile=?,directory=?,latitude=?,longitude=?,location=?,gender=?,fileUpload=?,otherInfo=? WHERE rowid=?',[
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
          console.log(res);
          this.toast.show('Data updated', '5000', 'center').subscribe(
            toast => {
              this.navCtrl.popToRoot();
            }
          );
        })
        .catch(e => {
          console.log(e);
          this.toast.show(e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

}