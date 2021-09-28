import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Category } from 'src/app/constants/interface';
import { CategoryService } from 'src/app/service/category.service';
import { DishesService } from '../../../service/dishes.service';

@Component({
  selector: 'app-form-dish',
  templateUrl: './form-dish.component.html',
  styleUrls: ['./form-dish.component.scss'],
})
export class FormDishComponent implements OnInit {

  file: any
  imageSrc!: string
  categories!: Category[]
  form: FormGroup
  errorMsg!: string 
  loading: boolean = false;
  disabled: boolean = false;
  submitted: boolean = false;  

  constructor(
    private dishesService: DishesService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      name: formBuilder.control('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      top: formBuilder.control(false),
      available: formBuilder.control(true),
      categoryId: formBuilder.control('', [
        Validators.required,
      ]),
      description: formBuilder.control('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      price: formBuilder.control('', [
        Validators.required,
        Validators.maxLength(10),
      ]),
      weight: formBuilder.control('', [
        Validators.required,
        Validators.maxLength(10),
      ]),
      img: formBuilder.control('', [
        Validators.required,
      ]),
    });
  }

  ngOnInit(): void {
    this.categoryService.categories.subscribe(data => this.categories = data)
  }

  onSubmit() {
    this.submitted = true

    if (this.form.invalid) {
      return
    }
    
    this.toggleLoadingBtn(true)
    const formData = new FormData()
    formData.append('file', this.file)
    formData.append('data', JSON.stringify(this.form.value))

    // this.dishesService.postDish(formData).subscribe(res => {
    //   res.msg === "Successfully created." && this.dishesService.showModal()
    // }, (err) => {
    //    err.error.message === "Validation error" && this.setErrorMsgUniqueName()
    // }).add(() => this.toggleLoadingBtn(false));
    
  }

  onFileChange(event: any) {
    event.preventDefault();
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.file = file 
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.form.patchValue({
          img: 'img'
        });
      };
    }
  }

  cancel(event: any) {
    event.preventDefault();
    this.dishesService.showModal();
  }

  toggleLoadingBtn(value: boolean) {
  this.loading = value;
  this.disabled = value ;
  }

  setErrorMsgUniqueName(){
   this.errorMsg = 'Name already exists'
  }
  
}

