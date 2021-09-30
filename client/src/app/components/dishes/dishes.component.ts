import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
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
//
  categories!: Category[]
  all: boolean = true
  //

  isLoading: boolean = false
  dishes!: Dish[]
  role!: any

  constructor(
    private categoryService: CategoryService,
    private dishesService: DishesService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.categoryService.categories.subscribe(data => this.categories = data)


    this.role = this.router.url.split('/')[1]
    this.dishesService.dishes.subscribe(dishes => this.dishes = dishes)
    this.route.queryParams
      .subscribe(params => {
        this.dishesService.saveParams(params)
        this.dishesService.getDishesWithParams().subscribe(res => console.log(res))
        if (params.categoryId) {
           this.categoryService.getCategory(params.categoryId).toPromise()
        }
      }  
    );
    // this.route.params.subscribe(params => {
    //  console.log(params)
    // this.isLoading = true
    // this.dishesService.saveId(params.id)
    // this.dishesService.getDishesByCategory().subscribe(res => {
    // this.isLoading = false
    // })
    // })

  }
   
  }


