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
import { GuardHomeService as guard } from './guards/guard-home.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductCarrComponent } from './home/usuarios/cliente/shopping-cart/product-carr/product-carr.component';
import { PasswordrecoveryComponent } from './home/usuarios/todos/passwordrecovery/passwordrecovery.component';
import { ProdtocancelComponent } from './home/usuarios/cliente/cancel-request/prodtocancel/prodtocancel.component';

/*
  Para acceder a empleado o admin solo en la url se debe colocar 
  /home-admin
  /home-empleado 

  según sea el caso
*/

const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'carta', component: CartaProductoComponent },
  {path: 'login', component: LoginComponent },
  {path: 'registro', component: RegisterComponent },
  {path: 'recovery', component: RecoverypassComponent },
  {path: 'extendProduct/:id', component: ProductoComponent, canActivate: [guard], data: {expectedRol: ['Cliente']} },
  {path: 'modifyPerfil', component: PerfilModifyComponent, canActivate: [guard], data: {expectedRol: ['Cliente']} },
  {path: 'shopHistory', component: ShophistoryComponent, canActivate: [guard], data: {expectedRol: ['Cliente']} },
  {path: 'favoritos', component: FavoriteComponent, canActivate: [guard], data: {expectedRol: ['Cliente']} },
  {path: 'shopping-cart', component: ShoppingCartComponent, canActivate: [guard], data: {expectedRol: ['Cliente']} },
  {path: 'productInCarr', component: ProductCarrComponent, canActivate: [guard], data: {expectedRol: ['Cliente']} },
  {path: 'productocancel', component: ProdtocancelComponent, canActivate: [guard], data: {expectedRol: ['Cliente']} },
  {path: 'cancel-request/:id', component: CancelRequestComponent, canActivate: [guard], data: {expectedRol: ['Cliente']} },
  {path: 'recoveryPassword/:correo', component: PasswordrecoveryComponent },
  //Pantallas de empleado
  {path: 'home-empleado', component: HomeEmpleadoComponent, canActivate: [guard], data: {expectedRol: ['Empleado']} },
  {path: 'pedidos', component: PedidosComponent },

  //Pantallas empleado & admin 
  {path: 'inventario', component: InventarioComponent, canActivate: [guard], data: {expectedRol: ["Empleado", "Administrador"]} },
  {path: 'product-register', component: ProductRegisterComponent, canActivate: [guard], data: {expectedRol: ["Empleado", "Administrador"]} },
  {path: 'product-modify', component: ProductModifyComponent, canActivate: [guard], data: {expectedRol: ["Empleado", "Administrador"]} },
  
  //Pantallas admin
  {path: 'home-admin', component: HomeAdminComponent, canActivate: [guard], data: {expectedRol: ["Administrador"]} },
  {path: 'proveedores', component: ProveedoresComponent, canActivate: [guard], data: {expectedRol: ["Administrador"]} },
  {path: 'proveedores-register', component: ProveedorRegisterComponent, canActivate: [guard], data: {expectedRol: ["Administrador"]} },
  {path: 'proveedores-modify', component: ProveedorModifyComponent, canActivate: [guard], data: {expectedRol: ["Administrador"]} },
  {path: 'empleados', component: EmpleadosComponent, canActivate: [guard], data: {expectedRol: ["Administrador"]} },
  {path: 'empleado-register', component: EmpleadoRegisterComponent, canActivate: [guard], data: {expectedRol: ["Administrador"]} },
  {path: 'empleado-modify', component: EmpleadoModifyComponent, canActivate: [guard], data: {expectedRol: ["Administrador"]} },
  {path: 'cancel', component: PedidoRequestComponent, canActivate: [guard], data: {expectedRol: ["Administrador"]} },
  {path: 'alert', component: AlertComponent, canActivate: [guard], data: {expectedRol: ["Administrador"]} },
  //? Envian informacion en la url 
  {path: 'proveedor/:id', component: ProveedorModifyComponent, canActivate: [guard], data: {expectedRol: ["Empleado", "Administrador"]} },
  {path: 'user/:id', component: HomeComponent, canActivate: [guard], data: {expectedRol: ["Cliente"]} },
  {path: 'userAdmin/:id', component: HomeAdminComponent, canActivate: [guard], data: {expectedRol: ["Administrador"]} },
  {path: 'userEmpleado/:id', component: HomeEmpleadoComponent, canActivate: [guard], data: {expectedRol: ["Empleado"]} },
  {path: 'userEmpleadoModify/:id', component: EmpleadoModifyComponent, canActivate: [guard], data: {expectedRol: ["Administrador"]} },
  {path: 'producto/:id', component: ProductModifyComponent, canActivate: [guard], data: {expectedRol: ["Empleado", "Administrador"]} },
  {path: '**', component: NotFoundComponent }//* Siempre debe sera la ultima, es para redireccionar en caso de no encontrar una ruta

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
