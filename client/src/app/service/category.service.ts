import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../constants/interface';
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

  getCategories() {
    this.http.get<Category[]>(Api.categories).subscribe((res) => {
      this.categories = res;
    });
  }
}
