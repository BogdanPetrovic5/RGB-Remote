import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { Effects } from '../dto/interfaces/effets.interface';
import { HomePageState } from '../services/states/home-page-state.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone:false
})
export class SettingsComponent  implements OnInit {

  public effects:Effects[] = []
  constructor(
    private _settingsService:SettingsService,
    private _homePageState:HomePageState
  ) { }
  close(){
    this._homePageState.toggleEffectsTab(false);
  }
  ngOnInit() {
    this._settingsService.getEffects().subscribe({
      next:response=>{
        this.effects = response;
      }
    })
  }
  choose(effect:Effects){
    this._homePageState.setMod(effect.command);
  }

}
