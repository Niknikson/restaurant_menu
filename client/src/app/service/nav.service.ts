import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  
   btnMenu: boolean = false;

  constructor() {}

  toggleBtnMenu() {
    this.btnMenu = !this.btnMenu;
  }
}