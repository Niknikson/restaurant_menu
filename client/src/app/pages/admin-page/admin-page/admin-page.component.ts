import { Component, OnInit } from '@angular/core';
import { DishesService } from 'src/app/service/dishes.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {

  constructor(public dishesService: DishesService) {}

  ngOnInit(): void {}
}
