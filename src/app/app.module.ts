import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

//Imports opcionales
import { NgxPaginationModule } from 'ngx-pagination'; //? Sirve para paginar una tablita

//Manejo de rutas
import { AppComponent } from './app.component';
import { CartaProductoComponent } from './home/carta-producto/carta-producto.component';
import { HomeComponent } from './home/home.component';
import { ProductoComponent } from './home/producto/producto.component';
import { LoginComponent } from './home/usuarios/todos/login/login.component';
import { RegisterComponent } from './home/usuarios/todos/register/register.component';
import { RecoverypassComponent } from './home/usuarios/todos/recoverypass/recoverypass.component';
import { PerfilModifyComponent } from './home/usuarios/cliente/perfil-modify/perfil-modify.component';
import { ShophistoryComponent } from './home/usuarios/cliente/shophistory/shophistory.component';
import { CancelRequestComponent } from './home/usuarios/cliente/cancel-request/cancel-request.component';
import { FavoriteComponent } from './home/usuarios/cliente/favorite/favorite.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components//footer/footer.component';
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
import { AlertComponent } from './home/usuarios/admin/alert/alert.component';
import { EmpleadosComponent } from './home/usuarios/admin/empleados/empleados.component';
import { EmpleadoRegisterComponent } from './home/usuarios/admin/empleado-register/empleado-register.component';
import { EmpleadoModifyComponent } from './home/usuarios/admin/empleado-modify/empleado-modify.component';
import { PedidoRequestComponent } from './home/usuarios/admin/pedido-request/pedido-request.component';

//Import de servicios
import { HttpClientModule } from '@angular/common/http';
import { ErrorTailorModule} from '@ngneat/error-tailor';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductCarrComponent } from './home/usuarios/cliente/shopping-cart/product-carr/product-carr.component';
import { PasswordrecoveryComponent } from './home/usuarios/todos/passwordrecovery/passwordrecovery.component';

//Interceptores
// import { interceptorEmpleado } from './interceptors/interceptorempleado.service';

@NgModule({
  declarations: [//manda a llamar al nombre de las clases que se encuentran en component.ts
    AppComponent,
    CartaProductoComponent,
    HomeComponent,
    ProductoComponent,
    LoginComponent,
    RegisterComponent,
    RecoverypassComponent,
    PerfilModifyComponent,
    ShophistoryComponent,
    CancelRequestComponent,
    FavoriteComponent,
    NavBarComponent,
    FooterComponent,
    ShoppingCartComponent,
    HomeEmpleadoComponent,
    PedidosComponent,
    InventarioComponent,
    ProductRegisterComponent,
    ProductModifyComponent,
    HomeAdminComponent,
    ProveedoresComponent,
    ProveedorRegisterComponent,
    ProveedorModifyComponent,
    AlertComponent,
    EmpleadosComponent,
    EmpleadoRegisterComponent,
    EmpleadoModifyComponent,
    PedidoRequestComponent,
    NotFoundComponent,
    ProductCarrComponent,
    PasswordrecoveryComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule, 
    HttpClientModule, 
    NgxPaginationModule, 
    ReactiveFormsModule, 
    ErrorTailorModule.forRoot({
      errors: {
        useValue: {
          required: 'Campo requerido',
          minlength: ({ requiredLength, actualLength }) => 
                      `Se esperan ${requiredLength} pero solo hay ${actualLength}`,
          invalidAddress: error => `Address isn't valid`
        }
      }
    })
  ],
  providers: [
    // interceptorEmpleado
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
