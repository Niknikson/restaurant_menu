import { Component, OnInit } from '@angular/core';
import { DishesService } from 'src/app/service/dishes.servise';


@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.css'],
})
export class DishCardComponent implements OnInit {

  constructor(public dishesService: DishesService) {}

  ngOnInit(): void {}
}
