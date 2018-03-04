import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfflineBasicInfoPage } from './offline-basic-info';

@NgModule({
  declarations: [
    OfflineBasicInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(OfflineBasicInfoPage),
  ],
})
export class OfflineBasicInfoPageModule {}
