import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProveedoresService } from '../../../../services/proveedores.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css'],
  providers: [ProveedoresService]
})
export class ProveedoresComponent implements OnInit {
  
  //Variables
  proveedores: any = {};

  //Constructores
  constructor(
    private router: Router,
    private service: ProveedoresService
  ) { }

  ngOnInit() {
    this.service.getAllProveedores().subscribe(response => {
      console.log(response);
      this.proveedores = response;
    });
  }
  


  //Métodos de navegación 
  reigstro(){
    this.router.navigate(['proveedores-register'])
  }

  modify(){
    this.router.navigate(['proveedores-modify'])
  }

}
