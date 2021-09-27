import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() style: string = 'primary';
  @Input() buttonSubmit = false;
  @Input() loading: boolean =false
 
  @Input()
  set isDisabled(isDisabled: boolean) {
    this._isDisabled = isDisabled || false;
  }
  get isDisabled(): boolean {
    return this._isDisabled;
  }
 
 
  @Output() buttonClick: EventEmitter<any>;
  buttonType: string;
  private _loading!: boolean;
  private _isDisabled!: boolean;


  constructor() {
    this.buttonClick = new EventEmitter<any>();
    this.buttonType = this.buttonSubmit ? `submit` : `button`;
  }

  onClick(event: any): any {
      this.buttonClick.emit(event);
  }
  
}
