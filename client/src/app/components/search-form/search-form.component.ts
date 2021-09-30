import { Component, OnInit } from '@angular/core';
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
    private router: Router,
    private route: ActivatedRoute,
    private dishesService: DishesService,
  ) { }

  ngOnInit(): void {
  }

  onSearch(value: string) {
    clearTimeout(this.timeoutPromise);
    this.searchInput = value;
    if (value) this.timeoutPromise = setTimeout(() => this.setParams(value), 900);
  }

  setParams(value: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: value
      }
    });
    this.dishesService.toggleAllDish(false)
  }

}
