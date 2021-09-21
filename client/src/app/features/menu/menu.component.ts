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

  constructor(
    private dishesService: DishesService,
    public menuService: CategoryService
  ) {}

  ngOnInit(): void {
    this.menuService.getCategories();
  }

  handlerClick() {
    this.dishesService.getDishesByCategory();
  }
}
