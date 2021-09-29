import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DishesService } from 'src/app/service/dishes.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  searchInput: string = ''
  timeoutPromise!: ReturnType<typeof setTimeout>;

  constructor(
    private dishService: DishesService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    }

 onSearch(value: string) {
  clearTimeout(this.timeoutPromise);
  this.searchInput = value;
  this.timeoutPromise = setTimeout(()=>this.setParams(value),600);
  console.log(value)
}

 setParams(value:string){
     this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search : value
      },
      // queryParamsHandling: 'merge',
      // skipLocationChange: true
    });
   }


}
