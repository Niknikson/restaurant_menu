import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { DishesService } from 'src/app/service/dishes.service';
import {Category, Dish} from '../../constants/interface'

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.scss'],
})
export class DishCardComponent implements OnInit {

  @Input() dish!: Dish;

  form: FormGroup
  roleAdmin!: any
  categories!: Category[]
  loading: boolean = false;
  disabled: boolean = false;
  updateDishForm: boolean = false
  activeDeleteModal: boolean = false

  constructor(
    private categoryService: CategoryService,
    private dishesService: DishesService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.form = this.formBuilder.group({
      name: formBuilder.control('', [
        Validators.required,
      ]),
      top: formBuilder.control(false, [
        Validators.required,
      ]),
      available: formBuilder.control(true, [
        Validators.required,
      ]),
      categoryId: formBuilder.control('', [
        Validators.required,
      ]),
      description: formBuilder.control('', [
        Validators.required,
      ]),
      price: formBuilder.control('', [
        Validators.required,
      ]),
      weight: formBuilder.control('', [
        Validators.required,
      ]),
      img: formBuilder.control('', [
        Validators.required,
      ]),
    });
   }

  ngOnInit(): void {
    this.roleAdmin  = this.router.url.split('/')[1]
    this.categoryService.categories.subscribe(data => this.categories = data)
   }
  
  showUpdateDishForm() {
    this.updateDishForm = !this.updateDishForm
    this.form.patchValue({
       name: this.dish.name,
       available: this.dish.available,
       top: this.dish.top,
       categoryId: this.dish.categoryId,
       description: this.dish.description,
       price: this.dish.price,
       weight: this.dish.weight,
       img: this.dish.img,
    })
  }

   toggleModalDelete() {
    this.activeDeleteModal = !this.activeDeleteModal
  }

  onSubmit() {
     this.dishesService.patchDish(this.form.value, this.dish.id).subscribe(res => {
      if (res.msg == "Successfully updated.") {
      this.updateDishForm = !this.updateDishForm
      }
    })
  }

  deleteDish(id: string) {
    this.dishesService.deleteDish(id).subscribe(res => {
      if (res.msg == 'Successfully deleted.') {
       this.toggleModalDelete()
      }
    })
  }

  toggleLoadingBtn(value: boolean) {
  this.loading = value;
  this.disabled = value ;
  }

}
