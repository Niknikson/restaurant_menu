import { Component, OnInit } from '@angular/core';
import { Info } from 'src/app/constants/interface';
import { InfoService } from 'src/app/service/info.service';
import { HeaderService } from '../../service/nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  info: Info = {
    id: '',
    wifi: '',
    phone: '',
    address: '',
  };

  constructor(
    public infoService: InfoService,
    public headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.infoService
      .fetchInfo()
      .subscribe((response) => (this.info = response));
  }

  handlerClickBtn() {
    this.headerService.toggleBtnMenu()
  }

}
