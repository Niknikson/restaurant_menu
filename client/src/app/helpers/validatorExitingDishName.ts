import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import {map} from 'rxjs/operators';
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { DishesService } from "../service/dishes.service";



@Injectable({ providedIn: 'root' })
  
export class exitingDishNameValidator implements AsyncValidator{
  constructor(private dishesService: DishesService) {}
  validate (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.dishesService.getAllDishes().pipe(
        map(dishes => {
            const dish = dishes.find(dish => dish.name.toLocaleLowerCase() == control.value.toLocaleLowerCase())
         return dish ? { nameExists: true } : null
      })
    )}
}