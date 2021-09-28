import { Component, OnInit, forwardRef, Input } from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR
} from "@angular/forms";

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
  
export class CheckboxComponent implements ControlValueAccessor, OnInit {

  @Input() label: string = ''
  onChange: any = () => {};
  onTouch: any = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  constructor() {}

  ngOnInit() { }
  
  checked: boolean = false;
  writeValue(checked: boolean) {
    this.checked = checked;
  }

  onModelChange(e: boolean) {
    this.checked = e;

    this.onChange(e);
  }
}



