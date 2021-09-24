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
 
  info!: Info
  form: FormGroup

  constructor(private formBuilder: FormBuilder,
    private infoService: InfoService) {
    
    this.form = this.formBuilder.group({
      address: formBuilder.control(''),
      phone: formBuilder.control(''),
      wifi: formBuilder.control('',),
    });
    
   }

  ngOnInit(): void {
    this.infoService.info.subscribe(data => { this.info = data })
  }

  onSubmit() {
    this.infoService.patchInfo({...this.form.value, id: this.info.id}).subscribe((res) => {
      if ( res.msg  == 'Successfully updated.') {
        this.infoService.fetchInfo().toPromise()
        this.infoService.showModal(false)
        this.resetValue()
      } else {
        alert(res.msg)
      }
    })
  }

  resetValue() {
    this.form.patchValue({
       address: '',
       phone: '',
       wifi: ''
   });
  }

  cancel(event: any) {
    event.preventDefault();
    this.resetValue()
    this.infoService.showModal(false)
  }

   errorControl(name: string) {
    return this.form.get(name)
  }

}
