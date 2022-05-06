import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { EnlacesService } from '../../../../services/enlaces.service';

@Component({
  selector: 'app-proveedor-modify',
  templateUrl: './proveedor-modify.component.html',
  styleUrls: ['./proveedor-modify.component.css']
})
export class ProveedorModifyComponent implements OnInit {
  //* Salida
  //* Entrada
  @ViewChild('alerta') alerta: ElementRef;
  
  //* Variables
  index: number | undefined; 
  nombre: string | undefined; 
  telefono: number = 0; 
  correo: string | undefined; 
  adres: string | undefined; 
  provee: string | undefined;
  informacion = false; 
  cancelar = false; 

  miFormulario: FormGroup;

  //* Constructores
  constructor(
    private service: ProveedoresService,
    private route: ActivatedRoute, //Buscar con indice
    private formBuilder: FormBuilder, 
    private router: Router,
    private enlace: EnlacesService
  ) { }

  ngOnInit(): void {
    this.index = this.route.snapshot.params['id'];//obtiene el id de la ruta
    
    //? Si id es verdadero entonces: se obtiene toda la informacion del proveedor 
    if(this.index){
    let phone; 
      this.service.getAllProveedores().subscribe(response => {
        response.forEach((elemento: any) => {
          if(elemento.id == this.index){
            this.nombre = elemento.nombre;
            phone = parseInt(elemento.telefono.toString().trim());
            this.telefono = phone;
            this.correo = elemento.correo; 
            this.adres = elemento.direccion; 
            this.provee = elemento.provee;    
            
            this.miFormulario = this.formBuilder.group({      
              hproveedorNombre: [elemento.nombre, [Validators.required]],
              hproveedorTelefono: [elemento.telefono, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
              hproveedorCorreo: [elemento.correo, [Validators.email]],
              hproveedorDireccion: [elemento.direccion],
              hproveedorProvee: [elemento.provee, [Validators.required]]
            });
          }
        });
      });

    }else{
      console.log("No hay proveedor");
    }
  }

  //* Métodos get
  public modifyProveedor() {
    if (this.informacion) {
      //Mandar Datos
      try {
        if (
          this.miFormulario.value.hproveedorNombre != null &&
          this.miFormulario.value.hproveedorTelefono != null &&
          this.miFormulario.value.hproveedorCorreo != null &&
          this.miFormulario.value.hproveedorProvee != null &&
          this.miFormulario.value.hproveedorNombre != "" &&
          this.miFormulario.value.hproveedorTelefono != "" &&
          this.miFormulario.value.hproveedorCorreo != "" &&
          this.miFormulario.value.hproveedorProvee != ""
        ) {
          this.service.saveProveedor(`${this.enlace.API_ENLACE_PROVEEDOR}${this.enlace.PROVEEDOR_UPDATE}${this.index}`,
            {
              nombre: this.miFormulario.value.hproveedorNombre.toString().trim(),
              telefono: this.miFormulario.value.hproveedorTelefono.toString().trim(),
              correo: this.miFormulario.value.hproveedorCorreo.toString().trim(),
              direccion: this.miFormulario.value.hproveedorDireccion.toString().trim(),
              provee: this.miFormulario.value.hproveedorProvee.toString().trim()
            }
          ).subscribe(
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
        } else {
          this.errores("Campos invalidos", "warning");
        }
      } catch (error) {
        alert(error);
      }

    }
    if (this.cancelar) {

    }
  }

  public info(){
    this.informacion = true; 
    this.cancelar = false; 
    this.modifyProveedor();
  } 

  public cancel(){
    this.cancelar = true; 
    this.informacion = false; 
    this.information("Cancelado", "danger");
  }
  
  //? Estos metodos funcionan para mostrar las alertas
  public information(texto: string, tipo: string){
    //? Agregar opciones de mensajes en vista    
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
    setTimeout(() => {this.listaProveedores()} , 1000);
  }

  public errores(texto: string, tipo: string){
    //? Agregar opciones de mensajes en vista    
    const alertas: any = this.alerta.nativeElement; 
    alertas.innerHTML = `
                          <div 
                          class="alert alert-${tipo} alert-dismissible" 
                          style=
                            "
                            position: fixed; top:25vh; right:0%;
                              
                            ">
                          <button id="cerrar" type="button" class="btn-close" data-bs-dismiss="alert"></button>
                          <strong>¡${texto}!</strong>
                          </div>
    `;
    setTimeout(() => {alertas.innerHTML = ""} , 2000);
  }
  //* Métodos post
  //* Métodos update
  //* Métodos delete
  
  //* Métodos navegación
  public listaProveedores(){
    this.router.navigate(['proveedores']);
  }
}

