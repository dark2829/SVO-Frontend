import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpleadosService } from '../../../../services/empleados.service';
import { EnlacesService } from '../../../../services/enlaces.service';
import { AlertaService } from '../../../../services/alerta.service';

@Component({
  selector: 'app-empleado-register',
  templateUrl: './empleado-register.component.html',
  styleUrls: ['./empleado-register.component.css']
})
export class EmpleadoRegisterComponent implements OnInit {
  formEmpleado: FormGroup; 

  constructor(
    private empleados: EmpleadosService, 
    private router: Router,
    private formBuilder: FormBuilder, 
    private enlaces: EnlacesService, 
    private alerta: AlertaService
  ) { }

  ngOnInit(): void {
    //? Inicializar los campos de entrada del formulario 
    this.formEmpleado = this.formBuilder.group({
      empNombre: [null, [Validators.required]],
      empApePat: [null, [Validators.required]],
      empApeMat: [null, [Validators.required]],
      empCurp:   [null, [Validators.required, Validators.minLength(18)]],
      empTelefo: [null, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      empFechaN: [null, [Validators.required]],
      empGenero: [null, []],
      empPuesto: [null, [Validators.required]],
      empSalari: [null, [Validators.required]],
      empCorreo: [null, [Validators.required, Validators.email]],
      empPass:   [null, [Validators.required]],
    });
  }

  public agregarEmpleado(){
    const API_SAVEEMPLEADO = this.enlaces.API_ENLACE_EMPLEADO+this.enlaces.EMPLEADO_INSERT; 
    try{
      if(
        this.formEmpleado.value.empNombre != null &&
        this.formEmpleado.value.empApePat != null &&
        this.formEmpleado.value.empApeMat != null &&
        this.formEmpleado.value.empCurp != null &&
        this.formEmpleado.value.empTelefo != null &&
        this.formEmpleado.value.empFechaN != null &&
        this.formEmpleado.value.empGenero != null &&
        // this.formEmpleado.value.empPuesto != null &&
        this.formEmpleado.value.empSalari != null &&
        this.formEmpleado.value.empCorreo != null &&
        this.formEmpleado.value.empPass != null 
        /*this.formEmpleado.value.empNombre != "" &&
        this.formEmpleado.value.empApePat != "" &&
        this.formEmpleado.value.empApeMat != "" &&
        this.formEmpleado.value.empCurp != "" &&
        this.formEmpleado.value.empTelefo != "" &&
        this.formEmpleado.value.empFechaN != "" &&
        this.formEmpleado.value.empGenero != "" &&
        // this.formEmpleado.value.empPuesto != "" &&
        this.formEmpleado.value.empSalari != "" &&
        this.formEmpleado.value.empCorreo != "" &&
        this.formEmpleado.value.empPass != "" */
      ){
        let day = this.formEmpleado.value.empFechaN;
        day = day.split("-");
        day = day[2] + "/" + day[1] + "/" + day[0];

        this.empleados.saveEmpleado(API_SAVEEMPLEADO, {
          nombre:            this.formEmpleado.value.empNombre.toString().trim(),
          apellido_paterno:  this.formEmpleado.value.empApePat.toString().trim(),   
          apellido_materno:  this.formEmpleado.value.empApeMat.toString().trim(),
          genero:            this.formEmpleado.value.empGenero, 
          telefono:          this.formEmpleado.value.empTelefo.toString().trim(),
          fecha_nacimiento:  day,
          correo:            this.formEmpleado.value.empCorreo,
          curp:              this.formEmpleado.value.empCurp.toString().trim(),
          idPuesto:          1,
          salario:           this.formEmpleado.value.empSalari,
          contrasena:        this.formEmpleado.value.empPass.toString().trim(),    
          idRol:             2        
        }).subscribe(response => {
          this.alerta.showAlert(response.message, "success", 2000);
          setTimeout(() => {this.listaEmpleado()}, 2500);
        }, error => {
          this.alerta.showAlert(error.errro.message, "danger", 2000, error.status);
        });
      }else{
        this.alerta.showAlert("Faltan datos", "danger", 2000);
      }
    }catch(e){
      console.log(e);
    }
  }

  public enviar(){
    this.agregarEmpleado();
  }

  public cancelar(){
    this.alerta.showAlert("Cancelado", "secondary", 2000);
    setTimeout(() => {this.listaEmpleado()} , 2500);
  }

  public listaEmpleado(){
    this.router.navigate(['empleados']);
  }
}
