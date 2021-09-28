import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/constants/interface';
import { CategoryService } from 'src/app/service/category.service';

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
      this.indicator == 'update' ?  this.setCategoryValueToForm(name,available) : this.resetValue()
    })
  }

  onSubmit() {
    this.errorMsg = ''
    this.submitted = true
    if (this.form.invalid) {
      return
    }
    this.toggleLoadingBtn(true)

    this.indicator === 'create' && this.categoryService.postCategory(this.form.value)
      .subscribe(res => {
       res.msg == "Successfully created." && this.closeModalAndReset()
    },(err)=>  {
      err.error.message === "Validation error" && this.setErrorMsgUniqueName()
      }).add(() => this.falseLoadingSubmitted() );
    
    this.indicator === 'update' && this.categoryService.patchCategory(this.form.value, this.category.id)
      .subscribe(res => {
        res.msg == "Successfully updated." && this.closeModalAndReset()
      }, (err) => {
       err.error.message === "Validation error" && this.setErrorMsgUniqueName()
    }).add(() => this.falseLoadingSubmitted());

  }

  cancel(event: any) {
    event.preventDefault()
    this.errorMsg = ''
    this.resetValue()
    this.submitted = false
    this.categoryService.showModal()
  }

  resetValue() {
    this.form.patchValue({name: '', available: true});
  }

  setErrorMsgUniqueName(){
   this.errorMsg = 'Name already exists'
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
