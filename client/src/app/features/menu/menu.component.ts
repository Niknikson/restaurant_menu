import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

export class Category {
  constructor(
    public id: number,
    public name: string,
    public available: boolean
  ) {}
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public categories: Category[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.httpClient
      .get<any>('http://localhost:5000/restoran/categories')
      .subscribe((response) => {
        console.log(response);
        this.categories = response;
      });
  }
}