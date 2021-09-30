import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/constants/interfaces/category';
import { Dish } from 'src/app/constants/interfaces/dishes';
import { CategoryService } from 'src/app/service/category.service';
import { DishesService } from 'src/app/service/dishes.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss']
})
export class DishesComponent implements OnInit {

  isLoading: boolean = false
  categories!: Category[]
  allDish: boolean = true
  dishes!: Dish[]
  role!: string

  constructor(
    private categoryService: CategoryService,
    private dishesService: DishesService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.categoryService.categories.subscribe(data => this.categories = data)
    this.dishesService.allDish.subscribe(allDish => this.allDish = allDish)
    this.dishesService.dishes.subscribe(dishes => this.dishes = dishes)
    this.role = this.router.url.split('/')[1]

    this.route.queryParams
      .subscribe(params => {
        this.isLoading = true
        this.dishesService.saveParams(params)
        this.getDishWithParams()
        !this.isEmptyObj(params) && this.dishesService.toggleAllDish(false)
      }
      );
  }

  getDishWithParams() {
    this.dishesService.getDishesWithParams().subscribe(res => this.isLoading = false)
  }

  isEmptyObj(obj: any) {
    return Object.keys(obj).length === 0;
  }

}


