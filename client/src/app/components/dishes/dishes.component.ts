import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Dish } from 'src/app/constants/interface';
import { CategoryService } from 'src/app/service/category.service';
import { DishesService } from 'src/app/service/dishes.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss']
})
export class DishesComponent implements OnInit {

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
    this.role = this.router.url.split('/')[1]
    this.dishesService.dishes.subscribe(dishes => this.dishes = dishes)

    this.route.params.subscribe(params => {
    this.isLoading = true
    this.dishesService.saveId(params.id)
    this.dishesService.getDishesByCategory().subscribe(res => {
    this.isLoading = false
    })
     if( !(params.id == 'top_dishes') && !(params.id == 'dishes_without_category')) 
       this.categoryService.getCategory(params.id).toPromise()
    })
  }
   
  }


