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
  

  private _effectsTab = new BehaviorSubject<any>(false);
  public effectsTab$ = this._effectsTab.asObservable();


  private _selectedMod = new BehaviorSubject<number[]>([]);
  public selectedMod$ = this._selectedMod.asObservable();

  toggleDevicesList(value:boolean){
    this._devicesListTab.next(value);
  }

  toggleEffectsTab(value:boolean){
    this._effectsTab.next(value);
  }
  setDevice(device:any){
    this._selectedDevice.next(device);
  }

  setMod(value:number[]){
    this._selectedMod.next(value)
  }
}
