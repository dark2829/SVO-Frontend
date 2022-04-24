import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnlacesService } from '../../../../services/enlaces.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonasService } from 'src/app/services/personas.service';

@Component({
  selector: 'app-perfil-modify',
  templateUrl: './perfil-modify.component.html',
  styleUrls: ['./perfil-modify.component.css']
})
export class PerfilModifyComponent implements OnInit {
  //* Salida
  //* Entrada

  //* Variables
  //? Variables de formulario
  formPerson: FormGroup; 

  //? Variables de carga
  nombre: string; 
  apaterno: string; 
  amaterno: string; 
  fnacimiento: string; 
  genero: string; 
  correo: string; 
  password: string; 
  telefono: string; 
  calle: string; 
  colonia: string; 
  municipio: string; 
  estado: string; 
  cp: string; 
  interior: number; 
  exterior: number; 
  propietario: string; 
  tarjetanumero: string;
  vencimiento: string; 
  cvv: number;  
  
  
  //* Constructores
  constructor(
    private router: Router, 
    private enlaces: EnlacesService, 
    private formBuilder: FormBuilder, 
    private persona: PersonasService
  ) { }

  ngOnInit(): void {
    this.formPerson = this.formBuilder.group({
      formNombre:       [this.nombre, [Validators.required]],
      formApaterno:     [this.apaterno],
      formAmaterno:     [this.amaterno],
      formFnacimiento:  [this.fnacimiento],
      formGenero:       [this.genero],
      formCorreo:       [this.correo, [Validators.required, Validators.email]],
      formPassword:     [this.password, [Validators.required, Validators.maxLength(8)]],
      formTelefono:     [this.telefono],
      formCalle:        [this.calle],
      formColonia:      [this.colonia],
      formMunicipio:    [this.municipio],
      formEstado:       [this.estado],
      formCp:           [this.cp],
      formInterior:     [this.interior],
      formExterior:     [this.exterior],
      formPropietario:  [this.propietario],
      formTarjetanumero:[this.tarjetanumero],
      formVencimiento:  [this.vencimiento],
      formCvv:          [this.cvv]
    })
  }

  //* Métodos get
  //* Métodos post
  //* Métodos update
  //* Métodos delete

}
