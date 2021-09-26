import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dish } from '../constants/interface';
import {Api} from '../constants/api'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DishesService {
  public dishes: Dish[] = [];

  private modalSource = new BehaviorSubject<boolean>(false)
  activeModal = this.modalSource.asObservable()

  constructor(private http: HttpClient) {}

  showModal() {
    this.modalSource.next(!this.modalSource.value) 
  }

  getDishesByCategory(id: string = '') {
    this.http.get<Dish[]>(`${Api.dish}${id}`).subscribe((res) => {
      console.log(res);
      this.dishes = res;
    });
  }

}
