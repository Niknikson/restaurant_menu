import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Category {
  constructor(
    public id: string,
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
  //@Input() category!: Category;
  //@Output() getDishesByCategory = new EventEmitter<number>();

  public categories: Category[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getCategories();
  }

  // getyCategoryId(id: number) {
  //   this.getDishesByCategory.emit(id)
  //   console.log(id)
  // }

  getCategories() {
    this.httpClient
      .get<any>('http://localhost:5000/restoran/categories')
      .subscribe((response) => {
        console.log(response);
        this.categories = response;
      });
  }
}
