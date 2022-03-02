import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CartaProductoComponent } from './home/carta-producto/carta-producto.component';
import { HomeComponent } from './home/home.component';
import { ProductoComponent } from './home/producto/producto.component';
import { UsuariosComponent } from './home/usuarios/usuarios.component';
import { LoginComponent } from './home/usuarios/login/login.component';
import { RegisterComponent } from './home/usuarios/register/register.component';
import { RecoverypassComponent } from './home/usuarios/recoverypass/recoverypass.component';
import { PerfilModifyComponent } from './home/usuarios/cliente/perfil-modify/perfil-modify.component';
import { ShophistoryComponent } from './home/usuarios/cliente/shophistory/shophistory.component';

@NgModule({
  declarations: [//manda a llamar al nombre de las clases que se encuentran en component.ts
    AppComponent,
    CartaProductoComponent,
    HomeComponent,
    ProductoComponent,
    UsuariosComponent,
    LoginComponent,
    RegisterComponent,
    RecoverypassComponent,
    PerfilModifyComponent,
    ShophistoryComponent, 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
