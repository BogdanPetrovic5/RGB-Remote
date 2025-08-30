import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomePageState {
  private _devicesListTab = new BehaviorSubject<boolean>(false);
  public devicesListTab$ = this._devicesListTab.asObservable();

  private _selectedDevice = new BehaviorSubject<any>(null);
  public selectedDevice$ = this._selectedDevice.asObservable();
  
  toggleDevicesList(value:boolean){
    this._devicesListTab.next(value);
  }
  setDevice(device:any){
    this._selectedDevice.next(device);
  }
}
