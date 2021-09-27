import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from '../features/menu/menu.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';
import { DishCardComponent } from './../features/dish-card/dish-card.component';
import { MenuItemsComponent } from '../features/menu-items/menu-items.component';
import { AdminPageComponent } from './admin-page/admin-page/admin-page.component';
import { ClientPageComponent } from './client-page/client-page.component';
import { BtnMenuComponent } from '../components/btn-menu/btn-menu/btn-menu.component';
import { ButtonComponent } from './comon/button/button.component';
import { FormDishComponent } from './comon/form-dish/form-dish.component';
import { FormCategoryComponent } from './comon/form-category/form-category.component';
import { InputComponent } from './comon/input/input.component';
import { FormInfoComponent } from './comon/form-info/form-info.component';
import { CategoryInfoComponent } from './comon/category-info/category-info.component';
import { CheckboxComponent } from './comon/checkbox/checkbox.component';
import { ModalComponent } from './comon/modal/modal.component';
import { AddButtonGroupComponent } from './comon/add-button-group/add-button-group.component';
import { DishesComponent } from './comon/dishes/dishes.component';
import { SearchFormComponent } from './comon/search-form/search-form.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    MenuItemsComponent,
    AdminPageComponent,
    ClientPageComponent,
    DishCardComponent,
    BtnMenuComponent,
    ButtonComponent,
    FormDishComponent,
    FormCategoryComponent,
    InputComponent,
    FormInfoComponent,
    CategoryInfoComponent,
    CheckboxComponent,
    ModalComponent,
    AddButtonGroupComponent,
    DishesComponent,
    SearchFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
