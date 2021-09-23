import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { DishesService } from 'src/app/service/dishes.service';
import { InfoService } from 'src/app/service/info.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  buttonLoading = false;
  inputOne = true
  externalValue = 'nik'

  constructor(
    public dishesService: DishesService,
    public categoryService: CategoryService,
    public infoService: InfoService
  ) {}

  ngOnInit(): void { }
  
  
  closeModalInfo() {
    this.infoService.showModal()
  }

  closeModalCategory() {
    this.categoryService.showModal()
  }  
}
