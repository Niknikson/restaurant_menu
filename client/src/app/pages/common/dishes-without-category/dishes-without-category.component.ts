import { Component, OnInit } from '@angular/core';
import { Dish } from 'src/app/constants/interfaces/dishes';
import { DishesService } from 'src/app/service/dishes.service';

@Component({
  selector: 'app-dishes-without-category',
  templateUrl: './dishes-without-category.component.html',
  styleUrls: ['./dishes-without-category.component.scss']
})
export class DishesWithoutCategoryComponent implements OnInit {

  isLoading: boolean = false
  dishes!: Dish[]
  
  constructor( private dishesService: DishesService,) { }

  ngOnInit(): void {
    // this.dishesService.dishes.subscribe(dishes => this.dishes = dishes)
    // this.dishesService.getDishesWithoutCategory().subscribe(res => {
    //   this.isLoading = false
    // })
  }

}
