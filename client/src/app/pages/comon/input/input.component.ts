import { Component, OnInit, forwardRef } from "@angular/core";
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

  //label: string = 'label'
  
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

// Optional
onSomeEventOccured(newValue: any){
  this.value = newValue;
}
  
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
  }

  onChange: any = () => { };

  onTouched: any = () => { };


}


