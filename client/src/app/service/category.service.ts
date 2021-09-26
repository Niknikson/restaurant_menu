import { Category, CategoryPost } from '../constants/interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Api} from '../constants/api'


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
    console.log(indicator)
    this.createUpdateSource.next(indicator) 
  }

  clearCategory() {
    this.categorySource.value.id = ''
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

  postCategory(data: CategoryPost): Observable<any> {
    return this.http.post<any>(Api.categories, data).pipe(map((res) => {
      if (res.msg == "Successfully created.") {
        this.categoriesSource.next([...this.categoriesSource.value, {...res.category}])
      }
      return res
    }))
  }

  patchCategory(data: CategoryPost, id: string): Observable<any> {
    return this.http.patch<any>(`${Api.categories}${id}`, data).pipe(map((res) => {
      if (res.msg == "Successfully updated.") {
        this.categorySource.next({ id, ...data })
        const newData = this.categoriesSource.value.map(category => {
          if (category.id == id) {
            category = {id,...data}
          }
          return category
        })
        this.categoriesSource.next(newData)
      }
      return res
    }))
  }

  deleteCategory(id: string ): Observable<any> {
    return this.http.delete<any>(`${Api.categories}${id}`).pipe(map((res)=>{
      if (res.msg == "Successfully deleted.") {
        let newData = this.categoriesSource.value.filter(el=> el.id !== id)
        this.categoriesSource.next(newData)
        this.categorySource.next({
         id: '',
         name: '',
         available: false})
      }
      return res
    }))
  }
 
}


