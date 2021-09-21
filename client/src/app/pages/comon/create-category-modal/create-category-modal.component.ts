import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-create-category-modal',
  templateUrl: './create-category-modal.component.html',
  styleUrls: ['./create-category-modal.component.scss'],
})
export class CreateCategoryModalComponent implements OnInit {
  constructor(public categoryService: CategoryService) { }
  
  ngOnInit(): void {}

  closeModal() {
    this.categoryService.toggleCreateModal();
  }

}
