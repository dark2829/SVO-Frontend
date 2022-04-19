import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartaProductoComponent } from './home/carta-producto/carta-producto.component';
import { LoginComponent } from './home/usuarios/todos/login/login.component';
import { RegisterComponent } from './home/usuarios/todos/register/register.component';
import { RecoverypassComponent } from './home/usuarios/todos/recoverypass/recoverypass.component';
import { ProductoComponent } from './home/producto/producto.component';
import { PerfilModifyComponent } from './home/usuarios/cliente/perfil-modify/perfil-modify.component';
import { ShophistoryComponent } from './home/usuarios/cliente/shophistory/shophistory.component';
import { CancelRequestComponent } from './home/usuarios/cliente/cancel-request/cancel-request.component';
import { FavoriteComponent } from './home/usuarios/cliente/favorite/favorite.component';
import { ShoppingCartComponent } from './home/usuarios/cliente/shopping-cart/shopping-cart.component';
import { HomeEmpleadoComponent } from './home/usuarios/empleado/home-empleado/home-empleado.component';
import { PedidosComponent } from './home/usuarios/emp-adm/pedidos/pedidos.component';
import { InventarioComponent } from './home/usuarios/emp-adm/inventario/inventario.component';
import { ProductRegisterComponent } from './home/usuarios/emp-adm/product-register/product-register.component';
import { ProductModifyComponent } from './home/usuarios/emp-adm/product-modify/product-modify.component';
import { HomeAdminComponent } from './home/usuarios/admin/home-admin/home-admin.component';
import { ProveedoresComponent } from './home/usuarios/admin/proveedores/proveedores.component';
import { ProveedorRegisterComponent } from './home/usuarios/admin/proveedor-register/proveedor-register.component';
import { ProveedorModifyComponent } from './home/usuarios/admin/proveedor-modify/proveedor-modify.component';
import { EmpleadosComponent } from './home/usuarios/admin/empleados/empleados.component';
import { EmpleadoRegisterComponent } from './home/usuarios/admin/empleado-register/empleado-register.component';
import { EmpleadoModifyComponent } from './home/usuarios/admin/empleado-modify/empleado-modify.component';
import { PedidoRequestComponent } from './home/usuarios/admin/pedido-request/pedido-request.component';
import { AlertComponent } from './home/usuarios/admin/alert/alert.component';

/*
  Para acceder a empleado o admin solo en la url se debe colocar 
  /home-admin
  /home-empleado 

  segun sea el caso
*/

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
  {path: 'shopping-cart', component: ShoppingCartComponent },
  //Pantallas de empleado
  {path: 'home-empleado', component: HomeEmpleadoComponent },
  {path: 'pedidos', component: PedidosComponent },

  //Pantallas empleado & admin 
  {path: 'inventario', component: InventarioComponent },
  {path: 'product-register', component: ProductRegisterComponent },
  {path: 'product-modify', component: ProductModifyComponent },
  
  //Pantallas admin
  {path: 'home-admin', component: HomeAdminComponent },
  {path: 'proveedores', component: ProveedoresComponent },
  {path: 'proveedores-register', component: ProveedorRegisterComponent },
  {path: 'proveedores-modify', component: ProveedorModifyComponent },
  {path: 'empleados', component: EmpleadosComponent },
  {path: 'empleado-register', component: EmpleadoRegisterComponent },
  {path: 'empleado-modify', component: EmpleadoModifyComponent },
  {path: 'cancel', component: PedidoRequestComponent },
  {path: 'alert', component: AlertComponent },

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
