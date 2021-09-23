import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.scss'],
})
export class FormCategoryComponent implements OnInit {

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
  }


  onSubmit() {
    console.log(this.form.value)
    //this.categoryService.postCategory(this.addForm.value);
  }

  errorControl(name: string) {
    return this.form.get(name)
  }

  cancel() {
    this.form.reset()
    this.categoryService.showModal()
  }


}
