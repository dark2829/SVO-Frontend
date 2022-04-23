import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedoresService } from 'src/app/services/proveedores.service';

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

  proveedores: any = {};
  miFormulario: FormGroup;

  //* Constructores
  constructor(
    private service: ProveedoresService,
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder, 
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.index = this.route.snapshot.params['id'];

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
            console.log(elemento.direccion);
            this.provee = elemento.provee;    
            
            this.miFormulario = this.formBuilder.group({      
              hproveedorNombre: [elemento.nombre],
              hproveedorTelefono: [elemento.telefono],
              hproveedorCorreo: [elemento.correo],
              hproveedorDireccion: [elemento.direccion],
              hproveedorProvee: [elemento.provee]
            });
          }
        });
      });

    }else{
      console.log("No hay proveedor");
    }
  }

  //* Métodos get
  public modifyProveedor(){
    if(this.informacion){
     //Mandar Datos
      this.service.saveProveedor(`http://localhost:8080/proveedores/update?id=${this.index}`,
        {
          nombre: this.miFormulario.value.hproveedorNombre,
          telefono: this.miFormulario.value.hproveedorTelefono,
          correo: this.miFormulario.value.hproveedorCorreo,
          direccion: this.miFormulario.value.hproveedorDireccion,
          provee: this.miFormulario.value.hproveedorProvee
        }
      ).subscribe(response => {
        this.appli();
      }); 
    }
    if(this.cancelar){

    }
  }

  public info(){
    this.informacion = true; 
    this.cancelar = false; 
  } 

  public appli() {
    //? Agregar opciones de mensajes en vista
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

  public cancel(){
    this.cancelar = true; 
    this.informacion = false; 
    //? Agregar opciones de mensajes en vista
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
    setTimeout(() => {this.listaProveedores()} , 3000);
    
  }
  //* Métodos post
  //* Métodos update
  //* Métodos delete

  //* Métodos navegación
  public listaProveedores(){
    this.router.navigate(['proveedores']);
  }
}

