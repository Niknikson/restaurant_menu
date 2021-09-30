import { Component, OnInit, forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
     {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputComponent),
        multi: true
     }
   ]
})
export class InputComponent implements ControlValueAccessor{

  @Input() label: string = ''
  @Input() placeholder: string = ''
  @Input() icon!: boolean 
  
private _value: any;

public get value(){
  return this._value;
}

public set value(v){
  this._value = v;
  this.onChange(this._value);
  this.onTouched();
}

writeValue(obj: any): void {
  this._value = obj;
}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onChange: any = () => { };

  onTouched: any = () => { };

}


