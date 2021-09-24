import { Category, CategoryPost } from '../constants/interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {Api} from '../constants/api'


@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  activeModal: boolean = false;
  category: Category = {
    id: '',
    name: '',
    available: false
  }
  categories: Category[] = [];

  private categoriesSource = new BehaviorSubject<Category[]>([])
  currentCategories = this.categoriesSource.asObservable()

  constructor(private http: HttpClient) {}

  showModal() {
    this.activeModal = !this.activeModal;
  }

  getCategory(id: string): Observable<Category> {
    return this.http.get<Category>(`${Api.categories}${id}`).pipe(
      map((data: Category) => {
        this.category = data;
        return data;
      })
    );
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(Api.categories).pipe(
      map((data: Category[]) => {
        this.categoriesSource.next(data)
        this.categories = data;
        return data;
      })
    );
  }

  postCategory(data: CategoryPost): Observable<CategoryPost> {
    return this.http.post<CategoryPost>(Api.categories, data)
  }

 
}


