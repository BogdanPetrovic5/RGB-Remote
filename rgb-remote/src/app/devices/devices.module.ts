import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesComponent } from './devices.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [DevicesComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[DevicesComponent]
  
})
export class DevicesModule { }
