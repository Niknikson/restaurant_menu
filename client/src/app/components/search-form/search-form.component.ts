import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  searchInput: string = ''
  timeoutPromise!: ReturnType<typeof setTimeout>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    }

 onSearch(value: string) {
  clearTimeout(this.timeoutPromise);
  this.searchInput = value;
   if (value) this.timeoutPromise = setTimeout(()=>this.setParams(value),900);
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
   //this.clearSearchValue()
   }

  clearSearchValue(): void {
    this.searchInput = '';
  }

}
