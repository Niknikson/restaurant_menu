import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { DishesService } from 'src/app/service/dishes.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  buttonLoading = false;

  constructor(
    public dishesService: DishesService,
    public categoryService: CategoryService
  ) {}

  ngOnInit(): void {}

  addNewCategory(event: any): void {
    this.categoryService.toggleCreateModal()
  }
  addNewDish(event: any): void {
    this.dishesService.toggleCreateModal();
  }
}
