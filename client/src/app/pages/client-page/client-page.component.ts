import { Component, OnInit } from '@angular/core';
import { Dish } from 'src/app/constants/interface';
import { DishesService } from 'src/app/service/dishes.service';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.scss'],
})
export class ClientPageComponent implements OnInit {

  dishes!: Dish[]

  constructor(public dishesService: DishesService) {}

  ngOnInit(): void {
     this.dishesService.dishes.subscribe(dishes => this.dishes = dishes)
    this.dishesService.getDishesByCategory().toPromise()
  }
  
}

