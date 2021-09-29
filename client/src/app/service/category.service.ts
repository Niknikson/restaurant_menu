import { Category, NewCategory, RespCategory} from '../constants/interfaces/category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Api} from '../constants/api'
import { RESPONSE_MSG } from '../constants/responseMsg';
import { ResMsg } from '../constants/interfaces/response';



@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  private categorySource = new BehaviorSubject<Category>({
    id: '',
    name: '',
    available: false
  })
  category = this.categorySource.asObservable()

  private createUpdateSource = new BehaviorSubject<string>('create')
  createUpdateIndicator = this.createUpdateSource.asObservable()

  private modalSource = new BehaviorSubject<boolean>(false)
  activeModal = this.modalSource.asObservable()

  private categoriesSource = new BehaviorSubject<Category[]>([])
  categories = this.categoriesSource.asObservable()

  constructor(private http: HttpClient) {}

  showModal() {
    this.modalSource.next(!this.modalSource.value) 
  }

  createUpdateCategory(indicator: string) {
    this.createUpdateSource.next(indicator) 
  }

  clearCategory(): void {
        this.categorySource.next({
         id: '',
         name: '',
         available: false})
  }

  getCategory(id: string): Observable<Category> {
    return this.http.get<Category>(`${Api.categories}${id}`).pipe(
      map((data: Category) => {
        this.categorySource.next(data)
        return data;
      })
    );
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(Api.categories).pipe(
      map((data: Category[]) => {
        this.categoriesSource.next(data)
        return data;
      })
    );
  }

  postCategory(data: NewCategory): Observable<RespCategory> {
    return this.http.post<RespCategory>(Api.categories, data).pipe(map((res) => {
      res.msg === RESPONSE_MSG.CREATED && this.categoriesSource.next([...this.categoriesSource.value, {...res.category}])
      return res
    }))
  }

  patchCategory(data: NewCategory, id: string): Observable<ResMsg> {
    return this.http.patch<ResMsg>(`${Api.categories}${id}`, data).pipe(map((res) => {
      if (res.msg === RESPONSE_MSG.UPDATED) {
        this.categorySource.next({ id, ...data })
        const newData = this.categoriesSource.value.map(category => {
          if (category.id === id) {
            category = {...data, id}
          }
          return category
        })
        this.categoriesSource.next(newData)
      }
      return res
    }))
  }

  deleteCategory(id: string ): Observable<ResMsg> {
    return this.http.delete<ResMsg>(`${Api.categories}${id}`).pipe(map((res)=>{
      if (res.msg === RESPONSE_MSG.DELETED) {
        let newData = this.categoriesSource.value.filter(el=> el.id !== id)
        this.categoriesSource.next(newData)
        this.clearCategory()
      }
      return res
    }))
  }
 
}


