import { Component, OnInit } from '@angular/core';
import { Info } from 'src/app/constants/interfaces/dishes';
import { InfoService } from 'src/app/service/info.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  info!: Info

  constructor(private infoService: InfoService,) { }

  ngOnInit(): void {
    this.infoService.info.subscribe(data => this.info = data)
  }

}
