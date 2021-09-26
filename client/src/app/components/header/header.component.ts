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

  info!: Info 

  constructor(
    private infoService: InfoService,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.infoService.fetchInfo().subscribe(res => {
    })
    this.infoService.info.subscribe(data => this.info = data)
  }

  handlerClickBtn() {
    this.headerService.toggleBtnMenu()
  }

}
