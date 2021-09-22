import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/service/nav.service';

@Component({
  selector: 'app-btn-menu',
  templateUrl: './btn-menu.component.html',
  styleUrls: ['./btn-menu.component.scss'],
})
export class BtnMenuComponent implements OnInit {

  constructor(public headerService: HeaderService) {}

  ngOnInit(): void {}

  closeNavMenu() {
    this.headerService.toggleBtnMenu();
  }

  onEvent(event: { stopPropagation: () => void; }) {
    event.stopPropagation();
  }
  
}
