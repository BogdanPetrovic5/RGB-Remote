import { Component, NgZone } from '@angular/core';
import iro from '@jaames/iro';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {


  color:any
  constructor(private _ngZone:NgZone) {}

  picker: any;
  red: number = 255;
  green: number = 0;
  blue: number = 0;
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
  // setModels(r: number, g: number, b: number){
  //   this.red = r;
  //   this.green = g;
  //   this.blue = b;
  // }
  sendRGB(r: number, g: number, b: number) {
 
    
  }
  brightnessUp(){
    this.picker.color.set({ r: this.red + 10, g: this.green + 10, b: this.blue + 10 });
  }
  brightnessDown(){
    this.picker.color.set({ r: this.red - 10, g: this.green - 10, b: this.blue - 10 });
  }
  changeColor(){
    this.picker.color.set({ r: this.red, g: this.green, b: this.blue });
  }
}
