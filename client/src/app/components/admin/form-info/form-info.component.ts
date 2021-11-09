import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RESPONSE_MSG } from 'src/app/constants/responseMsg';
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
      address: new FormControl('',[
        Validators.minLength(5),
        Validators.maxLength(30),
      ]),
      phone: new FormControl('',[
        Validators.minLength(10),
        Validators.maxLength(30),
      ]),
      wifi: new FormControl('',[
        Validators.minLength(5),
        Validators.maxLength(30),
      ]),
    });
    
   }

  ngOnInit(): void {
    this.infoService.info.subscribe(data => {
      const { address, phone, wifi, id} = data
       this.id = id
      this.setValueToForm(address, phone, wifi)
    })
  }

  onSubmit() {
    this.submitted = true
    if (this.form.invalid) {
      return
    }
    this.toggleLoadingBtn(true)
    this.updateInfo()
  }

  updateInfo(): void {
    this.infoService.patchInfo({ ...this.form.value, id: this.id })
      .subscribe((res) => {res.msg  === RESPONSE_MSG.UPDATED &&
        this.infoService.showModal()
    }).add(() => this.falseLoadingSubmitted());
  }

  cancel(event: { preventDefault: () => void; }): void {
    event.preventDefault();
    this.infoService.showModal()
  }

  falseLoadingSubmitted(): void {
    this.toggleLoadingBtn(false)
    this.submitted = false
  }

  toggleLoadingBtn(value: boolean): void {
  this.loading = value;
  this.disabled = value ;
  }

  setValueToForm(address: string,phone: string,wifi: string) {
    this.form.patchValue({
      address,
      phone,
      wifi
    })
  }

}
