import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { RestProvider } from '../../providers/rest/rest';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/**
 * Generated class for the DirectoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-directory',
  templateUrl: 'directory.html',
})
export class DirectoryPage {
  directories: any;
  isLoading: any;
  allBusiness: any;
  isToast: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private restProvider: RestProvider,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    private sqlite: SQLite,
    private toastCtrl: ToastController) {
      // this.createUserTable();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DirectoryPage');
    this.showLoader();
    this.restProvider.getLocalDirectories().then(data =>{
      this.isLoading.dismiss();
      this.directories = data['items'];
      console.log('all directories', this.directories);
    },(err) => {
      console.log("error occured ~ ", err);
    })
    // this.restProvider.getDirectories().then((data) => {
    //   this.isLoading.dismiss();
    //   this.directories = data;
    //   console.log('all directories', this.directories);
    // }, (err) => {
    //   console.log("an error occured from getDirectories");
    // });
  }
  
  selectedPost(post){
    console.log('selected directory', post);
    if(post.name == 'Electrician'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group });
    }else if( post.name == 'Plumber'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Carpenter'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Painter'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Merchanic'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Welder'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Mason'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Shoemaker(cobbler)'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Coffin Makers'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Shops'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Services'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Dealers'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Mobile Money'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Farmer'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Butcher'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Food Vendor'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Fisherman'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Fruit Vendor'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Poultry Breeder'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Restaurant'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Petty Food Joints'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Police Station'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Fire Service'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Ambulance Service'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Security Guards'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Immigration'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Hospital'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Clinic'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Herbal Center'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Computer Engineer'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Banker'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Administrator'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Counselor'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Journalist'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Sikafone Agent'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Other Mobile Money'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Lawyer'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Doctor'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Nurse'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Teacher'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Tertiary'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'High schools'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Junior High schools'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Training Institutions'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Vocational'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Technical'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Cooks'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'General Deliveries'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Fashion Designer'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Hairdressers'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Barber'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Cleaners'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Gardeners'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Makeup Artist'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Seamstress'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Tailor'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Decor'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Internet Cafe'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Information Centers'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Photographer'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Printing Press'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Media House'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Petty Traders'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Spare Parts Dealer'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Supermarkets'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Canopy and Chair Rentals'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Laundry'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Building Materials'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Salons'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Boutiques'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Cosmetics Shop'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Agro-chemical Shop'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Trotro/Taxi stations'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Car Rentals'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Ticketing'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Travel and Tour Agents'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Car Sales'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Train station'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Filling Station'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'LPG Station'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Egal Directories'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Pharmacy'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Shops'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }else if( post.name == 'Ecobank Xpress Account'){
      this.navCtrl.push('FormsPage',{ id: post.id, name: post.name,  group: post.group});
    }
    
  }
  // Create basic user bio data table
 
  
  toggleSection(i) {
    this.directories[i].open = !this.directories[i].open;
  }
 
  toggleItem(i, j) {
    this.directories[i].children[j].open = !this.directories[i].children[j].open;
  }

  search():void{ console.log('goto search page')}

  showLoader() {
    this.isLoading = this.loadingCtrl.create({
      content: 'Loading directories...'
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
