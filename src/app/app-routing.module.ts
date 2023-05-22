import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ClienteCreateComponent } from './cliente-create/cliente-create.component';
import { TerrestreComponent } from './terrestre/terrestre.component';
import { TerrestreCreateComponent } from './terrestre-create/terrestre-create.component';
import { TerrestreUpdateComponent } from './terrestre-update/terrestre-update.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'cliente',
    children: [
      {
        path: '',
        component: ClienteComponent
      },
      {
        path: 'create',
        component: ClienteCreateComponent
      }
    ],
  },
  {
    path: 'terrestre',
    children: [
      {
        path: '',
        component: TerrestreComponent
      },
      {
        path: 'create',
        component: TerrestreCreateComponent
      },
      {
        path: 'update',
        component: TerrestreUpdateComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
