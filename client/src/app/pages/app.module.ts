import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from '../features/menu/menu.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';
import { MenuItemsComponent } from '../features/menu-items/menu-items.component';
import { AdminPageComponent } from './admin-page/admin-page/admin-page.component';
import { ClientPageComponent } from './client-page/client-page/client-page.component';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    MenuItemsComponent,
    AdminPageComponent,
    ClientPageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
