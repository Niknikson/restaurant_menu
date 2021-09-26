import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/constants/interface';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.scss'],
})
export class FormCategoryComponent implements OnInit {

  indicator!: string
  category!: Category
  form: FormGroup

  constructor(public categoryService: CategoryService,
    private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: formBuilder.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      available: formBuilder.control(true),
    });
   }
  
  ngOnInit(): void {
    this.categoryService.category.subscribe(data => this.category = data)
    this.categoryService.createUpdateIndicator.subscribe(data => {
      this.indicator = data
      if (this.indicator == 'update') {
        const {name, available } = this.category
        this.form.patchValue({
          name,
          available,
        })
      } else {
         this.form.patchValue({
           name: '',
          available: true
        })
      }
    })
  }

  onSubmit() {
    this.indicator == 'create' && this.categoryService.postCategory(this.form.value).subscribe(res => {
      this.categoryService.showModal()
      this.resetValue()
    })

    this.indicator == 'update' && this.categoryService.patchCategory(this.form.value, this.category.id).subscribe(res => {
      this.categoryService.showModal()
      this.resetValue()
    })

  }

  cancel(event: any) {
    event.preventDefault()
    this.resetValue()
    this.categoryService.showModal()
  }

  errorControl(name: string) {
    return this.form.get(name)
  }

  resetValue() {
    this.form.patchValue({name: '', available: true});
  }

}
