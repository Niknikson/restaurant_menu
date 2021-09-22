import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DishesService } from 'src/app/service/dishes.service';
import { Category } from '../../constants/interface';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss'],
})
export class MenuItemsComponent implements OnInit {
  @Input() category!: Category;

  constructor(private dishesService: DishesService,
    public router: Router) { }

  ngOnInit(): void {
  }

  handlerClick(id: string) {
    this.dishesService.getDishesByCategory(id);
  }
}
