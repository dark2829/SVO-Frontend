import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { TokenService } from '../../../../services/token.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  
  empleados: any = {};
  public page: number = 1; 

  constructor(
    private router: Router,
    private empleado: EmpleadosService,
    private token: TokenService
  ) { }

  ngOnInit(): void {
    if(this.token.getToken()){
      this.empleado.getAllEmpleados().subscribe(response => {
        this.empleados = response; 
      });
    }
  }

  reigstro(){
    this.router.navigate(['empleado-register'])
  }

  modify(){
    this.router.navigate(['empleado-modify'])
  }

}
