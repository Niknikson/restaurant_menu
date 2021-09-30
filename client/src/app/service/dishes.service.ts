import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Dish } from '../constants/interfaces/dishes';
import {Api} from '../constants/api'
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RESPONSE_MSG } from '../constants/responseMsg';
import { ResMsg } from './../constants/interfaces/response';

@Injectable({
  providedIn: 'root',
})
export class DishesService{

  private currentParams!: any

  private allDishSource = new BehaviorSubject<boolean>(true)
  allDish = this.allDishSource.asObservable()

  private modalSource = new BehaviorSubject<boolean>(false)
  activeModal = this.modalSource.asObservable()

  private dishesSource = new BehaviorSubject<Dish[]>([])
  dishes = this.dishesSource.asObservable()

  constructor(private http: HttpClient) { }

  showModal() {
    this.modalSource.next(!this.modalSource.value) 
  }

  toggleAllDish(value: boolean) {
    this.allDishSource.next(value)
    console.log(this.allDishSource.value)
  }

  getAllDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(`${Api.dish}`)
  }

  saveParams(params: any) {
    this.currentParams = params
  }
  
  getDishesWithParams(): Observable<Dish[]> {
    let params = this.currentParams
    return this.http.get<any>(`${Api.dish}`, { params }).pipe(
      map((data: Dish[]) => {
        this.dishesSource.next(data)
        return data;
      })
    );
  }

  postDish(data: FormData,): Observable<ResMsg> {
    return this.http.post<ResMsg>(Api.dish, data)
  }

  patchDish(data: Dish, id: string): Observable<ResMsg> {
    return this.http.patch<ResMsg>(`${Api.dish}${id}`, data)
  }

  deleteDish(id: string ): Observable<ResMsg> {
    return this.http.delete<ResMsg>(`${Api.dish}${id}`).pipe(map((res)=>{
      if (res.msg == RESPONSE_MSG.DELETED) {
        let newData = this.dishesSource.value.filter(el=> el.id !== id)
        this.dishesSource.next(newData)
      }
      return res
    }))
  }

}

