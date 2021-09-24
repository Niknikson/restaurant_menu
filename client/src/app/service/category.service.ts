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

  showModal(data:boolean) {
    this.modalSource.next(data) 
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

  postCategory(data: CategoryPost): Observable<CategoryPost> {
    return this.http.post<CategoryPost>(Api.categories, data)
  }

  deleteCategory(id: string ): Observable<any> {
    return this.http.delete<any>(`${Api.categories}${id}`).pipe(map((res)=>{
      if(res.msg == "Successfully deleted."){
        this.categorySource.next({
         id: '',
         name: '',
         available: false})
      }}))
  }
 
}


