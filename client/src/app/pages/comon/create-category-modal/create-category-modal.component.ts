import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-create-category-modal',
  templateUrl: './create-category-modal.component.html',
  styleUrls: ['./create-category-modal.component.scss'],
})
export class CreateCategoryModalComponent implements OnInit {

  addForm: FormGroup

  constructor(public categoryService: CategoryService,
    private formBuilder: FormBuilder) {
    this.addForm = this.formBuilder.group({
      name: formBuilder.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      available: formBuilder.control(true),
      inp: formBuilder.control(''),
    });
   }
  
  ngOnInit(): void {
  }

  closeModal() {
    this.categoryService.toggleCreateModal();
  }

  onSubmit() {
    console.log(this.addForm.value)
    //this.categoryService.postCategory(this.addForm.value);
  }

  errorControl(name: string) {
    return this.addForm.get(name)
  }

}
