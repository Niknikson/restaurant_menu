import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/constants/interface';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.scss'],
})
export class FormCategoryComponent implements OnInit {
  
  responseMsg!: string
  indicator!: string
  category!: Category
  form: FormGroup
  submitted = false;  
  loading = false;
  disabled = false;

  constructor(public categoryService: CategoryService,
    private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      available: new FormControl(true),
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
    this.toggleLoadingBtn(true)
    this.indicator == 'create' && this.categoryService.postCategory(this.form.value).subscribe(res => {
       if (res.msg == "Successfully created.") {
         //this.categoryService.showModal()
         this.resetValue()
         this.responseMsg = res.msg
       }
      this.toggleLoadingBtn(false)
    },(err)=> this.toggleLoadingBtn(false))

    this.indicator == 'update' && this.categoryService.patchCategory(this.form.value, this.category.id).subscribe(res => {
      if (res.msg == "Successfully updated.") {
       this.categoryService.showModal()
       this.resetValue()
      }
      this.toggleLoadingBtn(false)
    },(err)=> this.toggleLoadingBtn(false)  )
  }

  cancel(event: any) {
    event.preventDefault()
    this.resetValue()
    this.categoryService.showModal()
  }

  resetValue() {
    this.form.patchValue({name: '', available: true});
  }

  toggleLoadingBtn(value: boolean) {
  this.loading = value;
  this.disabled = value ;
  }
  
  get name() { return this.form.get('name'); }
  
}
