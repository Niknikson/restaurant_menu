import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { scrollTop } from 'src/app/helpers/helpers';
import { Category } from '../../constants/interface';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss'],
})
export class MenuItemsComponent implements OnInit {
  @Input() category!: Category;
    role!: any
  constructor(
    private router: Router) {
     }

  ngOnInit(): void {
    this.role = this.router.url.split('/')[1]
  }

  routMenuClick(id: string) {
    scrollTop()
  }
}
