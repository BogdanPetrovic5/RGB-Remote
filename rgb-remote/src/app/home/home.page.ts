import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { BleClient} from '@capacitor-community/bluetooth-le';
import { App } from '@capacitor/app';


import iro from '@jaames/iro';
import { HomePageState } from '../services/states/home-page-state.service';
import { Subject, takeUntil } from 'rxjs';
import { Effects } from '../dto/interfaces/effets.interface';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements AfterViewInit, OnInit{
sendSpeed() {
throw new Error('Method not implemented.');
}
effectSpeed: any;

  async disconnect() {
   if (!this.selectedDevice) return;

    

    try {
      await BleClient.disconnect(this.selectedDevice.deviceId);
      this._homePageState.setDevice(null);
      alert('Disconnected!');
    } catch (err) {
      alert(err);
    }
}


  color:any
  devicesTab:boolean = false;
  settingsTab:boolean = false;
  
  picker: any;
  red: number = 255;
  green: number = 0;
  blue: number = 0;
  public isMusicMode:boolean = false;
  public destroy$ = new Subject<void>();
  public scanedDevicesSub:any;
  public devicesList: any[] = [];
  public selectedDevice:any;
  constructor(
    private _ngZone:NgZone,
    private _homePageState:HomePageState,
    private _cdr:ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    
    this._homePageState.devicesListTab$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next:response=>this.devicesTab = response
    })
     this._homePageState.effectsTab$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next:response=>this.settingsTab = response
    })
    this._homePageState.selectedDevice$.pipe(
        takeUntil(this.destroy$)
      ).subscribe({
      next:response=>{
        this.selectedDevice = response;

        if (this.selectedDevice) {
          
          BleClient.connect(this.selectedDevice.deviceId)
          .then(() => alert("Connected!"))
          .catch(err => alert("Error: " + err));
        }
      }
    })

    this._homePageState.selectedMod$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next:response=>{
        this.setEffect(response);
      }
    })

      App.addListener('appStateChange', async (state) => {
        if (state.isActive) {
          const savedDeviceId = sessionStorage.getItem('selectedDeviceId');
          if (savedDeviceId && !this.selectedDevice) {
            const device = this.devicesList.find(d => d.deviceId === savedDeviceId);
            if (device) {
              this.selectedDevice = device;
              try {
                await BleClient.connect(device.deviceId);
                console.log("Reconnected to BLE device");
              } catch (err) {
                console.error("Reconnect failed", err);
              }
            }
          }
        }
      });
  }


  ngAfterViewInit() {
    this.picker = iro.ColorPicker("#color-wheel", {
      width: 200,
      color: { r: this.red, g: this.green, b: this.blue }
    });

    this.picker.on('color:change', (color: { rgb: { r: number; g: number; b: number; }; }) => {
      this._ngZone.run(() => {
        this.red = color.rgb.r;
        this.green = color.rgb.g;
        this.blue = color.rgb.b;
      });
    });
  }
  pinFormatter(value: number) {
    return `${value}%`;
  }
  setEffect(command:number[]){
    const data = new Uint8Array(command);
    if(this.selectedDevice){
      BleClient.write(
        this.selectedDevice.deviceId,
        '0000FFF0-0000-1000-8000-00805F9B34FB',
        '0000FFF3-0000-1000-8000-00805F9B34FB',
        new DataView(data.buffer)
      ).catch(err => alert(err));
    }
  }
  openEffects() {
    this._homePageState.toggleEffectsTab(true);
  }
  async scan(){
   try{
     await BleClient.initialize();
    const isEnabled = await BleClient.isEnabled();
    if (!isEnabled) {
      await BleClient.requestEnable();
    }
   
    this._homePageState.toggleDevicesList(true);
    
    await BleClient.requestLEScan({allowDuplicates:false},
      result => {
     
       this._ngZone.run(() => {
        
          if(result.device != undefined){
            this.devicesList = [...this.devicesList, result.device];
          }
          
      
           this._cdr.detectChanges();
        });
      }
    )
    setTimeout(async () => {
      await BleClient.stopLEScan();
 
    }, 10000);
   }catch(err) {
    alert(err)
    
   }
    
  }
  
  async sendRGB() {
    const data = new Uint8Array([
      0x7e, 0x00, 0x05, 0x03,
      this.red,   
      this.green,  
      this.blue,   
      0x00,
      0xef
    ]);
    this.isMusicMode = false;
    if(this.selectedDevice){
      
      await BleClient.write(this.selectedDevice.deviceId, '0000FFF0-0000-1000-8000-00805F9B34FB', '0000FFF3-0000-1000-8000-00805F9B34FB', new DataView(data.buffer)).catch(err=>alert(err))
    }
    
  }
  brightnessUp() {
    const hsv = this.picker.color.hsv;
    const newV = Math.min(hsv.v + 10, 100); 
    this.picker.color.set({ h: hsv.h, s: hsv.s, v: newV });
  }

  brightnessDown() {
    const hsv = this.picker.color.hsv;
    const newV = Math.max(hsv.v - 10, 0); 
    this.picker.color.set({ h: hsv.h, s: hsv.s, v: newV });
  }
  settings(){
    this._homePageState.toggleEffectsTab(true)
  }
  turnOffOn(){
    this.isMusicMode = false;
    if(this.red > 0 || this.green > 0 || this.blue > 0){
      this.red = 0;
      this.green = 0;
      this.blue = 0;

      this.sendRGB();
    }else if(this.red == 0 && this.green == 0 && this.blue == 0){
      this.red = 255;
      this.sendRGB();
    }
  }

  changeColor(){
    this.picker.color.set({ r: this.red, g: this.green, b: this.blue });
  }
}
