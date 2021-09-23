import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-info',
  templateUrl: './category-info.component.html',
  styleUrls: ['./category-info.component.scss']
})
export class CategoryInfoComponent implements OnInit {

  value = 'nik'
  check = true

  constructor() { }

  ngOnInit(): void {
  }

  update() {
    console.log(this.value, this.check)
  }
  cancel() {
    console.log('clear')
  }
  delete() {
    console.log('delete')
  }

}
