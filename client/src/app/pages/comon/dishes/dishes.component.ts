import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Dish } from 'src/app/constants/interface';
import { CategoryService } from 'src/app/service/category.service';
import { DishesService } from 'src/app/service/dishes.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss']
})
export class DishesComponent implements OnInit {

  dishes!: Dish[]

  constructor(
    private categoryService: CategoryService,
    private dishesService: DishesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.dishesService.dishes.subscribe(dishes => this.dishes = dishes)
    this.route.params.subscribe(params => {
      console.log(params.id)
    this.dishesService.getDishesByCategory(params.id).subscribe(res => {
    })
    this.categoryService.getCategory(params.id).subscribe(res => {
    })
      
    })
  }
   
  }


