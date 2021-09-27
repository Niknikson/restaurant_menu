import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DishesService } from 'src/app/service/dishes.service';
import { CategoryService } from 'src/app/service/category.service';
import { scrollTop } from 'src/app/helpers/helpers';
import { Router } from '@angular/router';


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
    private router: Router,
    public categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.role = this.router.url.split('/')[1]
    this.categoryService.categories.subscribe(data=> this.data = data) 
    this.categoryService.getCategories().toPromise() 
  }

  handlerClick() {
    this.categoryService.clearCategory()
    scrollTop()
  }
  

}
