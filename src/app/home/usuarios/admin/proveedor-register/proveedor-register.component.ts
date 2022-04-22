import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-proveedor-register',
  templateUrl: './proveedor-register.component.html',
  styleUrls: ['./proveedor-register.component.css']
})
export class ProveedorRegisterComponent implements OnInit {
  //* Entrada
  //* Salida

  //* Variables

  //* Constructores
  constructor() { }

  ngOnInit(): void {
  }


  //* Métodos get
  //* Métodos post
  public agregarProveedor(){
    console.log(getProveedorId());
  }
  //* Métodos update
  //* Métodos delete

  //* Métodos navegación
}

function getProveedorId() {
  throw new Error('Function not implemented.');
}
