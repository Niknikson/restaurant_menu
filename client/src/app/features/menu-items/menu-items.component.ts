import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { DishesService } from 'src/app/service/dishes.service';
import { Category } from '../../constants/interface';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss'],
})
export class MenuItemsComponent implements OnInit {
  @Input() category!: Category;
  roleAdmin!: any
  roleUser!: any
  constructor(private dishesService: DishesService,
    private categoryService: CategoryService,
    private router: Router) { }

  ngOnInit(): void {
    this.roleAdmin = this.router.config[1].path
    this.roleUser = this.router.config[0].path
  }

   scrollTop() {
        let scrollToTop = window.setInterval(() => {
            let pos = window.pageYOffset;
            if (pos > 0) {
                window.scrollTo(0, pos - 20); 
            } else {
                window.clearInterval(scrollToTop);
            }
        }, 16);
    }

  routMenuClick(id: string) {
    this.scrollTop()
  }
}
