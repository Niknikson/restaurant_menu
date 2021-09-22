import { Category, CategoryP } from '../constants/interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {Api} from '../constants/api'


@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  public createCategoryModal: boolean = false;
  public categories: Category[] = [];

  constructor(private http: HttpClient) {}

  toggleCreateModal() {
    this.createCategoryModal = !this.createCategoryModal;
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(Api.categories).pipe(
      map((data: Category[]) => {
        this.categories = data;
        return data;
      })
    );
  }

  postCategory(data: CategoryP) {
    this.http.post(Api.categories, data).subscribe((res) => {
      console.log(res);
    });
  }

 
}


