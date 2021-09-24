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
    public categoryService: CategoryService,
    public infoService: InfoService) { }

  ngOnInit(): void {
  }

  showModalInfo(event: any): void {
   this.infoService.showModal()
  }

  showModalCategory(event: any): void {
    this.categoryService.showModal()
  }
  showModalDish(event: any): void {
    this.dishesService.toggleCreateModal();
  }

}
