import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { EnlacesService } from '../../../../services/enlaces.service';
import { AlertaService } from '../../../../services/alerta.service';

@Component({
  selector: 'app-proveedor-modify',
  templateUrl: './proveedor-modify.component.html',
  styleUrls: ['./proveedor-modify.component.css']
})
export class ProveedorModifyComponent implements OnInit {
  //* Salida
  //* Entrada
  
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
    private enlace: EnlacesService, 
    private alerta: AlertaService
  ) { }

  ngOnInit(): void {
    this.miFormulario = this.formBuilder.group({      
      hproveedorNombre: [null, [Validators.required]],
      hproveedorTelefono: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      hproveedorCorreo: [null, [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]{2,10}\.[a-z]{2,4}$")]],
      hproveedorDireccion: [null],
      hproveedorProvee: [null, [Validators.required]]
    });

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
            
            this.miFormulario.patchValue({      
              hproveedorNombre:   elemento.nombre,
              hproveedorTelefono: elemento.telefono,
              hproveedorCorreo:   elemento.correo,
              hproveedorDireccion:elemento.direccion,
              hproveedorProvee:   elemento.provee
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
          this.miFormulario.valid
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
            respuesta => {
              this.alerta.showAlert("Proveedor Modificado", "success", 2000);
              setTimeout(() => {this.router.navigate(['proveedores'])} , 2500);  
            },
            error => {
              this.alerta.showAlert("Proveedor Modificado", "success", 2000, error.status);
            }
            );
          } else {
            this.alerta.showAlert("Algunos datos no son correctos", "danger", 2000);            
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
    this.alerta.showAlert("Cancelado", "secondary", 2000);  
    setTimeout(() => {this.router.navigate(['proveedores'])} , 2500);    
  }
}

