import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InfoService } from 'src/app/service/info.service';


@Component({
  selector: 'app-form-info',
  templateUrl: './form-info.component.html',
  styleUrls: ['./form-info.component.scss']
})
export class FormInfoComponent implements OnInit {
 
  id!: string
  form: FormGroup
  loading: boolean = false;
  disabled: boolean = false;
  submitted: boolean = false;  

  constructor(private formBuilder: FormBuilder,
    private infoService: InfoService) {
    
    this.form = this.formBuilder.group({
      address: formBuilder.control('',[
        Validators.minLength(5),
        Validators.maxLength(30),
      ]),
      phone: formBuilder.control('',[
        Validators.minLength(5),
        Validators.maxLength(30),
      ]),
      wifi: formBuilder.control('',[
        Validators.minLength(5),
        Validators.maxLength(30),
      ]),
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
   })})
  }

  onSubmit() {
    this.submitted = true
    if (this.form.invalid) {
      return
    }
    this.toggleLoadingBtn(true)
    this.infoService.patchInfo({...this.form.value, id: this.id}).subscribe((res) => {
      if ( res.msg  == 'Successfully updated.') {
        this.infoService.showModal()
      } 
    }).add(() => {
      this.toggleLoadingBtn(false)
      this.submitted = false
    });
  }

  cancel(event: any) {
    event.preventDefault();
    this.infoService.showModal()
  }

  toggleLoadingBtn(value: boolean) {
  this.loading = value;
  this.disabled = value ;
  }

}
