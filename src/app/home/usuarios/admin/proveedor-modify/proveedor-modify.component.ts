import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupName } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProveedoresService } from 'src/app/services/proveedores.service';

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
  telefono: number | undefined; 
  correo: string | undefined; 
  direccion: string | undefined; 
  provee: number | undefined;

  proveedores: any = {};
  public form: FormGroup;

  //* Constructores
  constructor(
    private service: ProveedoresService,
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.index = this.route.snapshot.params['id'];
    if(this.index){

      this.service.getAllProveedores().subscribe(response => {
        response.forEach((elemento: any) => {
          if(elemento.id == this.index){
            this.nombre = elemento.nombre;
            this.telefono = parseInt(elemento.telefono); 
            this.correo = elemento.correo; 
            this.direccion = elemento.direccion; 
            this.provee = elemento.provee; 
          }
        });
      });

    }else{
      console.log("No hay proveedor");
    }

    this.form = this.formBuilder.group({      
      nombre: [''],
      telefono: [''],
      correo: [''],
      direccion: [''],
      provee: ['']
    });
  }

  //* Métodos get
  public modifyProveedor(){
    this.service.saveProveedor(`http://localhost:8080/proveedores/update?id=${this.index}`, 
    {
      nombre: this.form.value.nombre, 
      telefono: this.form.value.telefono,
      correo: this.form.value.correo, 
      direccion: this.form.value.direccion, 
      provee: this.form.value.provee
    }
    ).subscribe(response => {
      console.log("Se envio tu mamada");
    });
  }

  public cancel(){
    console.log();
  }
  //* Métodos post
  //* Métodos update
  //* Métodos delete

  //* Métodos navegación
}

