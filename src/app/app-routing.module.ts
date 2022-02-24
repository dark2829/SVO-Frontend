import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartaProductoComponent } from './home/carta-producto/carta-producto.component';
import { LoginComponent } from './home/usuarios/login/login.component';

const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'carta', component: CartaProductoComponent },
  {path: 'login', component: LoginComponent }
]


@NgModule({
  // declarations: [],
  imports: [RouterModule.forRoot(
    routes
  )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
