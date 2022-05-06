import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EnlacesService } from '../../../../services/enlaces.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonasService } from 'src/app/services/personas.service';
import { empty } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-perfil-modify',
  templateUrl: './perfil-modify.component.html',
  styleUrls: ['./perfil-modify.component.css']
})
export class PerfilModifyComponent implements OnInit {  
  
  @ViewChild('alerta') alerta: ElementRef;
  fileChange: boolean = false;
  preView: string; 

  //* Constructores
  constructor(
    private router: Router,    
    private enlaces: EnlacesService, 
    private formBuilder: FormBuilder, 
    private persona: PersonasService, 
    private sanitizer: DomSanitizer,    
  ) { }
  
  //* Variables 
  indexPerson: string; 
  indexClient: string; 
  Bdate: any; 
  Vdate: any
  enviarDatos = false; 
  cancelar = false;

  //? Variables compoartidas
  _nombre: string; 
  _apellidoP: string; 
  _apellidoM: string; 
  _fechaBirt: string; 
  _genero: string; 
  _correo: string; 
  _contrasena: string; 
  _telefono: string; 
  _calle: string; 
  _colonia: string; 
  _municipio: string; 
  _estado: string; 
  _cp: string; 
  _ninterior: string; 
  _nexterior: string; 
  _referenc: string; 
  _propietario: string; 
  _tarjeta: string; 
  _fechaVenc: string; 
  _cvv: string; 
  //* Variable de formulario
  formPerson: FormGroup; 
  radioExample: FormControl = new FormControl(); //radioExample
  

  ngOnInit(): void {
    this.indexPerson = "2"
    this.indexClient = "2"
    this.persona.getPerson(this.indexPerson).subscribe(response => {
      this._nombre =      response.idPersona.nombre;
      this._apellidoP =   response.idPersona.apellido_paterno;
      this._apellidoM =   response.idPersona.apellido_materno;
      this.Bdate = response.idPersona.fecha_nac;
      this.Bdate = this.Bdate.split("-");
      this.Bdate = this.Bdate[2]+"-"+this.Bdate[1]+"-"+this.Bdate[0];
      response.idPersona.fecha_nac = this.Bdate; 
      this._fechaBirt =   this.Bdate;   
      this._genero =      response.idPersona.genero;
      this._correo =      response.correo; 
      this._contrasena =  response.contraseña; 
      this._telefono =    response.idPersona.telefono; 
      this._calle =       response.idPersona.direccion[0].calle; 
      this._colonia =     response.idPersona.direccion[0].colonia; 
      this._municipio =   response.idPersona.direccion[0].municipio; 
      this._estado =      response.idPersona.direccion[0].estado; 
      this._cp =          response.idPersona.direccion[0].cp; 
      this._ninterior =   response.idPersona.direccion[0].n_exterior; 
      this._nexterior =   response.idPersona.direccion[0].n_interior; 
      this._referenc =    response.idPersona.direccion[0].referencia; 
      this._propietario = response.idPersona.tarjeta[0].nombre_propietario; 
      this._tarjeta =     response.idPersona.tarjeta[0].numero; 
      this.Vdate = response.idPersona.fecha_nac;
      this.Vdate = this.Vdate.split("-");
      this.Vdate = this.Vdate[0]+"-"+this.Vdate[1];
      this._fechaVenc =   this.Vdate; 
      this._cvv =         response.idPersona.tarjeta[0].cvv; 
      
      this.formPerson = this.formBuilder.group({
        fname:       [response.idPersona.nombre,           [Validators.required]],
        fSame:       [response.idPersona.apellido_paterno, [Validators.required]],
        fLame:       [response.idPersona.apellido_materno],
        fBdate:      [this.Bdate],
        fGender:     [response.idPersona.genero],
        fEmail:      [response.correo, [Validators.required, Validators.email]],
        fPass:       [response.contraseña, [Validators.required, Validators.maxLength(8)]],
        fPhone:      [response.idPersona.telefono, [Validators.maxLength(10), Validators.minLength(10)]],
        fCalle:      [response.idPersona.direccion[0].calle],
        fColonia:    [response.idPersona.direccion[0].colonia],
        fMunicipio:  [response.idPersona.direccion[0].municipio],
        fEstado:     [response.idPersona.direccion[0].estado],
        fCp:         [response.idPersona.direccion[0].cp, [Validators.minLength(5), Validators.maxLength(5)]],
        fNinterior:  [response.idPersona.direccion[0].n_interio],
        fNexterior:  [response.idPersona.direccion[0].n_exterior],
        fReferenc:   [response.idPersona.direccion[0].referencia],
        fPropieta:   [response.idPersona.tarjeta[0].nombre_propietario],
        fTarjeta:    [response.idPersona.tarjeta[0].numero, [Validators.minLength(16), Validators.maxLength(16)]],
        fFechaVen:   [this.Vdate],
        fcvv:        [response.idPersona.tarjeta[0].cvv]
      });
    });
  }

  public updatePerson(){
    const API_MODIFY_PERSON = this.enlaces.API_ENLACE_PERSONAS+this.enlaces.PERSONA_UPDATE_P+this.indexPerson+this.enlaces.PERSONA_UPDATE_U+this.indexClient;

    // Formatear Fecha
    let date = this.formPerson.value.fBdate;
    if(date != null){
      date = date.split("-");
      date = date[2]+"/"+date[1]+"/"+date[0];      
      console.log(date);
    }else{
      date = null; 
    }

    if(this.enviarDatos){
      try{
        if(
          this.formPerson.value.fname != null &&
          this.formPerson.value.fSame != null &&
          this.formPerson.value.fEmail != null &&
          this.formPerson.value.fPass != null &&
          this.formPerson.value.fname != "" &&
          this.formPerson.value.fSame != "" &&
          this.formPerson.value.fEmail != "" &&
          this.formPerson.value.fPass != "" 
        ){
          //? Identificar que tipo de modificacion se hace
          this.persona.updateClientDataPerson(this.enlaces.API_ENLACE_PERSONAS + this.enlaces.PERSONA_UPDATE_P + this.indexPerson + this.enlaces.PERSONA_UPDATE_U + this.indexClient, {
            nombre: this.formPerson.value.fname,
            apellido_paterno: this.formPerson.value.fSame,
            apellido_materno: this.formPerson.value.fLame,
            fecha_nacimiento: date,
            genero: this.formPerson.value.fGender,
            correo: this.formPerson.value.fEmail,
            contrasena: this.formPerson.value.fPass,
            telefono: this.formPerson.value.fPhone
          }).subscribe(
            response => {
              this.information("Registro exitoso", "success")
              console.log(response);
            },
            error => {
              switch (error.status) {
                case 0:
                  this.errores("Error de conexión", "danger");
                  break;
                case 400:
                  this.errores("El correo ya está registrado", "warning");
                  break;
                case 404:
                  this.errores("El servidor no pudo encontrar el servicio solicitado", "warning");
                  break;
                case 500:
                  this.errores("Error en el servidor", "danger");
                  break;
              }
            }
          );
        }else{
          this.errores("Debe modificar minimo los datos marcados", "warning");
        }
      }catch(error){
        console.log(error);
      }
    }
  }

  public updateAddress(){

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
    setTimeout(() => {} , 1000);
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

  public enviar(){
    this.enviarDatos = true; 
    this.cancelar = false; 
    this.updatePerson();
  } 

  public cancel(){
    this.cancelar = true; 
    this.enviarDatos = false; 
    this.persona.getPerson("2").subscribe(response => {
      console.log(response)
    });
    // this.information("Cancelado", "danger");
  }
  
  public clearTarjeta() {
    // Para mandar la tarjeta se debe modificar el valor y el campo en form
    this._propietario = "";
    this._tarjeta = "";
    this._fechaVenc = "";
    this._cvv = "";
    this.formPerson.value.fPropieta = null;
    this.formPerson.value.fTarjeta = null;
    this.formPerson.value.fFechaVen = null;
    this.formPerson.value.fcvv = null;
  }

  public clearDireccion() {
    this._calle =  ""; 
    this._colonia =  ""; 
    this._municipio =  ""; 
    this._estado =  ""; 
    this._cp =  ""; 
    this._ninterior =  ""; 
    this._nexterior =  ""; 
    this._referenc =  ""; 
    this.formPerson.value.fCalle = null;
    this.formPerson.value.fColonia = null;
    this.formPerson.value.fMunicipio = null;
    this.formPerson.value.fEstado = null;
    this.formPerson.value.fCp = null;
    this.formPerson.value.fNinterior = null;
    this.formPerson.value.fNexterior = null;
    this.formPerson.value.fReferenc = null;
  }

  public capturarArchivo(event: any): any{
    const archivoCapturado = event.target.files[0];
    this.fileChange = true; 
    this.extraerB64(archivoCapturado).then((imagen: any) => {
      this.preView = imagen.base;
      console.log(imagen)
    })
  }
  
  extraerB64 = async ($event: any) => new Promise((resolve, reject) => {
    try{
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () =>{
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        })
      }

    }catch(ex){
      console.log(ex);
    }
  })
}