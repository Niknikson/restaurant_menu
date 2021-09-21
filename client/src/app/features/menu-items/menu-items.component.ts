import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DishesService } from 'src/app/service/dishes.service';
import { Category } from '../../constants/interface';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss'],
})
export class MenuItemsComponent implements OnInit {
  
   @Input() category!: Category;

  constructor(private dishesService: DishesService) {}

  ngOnInit(): void {}

  handlerClick(id: string) {
    this.dishesService.getDishesByCategory(id)
  }
}
