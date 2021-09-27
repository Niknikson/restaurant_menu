import {  Component, OnInit } from '@angular/core';
import { Dish } from 'src/app/constants/interface';
import { CategoryService } from 'src/app/service/category.service';
import { DishesService } from 'src/app/service/dishes.service';
import { InfoService } from 'src/app/service/info.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {

  
  activeDishesModal!: boolean;
  activeCategoryModal!: boolean;
  activeInfoModal!: boolean;
  
  constructor(
    public dishesService: DishesService,
    public categoryService: CategoryService,
    public infoService: InfoService
  ) {}

  ngOnInit(): void {
    this.categoryService.activeModal.subscribe(activeModal => this.activeCategoryModal = activeModal)
    this.infoService.activeModal.subscribe(activeModal => this.activeInfoModal = activeModal)
    this.dishesService.activeModal.subscribe(activeModal => this.activeDishesModal = activeModal)
  }

  closeModalDish() {
    this.dishesService.showModal()
  } 
  
  closeModalInfo() {
    this.infoService.showModal()
  }

  closeModalCategory() {
    this.categoryService.showModal()
  }  
}
