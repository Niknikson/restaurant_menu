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

  categories: Category[] = [];

  private categorySource = new BehaviorSubject<Category>({
    id: '',
    name: '',
    available: false
  })
  category = this.categorySource.asObservable()

  private modalSource = new BehaviorSubject<boolean>(false)
  activeModal = this.modalSource.asObservable()

  private categoriesSource = new BehaviorSubject<Category[]>([])
  currentCategories = this.categoriesSource.asObservable()

  constructor(private http: HttpClient) {}

  showModal() {
    this.modalSource.next(!this.modalSource.value) 
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
        return res
      }}))

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
      }}))
  }
 
}


