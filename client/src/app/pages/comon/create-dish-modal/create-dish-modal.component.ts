import { Component, OnInit } from '@angular/core';
import { DishesService } from 'src/app/service/dishes.service';

@Component({
  selector: 'app-create-dish-modal',
  templateUrl: './create-dish-modal.component.html',
  styleUrls: ['./create-dish-modal.component.scss'],
})
export class CreateDishModalComponent implements OnInit {
  constructor(public dishesService: DishesService) {}

  ngOnInit(): void {}

  closeModal() {
    this.dishesService.toggleCreateModal()
  }
}
