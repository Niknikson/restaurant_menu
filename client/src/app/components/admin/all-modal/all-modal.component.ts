import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { DishesService } from 'src/app/service/dishes.service';
import { InfoService } from 'src/app/service/info.service';

@Component({
  selector: 'app-all-modal',
  templateUrl: './all-modal.component.html',
  styleUrls: ['./all-modal.component.scss']
})
export class AllModalComponent implements OnInit {

  activeDishesModal!: boolean;
  activeCategoryModal!: boolean;
  activeInfoModal!: boolean;

  constructor(
    private dishesService: DishesService,
    private categoryService: CategoryService,
    private infoService: InfoService) {
   }

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
