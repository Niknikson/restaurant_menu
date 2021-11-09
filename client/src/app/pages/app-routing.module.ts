import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page/admin-page.component';
import { ClientPageComponent } from './client-page/client-page.component';
import { DishesComponent } from '../components/dishes/dishes.component';


const routes: Routes = [
  {
    path: '', component: ClientPageComponent,
    children: [
      { path: '', redirectTo: 'menu/ dishes', pathMatch: 'full',},
      {path: 'menu/dishes', component: DishesComponent}
    ]
  },
  {
    path: 'admin', component: AdminPageComponent,
    children: [
      { path: '', redirectTo: 'menu', pathMatch: 'full',},
      { path: 'menu', component: DishesComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
