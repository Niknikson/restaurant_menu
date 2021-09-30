import { Component, OnInit } from '@angular/core';
import { Info } from 'src/app/constants/interfaces/dishes';
import { RESPONSE_MSG } from 'src/app/constants/responseMsg';
import { InfoService } from 'src/app/service/info.service';
import { HeaderService } from '../../service/nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  info!: Info 

  constructor(
    private infoService: InfoService,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.infoService.info.subscribe(data => this.info = data)
    this.infoService.fetchInfo().toPromise()
  }

  handlerClickBtn() {
    this.headerService.toggleBtnMenu()
  }

}
