import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DishesService } from 'src/app/service/dishes.service';
import {Dish} from '../../constants/interface'

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.scss'],
})
export class DishCardComponent implements OnInit {

  @Input() dish!: Dish;
  updateDishForm: boolean = false

  constructor(public dishesService: DishesService,
  public router: Router) { }

  ngOnInit(): void { }
  
  showUpdateDishForm() {
    this.updateDishForm = !this.updateDishForm
  }

}
