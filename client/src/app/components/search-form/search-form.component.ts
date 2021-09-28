import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DishesService } from 'src/app/service/dishes.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  
  form: FormGroup
  loading = false;
  disabled = false;

  constructor(
    private formBuilder: FormBuilder,
    private dishService: DishesService,
  ) {
    
    this.form = this.formBuilder.group({
      name: formBuilder.control(''),
    });
    
   }

  ngOnInit(): void {
    }

  

  onSubmit() {
    // this.infoService.getDishByName(this.form.value}).subscribe((res) => {
    //   if ( res.msg  == 'Successfully updated.') {
    //   } 
    // })
  }



}
