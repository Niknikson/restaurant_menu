import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DishesService } from 'src/app/service/dishes.service';
import { CategoryService } from 'src/app/service/category.service';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() title: string = 'Restaurant Menu';
  @Input() menuDirection: string = 'row';

  data: any

  constructor(
    private dishesService: DishesService,
    public categoryService: CategoryService
  ) {}

  async ngOnInit(): Promise<any> {
    this.categoryService.currentCategories.subscribe(data=> this.data = data) 
    this.categoryService.getCategories().toPromise()
     
  }

  handlerClick() {
    this.dishesService.getDishesByCategory();
  }
}
