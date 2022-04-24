import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProveedoresService } from '../../../../services/proveedores.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnlacesService } from '../../../../services/enlaces.service';

@Component({
  selector: 'app-proveedor-register',
  templateUrl: './proveedor-register.component.html',
  styleUrls: ['./proveedor-register.component.css']
})
export class ProveedorRegisterComponent implements OnInit {
  //* Salida
  //* Entrada
  @ViewChild('alerta') alerta: ElementRef;

  //* Variables
  miFormulario: FormGroup; 
  enviarDatos = false;
  regresar = false; 

  //* Constructores
  constructor(
    private serviceProveedor: ProveedoresService, 
    private router: Router, 
    private formBuilder: FormBuilder, 
    private enlaces: EnlacesService
  ) { }

  ngOnInit(): void {
    this.miFormulario = this.formBuilder.group({
        proveedorNombre: [null, [Validators.required]],
        proveedorTelefono: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        proveedorCorreo: [null, [Validators.email]],
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
            respuesta => this.information("Registro exitoso", "success"), 
          error => {
            switch(error.status){
              case 0:
                this.errores("Error de conexión", "danger");
              break;
              case 400: 
                this.errores("El correo ya está registrado", "warning");
              break; 
              case 500: 
                this.errores("Error en el servidor", "danger");
              break; 
            }
            console.log("reject"+error.status);
          }
          );
        }else{
          this.errores("Campos invalidos", "warning");
        }
      }catch(error){
        
      }
    }
  }
  //* Métodos update
  //* Métodos delete

  //* Métodos navegación
  public enviar(){
    this.enviarDatos = true; 
    this.regresar = false; 
    this.agregarProveedor();
  }

  public cancelar(){
    this.regresar = true; 
    this.enviarDatos = false; 
    this.information("Cancelado", "danger");
  }

  public information(texto: string, tipo: string){
    const alertas: any = this.alerta.nativeElement; 
    alertas.innerHTML = `
                          <div 
                          class="alert alert-${tipo} alert-dismissible" 
                          style=
                            "
                            position: fixed; top:25vh; right:0%;
                              
                            ">
                          <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                          <strong>¡${texto}!</strong> redirigiendo a lista.
                          </div>
    `;
    setTimeout(() => {alertas.innerHTML = ""} , 2000);
  }

  public errores(texto: string, tipo: string){
    const alertas: any = this.alerta.nativeElement; 
    alertas.innerHTML = `
                          <div 
                          class="alert alert-${tipo} alert-dismissible" 
                          style=
                            "
                            position: fixed; top:25vh; right:0%;
                              
                            ">
                          <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                          <strong>¡${texto}!</strong>
                          </div>
    `;
    setTimeout(() => {alertas.innerHTML = ""} , 2000);
  }
  //* Métodos de navegación
  public listaProveedores(){
    this.router.navigate(['proveedores']);
  }
}