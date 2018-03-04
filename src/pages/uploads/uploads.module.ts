import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadsPage } from './uploads';

@NgModule({
  declarations: [
    UploadsPage,
  ],
  imports: [
    IonicPageModule.forChild(UploadsPage),
  ],
})
export class UploadsPageModule {}
