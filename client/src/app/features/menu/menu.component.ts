import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { scrollTop } from 'src/app/helpers/helpers';
import { ActivatedRoute, Router } from '@angular/router';
import { DishesService } from 'src/app/service/dishes.service';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() title: string = 'Restaurant Menu';
  @Input() menuDirection: string = 'row';

  data: any
  role!: string

  constructor(
    private dishesService: DishesService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }


  setParams(param: string, value: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        [param]: value
      },
      // queryParamsHandling: 'merge',
      // skipLocationChange: true
    });
  }



  ngOnInit() {
    this.role = this.router.url.split('/')[1]
    this.categoryService.categories.subscribe(data => this.data = data)
    this.categoryService.getCategories().toPromise()
  }

  handlerClick(param: string, value: string) {
    this.setParams(param, value)
    this.categoryService.clearCategory()
    scrollTop()
    this.dishesService.toggleAllDish(false)
  }

  clearParams() {
    let path = this.role === 'admin' ? "admin/menu" : "/menu"
    this.router.navigate([path], {
      queryParams: {
        'categoryId': null,
        'top': null,
        'dish': null,
        'search': null,
      },
      queryParamsHandling: 'merge'
    })
    
  }

  getAllDishes() {
    this.clearParams()
    this.categoryService.clearCategory()
    this.dishesService.toggleAllDish(true)
  }


}
