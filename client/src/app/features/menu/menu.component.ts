import { Component,Input, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { scrollTop } from 'src/app/helpers/helpers';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() title: string = 'Restaurant Menu';
  @Input() menuDirection: string = 'row';

  data: any
  role!: string

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }
  

  setParams(param: string, value:string){
     this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        [param]: value
      },
      // queryParamsHandling: 'merge',
      // skipLocationChange: true
    });
   }

  

  ngOnInit() {
    this.role = this.router.url.split('/')[1]
    this.categoryService.categories.subscribe(data=> this.data = data) 
    this.categoryService.getCategories().toPromise() 
  }

  handlerClick(param: string, value: string) {
    this.setParams(param,value)
    this.categoryService.clearCategory()
    scrollTop()
//     this.router.navigate(["admin/menu"], {
//   queryParams: {
//     'categoryId': null,
//     'youCanRemoveMultiple': null,
//   },
//   queryParamsHandling: 'merge'
// })
  }
  

}
