import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dish } from '../constants/interface';
import {Api} from '../constants/api'

@Injectable({
  providedIn: 'root',
})

export class DishesService {
  public dishes: Dish[] = [];
 
  constructor(private http: HttpClient) {}

  getDishesByCategory(id: string = '') {
    this.http.get<Dish[]>(`${Api.dish}${id}`)
      .subscribe((res) => {
        this.dishes = res;
      });
  }
}
