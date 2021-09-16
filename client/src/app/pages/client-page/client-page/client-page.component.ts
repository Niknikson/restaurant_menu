import { Component, OnInit } from '@angular/core';
import { DishesService } from 'src/app/service/dishes.servise';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.scss'],
})
export class ClientPageComponent implements OnInit {

  constructor(private dishesService: DishesService) {}

  ngOnInit(): void {
    this.dishesService.getDishes(this.dishesService.id);
  }
}

