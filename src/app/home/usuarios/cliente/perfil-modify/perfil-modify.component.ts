import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  @ViewChild('alerta') alertaHTML: ElementRef;

  //* Variables
  //? Variables de formulario
  formPersonModify: FormGroup; 

  //? Variables de carga
  //* Varaibles de busqueda 
  index: number; 

  //* Variables para carga automatica en cliente
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
  referencia: string; 
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
    //Se necesita recuperar indice con un metodo desde el back
    this.index = 2;

    this.formPersonModify = this.formBuilder.group({
      fpersonName:      [this.nombre, [Validators.required]],
      fpersonFname:     [this.apaterno],
      fpersonLname:     [this.amaterno],
      fpersonBdate:     [this.fnacimiento],
      fpersonGmale:     [this.genero],
      fpersonGfale:     [this.genero],
      // Datos de contacto
      fpersonCorreo:    [this.correo, [Validators.required, Validators.email]],
      fpersonPassw:     [this.password, [Validators.required, Validators.maxLength(8)]],
      fpersonPhone:     [this.telefono],
      // Datos de direccion
      formCalle:        [this.calle],
      formColonia:      [this.colonia],
      formMunicipio:    [this.municipio],
      formEstado:       [this.estado],
      formCp:           [this.cp],
      formInterior:     [this.interior],
      formExterior:     [this.exterior],
      formReferencia:   [this.referencia],
      // Datos tarjeta
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
