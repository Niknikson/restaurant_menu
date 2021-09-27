import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InfoService } from 'src/app/service/info.service';
import { Info } from './../../../constants/interface';


@Component({
  selector: 'app-form-info',
  templateUrl: './form-info.component.html',
  styleUrls: ['./form-info.component.scss']
})
export class FormInfoComponent implements OnInit {
 
  id!: string
  form: FormGroup
   loading = false;
  disabled = false;

  constructor(private formBuilder: FormBuilder,
    private infoService: InfoService) {
    
    this.form = this.formBuilder.group({
      address: formBuilder.control(''),
      phone: formBuilder.control(''),
      wifi: formBuilder.control('',),
    });
    
   }

  ngOnInit(): void {
    this.infoService.info.subscribe(data => {
      const { address, phone, wifi, id} = data
      this.id = id
       this.form.patchValue({
       address,
       phone,
       wifi
   });
    })

  }

  onSubmit() {
    this.toggleLoadingBtn()
    this.infoService.patchInfo({...this.form.value, id: this.id}).subscribe((res) => {
      if ( res.msg  == 'Successfully updated.') {
        this.infoService.showModal()
      } 
    this.toggleLoadingBtn() 
    })
  }

  cancel(event: any) {
    event.preventDefault();
    this.infoService.showModal()
  }

  toggleLoadingBtn() {
  this.loading = !this.loading;
  this.disabled = !this.disabled ;
  }

}
