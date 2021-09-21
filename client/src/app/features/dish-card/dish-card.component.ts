import { Component, OnInit, Input } from '@angular/core';
import { DishesService } from 'src/app/service/dishes.service';
import {Dish} from '../../constants/interface'

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.css'],
})
export class DishCardComponent implements OnInit {

  @Input() dish!: Dish;

  constructor(public dishesService: DishesService) {}

  ngOnInit(): void {}
}
