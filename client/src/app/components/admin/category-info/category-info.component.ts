import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RESPONSE_MSG } from 'src/app/constants/responseMsg';
import { CategoryService } from 'src/app/service/category.service';
import { DishesService } from 'src/app/service/dishes.service';
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
    private dishesService: DishesService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.categoryService.category.subscribe(data => this.category = data)
    this.route.queryParams.subscribe(params => {
    params.categoryId && this.categoryService.getCategory(params.categoryId).toPromise()
    });
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
        this.router.navigate(['/admin/menu/']);
        this.dishesService.toggleAllDish(true)
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
