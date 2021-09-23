import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-info',
  templateUrl: './form-info.component.html',
  styleUrls: ['./form-info.component.scss']
})
export class FormInfoComponent implements OnInit {
  value = ""

   addForm: FormGroup

  constructor(private formBuilder: FormBuilder) {

    this.addForm = this.formBuilder.group({
      address: formBuilder.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      phone: formBuilder.control(''),
      wifi: formBuilder.control('',),
    });
    
   }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.addForm.value)
    //this.categoryService.postCategory(this.addForm.value);
  }

  errorControl(name: string) {
    return this.addForm.get(name)
  }

  cancel() {
    
  }

}
