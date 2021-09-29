import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { DishesService } from 'src/app/service/dishes.service';
import { InfoService } from 'src/app/service/info.service';

@Component({
  selector: 'app-add-button-group',
  templateUrl: './add-button-group.component.html',
  styleUrls: ['./add-button-group.component.scss']
})
export class AddButtonGroupComponent implements OnInit {

  constructor( public dishesService: DishesService,
    private categoryService: CategoryService,
    private infoService: InfoService) { }

  ngOnInit(): void {
  }

  showModalInfo(): void {
   this.infoService.showModal()
  }

  showModalCategory(): void {
    this.categoryService.createUpdateCategory('create')
    this.categoryService.showModal()
  }
  showModalDish(): void {
    this.dishesService.showModal();
  }

}
