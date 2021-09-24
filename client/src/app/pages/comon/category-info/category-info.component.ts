import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { Category } from './../../../constants/interface';

@Component({
  selector: 'app-category-info',
  templateUrl: './category-info.component.html',
  styleUrls: ['./category-info.component.scss']
})
export class CategoryInfoComponent implements OnInit {

  category!: Category

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.category.subscribe(data=> this.category = data) 
  }
  

update(){

}

  delete() {
    this.categoryService.deleteCategory(this.category.id).subscribe(res => {
      console.log('delete')
    })
    
  }

}
