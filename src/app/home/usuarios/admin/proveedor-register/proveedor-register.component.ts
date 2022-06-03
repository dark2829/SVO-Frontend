import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProveedoresService } from '../../../../services/proveedores.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnlacesService } from '../../../../services/enlaces.service';
import { AlertaService } from '../../../../services/alerta.service';

@Component({
  selector: 'app-proveedor-register',
  templateUrl: './proveedor-register.component.html',
  styleUrls: ['./proveedor-register.component.css']
})
export class ProveedorRegisterComponent implements OnInit {
  //* Salida
  //* Entrada

  //* Variables
  miFormulario: FormGroup; 
  enviarDatos = false;
  regresar = false; 

  //* Constructores
  constructor(
    private serviceProveedor: ProveedoresService, 
    private router: Router, 
    private formBuilder: FormBuilder, 
    private enlaces: EnlacesService,
    private alerta: AlertaService
  ) { }

  ngOnInit(): void {
    //? Inicializa los campos de entrada del formualrio
    this.miFormulario = this.formBuilder.group({
        proveedorNombre: [null, [Validators.required]],
        proveedorTelefono: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        proveedorCorreo: [null, [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]{2,10}\.[a-z]{2,4}$")]],
        proveedorDireccion: [null],
        proveedorProvee: [null, [Validators.required]]
    });
  }

  //* Métodos get
  //* Métodos post
  public agregarProveedor(){
    const API_SAVEPROVEEDOR = this.enlaces.API_ENLACE_PROVEEDOR.concat(this.enlaces.PROVEEDOR_INSERT);
    if(this.enviarDatos){
      try{
        if(this.miFormulario.valid == true){
          if(
            this.miFormulario.value.proveedorNombre != null &&
            this.miFormulario.value.proveedorTelefono != null &&
            this.miFormulario.value.proveedorCorreo != null &&
            this.miFormulario.value.proveedorProvee != null &&
            this.miFormulario.value.proveedorNombre != "" &&
            this.miFormulario.value.proveedorTelefono != "" &&
            this.miFormulario.value.proveedorCorreo != "" &&
            this.miFormulario.value.proveedorProvee != ""
          ){
            this.serviceProveedor.saveProveedor(API_SAVEPROVEEDOR, {
              nombre: this.miFormulario.value.proveedorNombre.toString().trim(),
              telefono: this.miFormulario.value.proveedorTelefono.toString().trim(),
              correo: this.miFormulario.value.proveedorCorreo.toString().trim(),
              direccion: this.miFormulario.value.proveedorDireccion.toString().trim(),
              provee: this.miFormulario.value.proveedorProvee.toString().trim()
            }).subscribe(
              respuesta => {
                this.alerta.showAlert("Proveedor registrado", "success", 2000);
                setTimeout(() => {this.router.navigate(['proveedores'])} , 2500);
              }, 
              error => {
                this.alerta.showAlert(error, "success", 2000, error.status);
            }
            );
          }else{
            this.alerta.showAlert("Faltan datos", "warning", 2500);
          }
        }else{
          this.alerta.showAlert("Algunos datos no son correctos", "danger", 2000);
        }
      }catch(error){
        
      }
    }
  }

  public enviar(){
    this.enviarDatos = true; 
    this.regresar = false; 
    this.agregarProveedor();
  }

  public cancelar(){
    this.regresar = true; 
    this.enviarDatos = false; 
    this.alerta.showAlert("Cancelado", "secondary", 2000);
    setTimeout(() => {this.router.navigate(['proveedores'])} , 2500);
  }
}