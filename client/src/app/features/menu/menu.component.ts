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

  constructor(
    private dishesService: DishesService,
    public menuService: CategoryService
  ) {}

   async ngOnInit(): Promise<any> {
   
     let promis = await this.menuService.getCategories().toPromise()
     
  }

  handlerClick() {
    this.dishesService.getDishesByCategory();
  }
}
