import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProveedoresService } from '../../../../services/proveedores.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {
  //* Salida
  //* Entrada 

  //* Variables
  proveedores: any = {};
  public page: number = 1; 

  //* Constructores
  constructor(
    private router: Router,
    private service: ProveedoresService
  ) { }

  ngOnInit() {
    this.service.getAllProveedores().subscribe(response => {
      this.proveedores = response;
    });
  }

  //* Métodos de navegación 
  reigstro(){
    this.router.navigate(['proveedores-register']);
  }

  modify(proveedorId: number){
    // this.router.navigate(['proveedores-modify']);
  }

  //* Gettters
}
