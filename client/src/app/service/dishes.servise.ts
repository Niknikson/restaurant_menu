import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dish } from '../constants/dish';

@Injectable({
  providedIn: 'root',
})
export class DishesService {
  public dishes: Dish[] = [];
  public id: number | string = '';
  //public dishId!: number;

  constructor(private httpClient: HttpClient) {}

  setDishId(id: number) {
    console.log('set', id);
    //this.dishId = id;
    this.getDishes(id);
  }

  getDishes(id: number | string) {
    console.log(id);
    this.httpClient
      .get<Dish[]>(`http://localhost:5000/restoran/dish/${id && id }`)
      .subscribe((response) => {
        console.log(response);
        this.dishes = response;
      });
  }
}
