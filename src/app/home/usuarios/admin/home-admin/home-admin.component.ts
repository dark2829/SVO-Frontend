import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  pedidos() {
    this.router.navigate(['pedidos'])
  }

  producto() {
    this.router.navigate(['inventario']);
  }
  
  proveedores(){
    this.router.navigate(['proveedores']);
  }

  empleados(){
    this.router.navigate(['empleados']);
  }
}
