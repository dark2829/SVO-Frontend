import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartaProductoComponent } from './home/carta-producto/carta-producto.component';
import { LoginComponent } from './home/usuarios/login/login.component';
import { RegisterComponent } from './home/usuarios/register/register.component';
import { RecoverypassComponent } from './home/usuarios/recoverypass/recoverypass.component';
import { ProductoComponent } from './home/producto/producto.component';
import { PerfilModifyComponent } from './home/usuarios/cliente/perfil-modify/perfil-modify.component';
import { ShophistoryComponent } from './home/usuarios/cliente/shophistory/shophistory.component';
import { CancelRequestComponent } from './home/usuarios/cliente/cancel-request/cancel-request.component';
import { FavoriteComponent } from './home/usuarios/cliente/favorite/favorite.component';

const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'carta', component: CartaProductoComponent },
  {path: 'login', component: LoginComponent },
  {path: 'registro', component: RegisterComponent },
  {path: 'recovery', component: RecoverypassComponent },
  {path: 'extendProduct', component: ProductoComponent },
  {path: 'modifyPerfil', component: PerfilModifyComponent },
  {path: 'shopHistory', component: ShophistoryComponent },
  {path: 'cancel-request', component: CancelRequestComponent },
  {path: 'favoritos', component: FavoriteComponent },
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
