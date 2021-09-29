import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RESPONSE_MSG } from 'src/app/constants/responseMsg';
import { CategoryService } from 'src/app/service/category.service';
import { Category } from '../../../constants/interfaces/category';

@Component({
  selector: 'app-category-info',
  templateUrl: './category-info.component.html',
  styleUrls: ['./category-info.component.scss']
})
export class CategoryInfoComponent implements OnInit {

  category!: Category
  loading: boolean = false;
  disabled: boolean = false;
  isLoading: boolean = false;
  activeDeleteModal: boolean = false

  constructor(
    private categoryService: CategoryService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.categoryService.category.subscribe(data =>this.category = data)  
  }

   showUpdateCategoryModal(): void {
     this.categoryService.showModal()
     this.categoryService.createUpdateCategory('update')
  }

  onClickDelete(): void {
    this.toggleLoadingBtn(true)
    this.deleteCategory()
  }

  deleteCategory(): void {
    this.categoryService.deleteCategory(this.category.id).subscribe(res => {
      if (res.msg === RESPONSE_MSG.DELETED) {
        this.toggleDeleteModal()
        this.router.navigate(['/admin/']);
      }
    }).add(() => this.toggleLoadingBtn(false));
  }

  toggleDeleteModal(): void {
    this.activeDeleteModal = !this.activeDeleteModal
  }

  toggleLoadingBtn(value: boolean): void {
  this.loading = value;
  this.disabled = value ;
  }

}
