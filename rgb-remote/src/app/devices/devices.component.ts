import { Component, Input, OnInit } from '@angular/core';
import { HomePageState } from '../services/states/home-page-state.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
  standalone: false,
})
export class DevicesComponent  implements OnInit {

  @Input() devices:any;
  constructor(private _homePageState:HomePageState) { }

  ngOnInit() {}
  close(){
    this._homePageState.toggleDevicesList(false);
  }
  connect(device:any){
    this._homePageState.setDevice(device);
    this._homePageState.toggleDevicesList(false)
  }
}
