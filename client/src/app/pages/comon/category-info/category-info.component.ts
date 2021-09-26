import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { Category } from './../../../constants/interface';

@Component({
  selector: 'app-category-info',
  templateUrl: './category-info.component.html',
  styleUrls: ['./category-info.component.scss']
})
export class CategoryInfoComponent implements OnInit {

  activeDeleteModal: boolean = false
  category!: Category

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.category.subscribe(data =>this.category = data)
    
  }
  
   showUpdateCategoryModal(){
     this.categoryService.showModal()
     this.categoryService.createUpdateCategory('update')
}

  deleteCategory() {
    this.categoryService.deleteCategory(this.category.id).subscribe(res => {
      console.log('delete')
    })
  }

  toggleModalDelete() {
    this.activeDeleteModal = !this.activeDeleteModal
  }

}
