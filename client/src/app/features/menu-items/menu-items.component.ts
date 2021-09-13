import { Component, Input, OnInit } from '@angular/core';
import { Category } from './../menu/menu.component';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss'],
})
export class MenuItemsComponent implements OnInit {
  @Input() category!: Category;

  constructor() {}

  ngOnInit(): void {}
}
