import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { DishesService } from 'src/app/service/dishes.service';
import { InfoService } from 'src/app/service/info.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  buttonLoading = false;
  inputOne = true
  externalValue = 'nik'

  constructor(
    public dishesService: DishesService,
    public categoryService: CategoryService,
    public infoService: InfoService
  ) {}

  ngOnInit(): void { }
  
  activeModalInfo(event: any): void {
   this.infoService.activeModal = 'active'
  }
  closeModalInfo() {
    this.infoService.activeModal = ''
  }

  addNewCategory(event: any): void {
    this.categoryService.toggleCreateModal()
  }
  addNewDish(event: any): void {
    this.dishesService.toggleCreateModal();
  }
}
