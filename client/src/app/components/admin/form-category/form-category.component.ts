import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/constants/interfaces/category';
import { CategoryService } from 'src/app/service/category.service';
import { RESPONSE_MSG } from 'src/app/constants/responseMsg';
import { CREATE, UPDATE } from './../../../constants/constants';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.scss'],
})
  
export class FormCategoryComponent implements OnInit {
  
  form: FormGroup
  indicator!: string
  category!: Category
  errorMsg!: string 
  loading: boolean = false;
  disabled: boolean = false;
  submitted: boolean = false;  

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
    this.categoryService.createUpdateIndicator.subscribe(indicator => {
      const {name, available } = this.category
      this.indicator = indicator
      this.indicator === UPDATE && this.setCategoryValueToForm(name, available)
      this.indicator === CREATE && this.resetValue()
      
    })
  }

  onSubmit() {
    this.setErrorMsgUniqueName('')
    this.submitted = true
    if (this.form.invalid) return

    this.toggleLoadingBtn(true)
    this.indicator === CREATE && this.createCategory()
    this.indicator === UPDATE && this.updateCategory()
  }

  createCategory() {
     this.categoryService.postCategory(this.form.value)
      .subscribe(res => {
       res.msg == RESPONSE_MSG.CREATED && this.closeModalAndReset()
      }, (err) => {
        err.error.message === RESPONSE_MSG.VALIDATION_ERROR && this.setErrorMsgUniqueName(RESPONSE_MSG.UNIQUE_NAME)
      }).add(() => this.falseLoadingSubmitted() );
  }

  updateCategory() {
    this.categoryService.patchCategory(this.form.value, this.category.id)
      .subscribe(res => {
        res.msg == RESPONSE_MSG.UPDATED && this.closeModalAndReset()
      }, (err) => {
        err.error.message === RESPONSE_MSG.VALIDATION_ERROR && this.setErrorMsgUniqueName(RESPONSE_MSG.UNIQUE_NAME)
    }).add(() => this.falseLoadingSubmitted());
  }

  cancel(event: any) {
    event.preventDefault()
    this.resetValue()
    this.categoryService.showModal()
  }

  resetValue() {
    this.form.patchValue({ name: '', available: true });
    this.setErrorMsgUniqueName('')
    this.submitted = false
  }

  setErrorMsgUniqueName(errorMsg: string){
    this.errorMsg = errorMsg
  }

  falseLoadingSubmitted() {
    this.toggleLoadingBtn(false)
    this.submitted = false
  }

  closeModalAndReset() {
    this.categoryService.showModal()
    this.resetValue()
  }

  toggleLoadingBtn(value: boolean) {
  this.loading = value;
  this.disabled = value ;
  }

  setCategoryValueToForm(name:string,available:boolean) {
     this.form.patchValue({
          name,
          available,
        })
  }
  
}
