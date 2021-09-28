import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { Category } from '../../../constants/interface';

@Component({
  selector: 'app-category-info',
  templateUrl: './category-info.component.html',
  styleUrls: ['./category-info.component.scss']
})
export class CategoryInfoComponent implements OnInit {

  activeDeleteModal: boolean = false
  category!: Category
  loading: boolean = false;
  disabled: boolean = false;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.category.subscribe(data =>this.category = data)
    
  }
  
   showUpdateCategoryModal(){
     this.categoryService.showModal()
     this.categoryService.createUpdateCategory('update')
}

  deleteCategory() {
    this.toggleLoadingBtn(true)
    this.categoryService.deleteCategory(this.category.id).subscribe(res => {
      if (res.msg == 'Successfully deleted.') {
       this.toggleModalDelete()
      }
    }).add(() => this.toggleLoadingBtn(false));
  }

  toggleModalDelete() {
    this.activeDeleteModal = !this.activeDeleteModal
  }

  toggleLoadingBtn(value: boolean) {
  this.loading = value;
  this.disabled = value ;
  }

}
