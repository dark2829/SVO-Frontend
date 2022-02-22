import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CartaProductoComponent } from './carta-producto/carta-producto.component';

@NgModule({
  declarations: [//manda a llamar al nombre de las clases que se encuentran en component.ts
    AppComponent,
    CartaProductoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
