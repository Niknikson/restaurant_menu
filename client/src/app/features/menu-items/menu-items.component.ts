import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DishesService } from 'src/app/service/dishes.servise';
import { Category } from './../menu/menu.component';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss'],
})
export class MenuItemsComponent implements OnInit {
   @Input() category!: Category;
  // @Output() getyCategoryId = new EventEmitter<number>();

  constructor(private dishesService: DishesService) {}

  ngOnInit(): void {}

  handlerClick(id: string) {
    //this.getyCategoryId.emit(id);
    this.dishesService.setDishId(id)
  }
}
