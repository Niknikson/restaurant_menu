import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Dish, DishPost } from '../constants/interface';
import {Api} from '../constants/api'
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DishesService{

  private id!: string

  private modalSource = new BehaviorSubject<boolean>(false)
  activeModal = this.modalSource.asObservable()

  private dishesSource = new BehaviorSubject<Dish[]>([])
  dishes = this.dishesSource.asObservable()

  constructor(private http: HttpClient) { }

  showModal() {
    this.modalSource.next(!this.modalSource.value) 
  }

  getAllDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(`${Api.dish}`)
  }

  saveId(id: string) {
    console.log(id)
    this.id = id
  }

  getDishesByCategory(): Observable<Dish[]> {
    return this.http.get<Dish[]>(`${Api.dish}${this.id}`).pipe(
      map((data: Dish[]) => {
        this.dishesSource.next(data)
        return data;
      })
    );
  }

  // getDishesWithoutCategory(): Observable<Dish[]> {
  //   return this.http.get<Dish[]>(`${Api.dishWithoutCategory}`).pipe(
  //     map((data: Dish[]) => {
  //       this.dishesSource.next(data)
  //       return data;
  //     })
  //   );
  // }

  postDish(data: FormData,): Observable<any> {
    return this.http.post<any>(Api.dish, data).pipe(map((res) => {
      if (res.msg == "Successfully created.") {
        //this.dishesSource.next([...this.dishesSource.value, {...res.data}]) 
      }
      return res
    }))
  }

  patchDish(data: Dish, id: string): Observable<any> {
    // const formData = new FormData()
    // formData.append('file', file)
    // formData.append('data', JSON.stringify(data))
    return this.http.patch<any>(`${Api.dish}${id}`, data).pipe(map((res) => {
      if (res.msg == "Successfully updated.") {
        const newData = this.dishesSource.value.map( dish => {
          if (dish.id === id) {
            dish = { ...data, id }
          }
          return dish
        })
        this.dishesSource.next(newData)
      }
      return res
    }))
  }


  deleteDish(id: string ): Observable<any> {
    return this.http.delete<any>(`${Api.dish}${id}`).pipe(map((res)=>{
      if (res.msg == "Successfully deleted.") {
        let newData = this.dishesSource.value.filter(el=> el.id !== id)
        this.dishesSource.next(newData)
      }
      return res
    }))
  }
  

}
