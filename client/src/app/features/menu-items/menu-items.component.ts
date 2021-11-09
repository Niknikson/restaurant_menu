import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { scrollTop } from 'src/app/helpers/helpers';
import { DishesService } from 'src/app/service/dishes.service';
import { Category } from '../../constants/interfaces/category';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss'],
})
export class MenuItemsComponent implements OnInit {

  @Input() category!: Category;

  role!: any
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dishesService: DishesService,
  ) { }

  ngOnInit(): void {
    this.role = this.router.url.split('/')[1]
  }

  routMenuClick(id: string): void {
    this.setParams(id)
    scrollTop()
    this.dishesService.toggleAllDish(false)
  }

  setParams(id: string): void{
     this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        categoryId : id}
    });
   }

}
