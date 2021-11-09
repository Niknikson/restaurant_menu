import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent  {

  @Input() title: string = ''
  @Input() active: boolean = false

  @Output() buttonClick: EventEmitter<any>;

   constructor() {
    this.buttonClick = new EventEmitter<any>();
  }

  onClick(): any {
      this.buttonClick.emit();
  }

}
