import { NgModule } from '@angular/core';
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
import { CreateDishModalComponent } from './comon/create-dish-modal/create-dish-modal.component';
import { CreateCategoryModalComponent } from './comon/create-category-modal/create-category-modal.component';


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
    CreateDishModalComponent,
    CreateCategoryModalComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
