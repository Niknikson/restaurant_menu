import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DishesService } from 'src/app/service/dishes.service';
import { MenuService } from 'src/app/service/menu.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  @Input() title: string = 'Restaurant Menu';

  constructor(
    private dishesService: DishesService,
    public menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.menuService.getCategories();
  }

  handlerClick() {
    this.dishesService.getDishesByCategory();
  }
}
