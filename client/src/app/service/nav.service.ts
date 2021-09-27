import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  
   btnMenu: boolean = false;

  constructor() {}

  toggleBtnMenu() {
    console.log('btn')
    this.btnMenu = !this.btnMenu;
  }
}