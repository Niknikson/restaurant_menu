import { Component, OnInit } from '@angular/core';
import { DishesService } from 'src/app/service/dishes.service';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.scss'],
})
export class ClientPageComponent implements OnInit {

  constructor(public dishesService: DishesService) {}

  ngOnInit(): void {
    this.dishesService.getDishesByCategory();
  }
  
}
