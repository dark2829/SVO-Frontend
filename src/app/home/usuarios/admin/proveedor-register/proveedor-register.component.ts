import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProveedoresService } from '../../../../services/proveedores.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.miFormulario = this.formBuilder.group({
        proveedorNombre: ['', [Validators.required]], 
        proveedorTelefono: ['', [Validators.required, Validators.minLength(10)]],
        proveedorCorreo: ['', [Validators.email]],
        proveedorDireccion: [''], 
        proveedorProvee: ['', [Validators.required]]
    });
  }

  //* Métodos get
  //* Métodos post
  public agregarProveedor(){
    if(this.enviarDatos){
      const API_SAVEPROVEEDOR = "http://localhost:8080/proveedores/insert"
      this.serviceProveedor.saveProveedor(API_SAVEPROVEEDOR, {
        nombre: this.miFormulario.value.proveedorNombre.toString().trim(), 
        telefono: this.miFormulario.value.proveedorTelefono.toString().trim(),
        correo: this.miFormulario.value.proveedorCorreo.toString().trim(),
        direccion: this.miFormulario.value.proveedorDireccion.toString().trim(),
        provee: this.miFormulario.value.proveedorProvee.toString().trim()
      }).subscribe(response => {
        this.enviar();
      });

    }
  }
  //* Métodos update
  //* Métodos delete

  //* Métodos navegación
  public enviar(){
    this.enviarDatos = true; 
    this.regresar = false; 
    const alertas: any = this.alerta.nativeElement; 
    alertas.innerHTML = `
                          <div 
                          class="alert alert-success alert-dismissible" 
                          style=
                            "
                            position: fixed; top:25vh; right:0%;
                              
                            ">
                          <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                          <strong>¡Modificado!</strong> redirigiendo a lista.
                          </div>
    `;
    setTimeout(() => {this.listaProveedores()} , 3000);
  }
  public cancelar(){
    this.regresar = true; 
    this.enviarDatos = false; 
    const alertas: any = this.alerta.nativeElement; 
    alertas.innerHTML = `
                          <div 
                          class="alert alert-danger alert-dismissible" 
                          style=
                            "
                            position: fixed; top:25vh; right:0%;
                              
                            ">
                          <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                          <strong>¡Cancelado!</strong> redirigiendo a lista.
                          </div>
    `;
    // setTimeout(() => {this.listaProveedores()} , 3000);
  }

  //* Métodos de navegación
  public listaProveedores(){
    this.router.navigate(['proveedores']);
  }
}