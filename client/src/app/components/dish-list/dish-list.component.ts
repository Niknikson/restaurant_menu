import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/constants/interfaces/category';
import { Dish } from 'src/app/constants/interfaces/dishes';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.scss']
})
export class DishListComponent implements OnInit {

  @Input() dish!: Dish;
  @Input() category!: Category;

  constructor() { }

  ngOnInit(): void {
  }

}
