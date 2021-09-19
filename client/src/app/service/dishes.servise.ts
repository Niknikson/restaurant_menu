import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dish } from '../constants/dish';

@Injectable({
  providedIn: 'root',
})
export class DishesService {
  public dishes: Dish[] = [];
  public id: string = '';
  public dishId!: string;

  constructor(private httpClient: HttpClient) {}

  setDishId(id: string) {
    //console.log('set', id);
    this.dishId = id;
    this.getDishesByCategory();
  }

  getDishesByCategory(id: string = '') {
    this.httpClient
      .get<Dish[]>(`http://localhost:5000/restoran/dish/${id}`)
      .subscribe((response) => {
        console.log(response);
        this.dishes = response;
      });
  }
}
