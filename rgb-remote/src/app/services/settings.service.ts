import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Effects } from '../dto/interfaces/effets.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor(private _httpClient:HttpClient){}
    getEffects():Observable<Effects[]>{
      return this._httpClient.get<Effects[]>("assets/data/mods.json");
    }
}
