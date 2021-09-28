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
  loading: boolean = false;
  disabled: boolean = false;

  constructor(
    private dishesService: DishesService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
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
    this.categoryService.categories.subscribe(data => this.categories = data)
  }

  onSubmit() {
    this.toggleLoadingBtn(true)
    const formData = new FormData()
    formData.append('file', this.file)
    formData.append('data', JSON.stringify(this.form.value))
    this.dishesService.postDish(formData).subscribe(res => {
       if (res.msg == "Successfully created.") {
         this.dishesService.showModal();
       }
      
    }).add(() => this.toggleLoadingBtn(false));
    
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.file = file 
      reader.readAsDataURL(file);
      //console.log(this.file)
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.form.patchValue({
          img: 'img'
        });
      };
    }
  }

  toggleLoadingBtn(value: boolean) {
  this.loading = value;
  this.disabled = value ;
  }
  
}

