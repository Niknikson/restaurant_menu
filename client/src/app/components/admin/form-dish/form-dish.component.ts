import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Category } from 'src/app/constants/interfaces/category';
import { RESPONSE_MSG } from 'src/app/constants/responseMsg';
import { exitingDishNameValidator } from 'src/app/helpers/validatorExitingDishName';
import { CategoryService } from 'src/app/service/category.service';
import { DishesService } from '../../../service/dishes.service';
import { Dish } from 'src/app/constants/interfaces/dishes';

@Component({
  selector: 'app-form-dish',
  templateUrl: './form-dish.component.html',
  styleUrls: ['./form-dish.component.scss'],
})
export class FormDishComponent implements OnInit {

  @Input() dish!: Dish

  file: any
  form: FormGroup
  errorMsg!: string 
  imageSrc!: string
  categories!: Category[]
  loading: boolean = false;
  disabled: boolean = false;
  submitted: boolean = false;  

  constructor(
    private dishesService: DishesService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private validator: exitingDishNameValidator,
  ) {
    this.form = this.formBuilder.group({
      name: formBuilder.control('', [
        Validators.required,
        Validators.maxLength(30),
      ],this.validator.validate.bind(this.validator)),
      top: formBuilder.control(false),
      available: formBuilder.control(true),
      categoryId: formBuilder.control('', [
        Validators.required,
      ]),
      description: formBuilder.control('', [
        Validators.required,
        Validators.maxLength(150),
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
    if (this.form.invalid) return
  
    this.toggleLoadingBtn(true)
    this.postDish()
  }

  postDish() {
    let formData = this.formData()
    this.dishesService.postDish(formData).subscribe(res => {
      if (res.msg === RESPONSE_MSG.CREATED) {
        this.dishesService.showModal()
        this.dishesService.getDishesWithParams().toPromise
      }
    }, (err) => {
      err.error.message === RESPONSE_MSG.VALIDATION_ERROR && this.setErrorMsgUniqueName()
    }).add(() => this.toggleLoadingBtn(false));
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

  formData() {
    const formData = new FormData()
    formData.append('file', this.file)
    formData.append('data', JSON.stringify(this.form.value))
    return formData
  }

  cancel(event: any) {
    event.preventDefault();
    this.dishesService.showModal();
    this.submitted = false
  }

  toggleLoadingBtn(value: boolean) {
  this.loading = value;
  this.disabled = value ;
  }

  setErrorMsgUniqueName(){
   this.errorMsg = 'Name already exists'
  }
  
}

