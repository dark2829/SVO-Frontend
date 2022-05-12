import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EnlacesService } from '../../../../services/enlaces.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonasService } from 'src/app/services/personas.service';
import { empty, map } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { TokenService } from '../../../../services/token.service';
import { AlertaService } from '../../../../services/alerta.service';

@Component({
  selector: 'app-perfil-modify',
  templateUrl: './perfil-modify.component.html',
  styleUrls: ['./perfil-modify.component.css']
})
export class PerfilModifyComponent implements OnInit {  

  fileChange: boolean = false;
  preView: string; 
  direccion1: boolean = true;
  direccion2: boolean = false;
  direccion3: boolean = false;
  tarjeta1: boolean = true;
  tarjeta2: boolean = false;
  tarjeta3: boolean = false;

  position: number = 0; 
  positionCard: number = 0; 

  //* Constructores
  constructor(
    private router: Router,    
    private enlaces: EnlacesService, 
    private formBuilder: FormBuilder, 
    private persona: PersonasService, 
    private sanitizer: DomSanitizer,    
    private token: TokenService, 
    private alerta: AlertaService
  ) { }
  
  //* Variables 
  indexPerson: string; 
  indexClient: string; 
  Bdate: any; 
  Vdate: any
  enviarDatos = false; 
  cancelar = false;
  direccionesArry: any [] = [];
  tarjetsArry: any [] = [undefined, undefined, undefined];

  //? Variables compoartidas
  _nombre: any; 
  _apellidoP: any; 
  _apellidoM: any; 
  _fechaBirt: any; 
  _genero: any; 
  _correo: any; 
  _contrasena: any; 
  _telefono: any; 
  _calle: any[] = ['','','']; 
  _colonia: any[] = ['','','']; 
  _municipio: any[] = ['','','']; 
  _estado: any[] = ['','','']; 
  _cp: any[] = ['','','']; 
  _ninterior: any[] = ['','','']; 
  _nexterior: any[] = ['','','']; 
  _referenc: any[] = ['','','']; 
  _propietario: any[] = ['','','']; 
  _tarjeta: any[] = ['','','']; 
  _fechaVenc: any[] = ['','','']; 
  _cvv: any[] = ['','','']; 
  //* Variable de formulario
  formPerson: FormGroup; 
  radioExample: FormControl = new FormControl(); //radioExample
  
  
  //FIXME: Falta revisar los datos de modificar direccion y tarjetas
  /*
  el error es que genera una direccion per ose deberia modificar la direccion existente
  en tarjeta solo manda una parte del texto por campo. 
  */
  ngOnInit(): void {
    this.indexPerson = this.token.getID();

    this.persona.getPerson(this.indexPerson).subscribe(response => {
      this.indexClient = response.data.id;//? Id usuario
      console.log(response);

      this._nombre =      response.data.idPersona.nombre;
      this._apellidoP =   response.data.idPersona.apellido_paterno;
      this._apellidoM =   response.data.idPersona.apellido_materno;
      if(response.data.idPersona.fecha_nac != null){
        this.Bdate = response.data.idPersona.fecha_nac;
        this.Bdate = this.Bdate.split("-");
        this.Bdate = this.Bdate[2]+"-"+this.Bdate[1]+"-"+this.Bdate[0];
        this._fechaBirt =   this.Bdate; 
      }
      this._genero =      response.data.idPersona.genero;
      this._correo =      response.data.correo; 
      this._contrasena =  response.data.contraseña; 
      this._telefono =    response.data.idPersona.telefono; 
      this.direccionesArry = response.data.idPersona.direccion;
      this.tarjetsArry = response.data.idPersona.tarjeta;
      response.data.idPersona.direccion.forEach((element: any, index: number) => {
        if (element != null) {
          this._calle[index] = response.data.idPersona.direccion[index].calle;
          this._colonia[index] = response.data.idPersona.direccion[index].colonia;
          this._municipio[index] = response.data.idPersona.direccion[index].municipio;
          this._estado[index] = response.data.idPersona.direccion[index].estado;
          this._cp[index] = response.data.idPersona.direccion[index].cp;
          this._ninterior[index] = response.data.idPersona.direccion[index].n_exterior;
          this._nexterior[index] = response.data.idPersona.direccion[index].n_interior;
          this._referenc[index] = response.data.idPersona.direccion[index].referencia;
          this.direccionesArry[index] = response.data.idPersona.direccion[index].id;
        }
        
        response.data.idPersona.tarjeta.forEach((element: any, index: number) => {
          this._propietario[index] = response.data.idPersona.tarjeta[index].nombre_propietario;
          this._tarjeta[index] = response.data.idPersona.tarjeta[index].numero;
          this.Vdate = response.data.idPersona.tarjeta[index].fecha_vencimiento;
          this.Vdate = this.Vdate.split("/");
          this.Vdate = this.Vdate[0] + "-" + this.Vdate[1];
          this._fechaVenc[index] = this.Vdate;
          this._cvv[index] = response.data.idPersona.tarjeta[index].cvv;
        })
      });
      
      this.formPerson = this.formBuilder.group({
        fname:       [this._nombre, [Validators.required]],
        fSame:       [this._apellidoP, [Validators.required]],
        fLame:       [this._apellidoM],
        fBdate:      [this.Bdate],
        fGender:     [this._genero],
        fEmail:      [this._correo, [Validators.required, Validators.email]],
        fPass:       [this._contrasena, [Validators.required, Validators.maxLength(8)]],
        fPhone:      [this._telefono, [Validators.maxLength(10), Validators.minLength(10)]],
        fCalle:      [this._calle[0]],
        fColonia:    [this._colonia[0]],
        fMunicipio:  [this._municipio[0]],
        fEstado:     [this._estado[0]],
        fCp:         [this._cp[0], [Validators.minLength(5), Validators.maxLength(5)]],
        fNinterior:  [this._ninterior[0]],
        fNexterior:  [this._nexterior[0]],
        fReferenc:   [this._referenc[0]],
        fPropieta:   [this._propietario[0]],
        fTarjeta:    [this._tarjeta[0], [Validators.minLength(16), Validators.maxLength(16)]],
        fFechaVen:   [this._fechaVenc[0]],
        fcvv:        [this._cvv[0]]
      });
    });
  }
  
  //FIXME: Falta modificar para acrualizar los datos de la persona
  public updatePerson() {
    const API_MODIFY_PERSON = this.enlaces.API_ENLACE_PERSONAS + this.enlaces.PERSONA_UPDATE_P + this.indexPerson + this.enlaces.PERSONA_UPDATE_U + this.indexClient;

    // Formatear Fecha
    let date = this.formPerson.value.fBdate;
    if (date != null) {
      date = date.split("-");
      date = date[2] + "/" + date[1] + "/" + date[0];
      console.log(date);
    } else {
      date = null;
    }

    try {
      if (
        this.formPerson.value.fname != null &&
        this.formPerson.value.fSame != null &&
        this.formPerson.value.fEmail != null &&
        this.formPerson.value.fPass != null &&
        this.formPerson.value.fname != "" &&
        this.formPerson.value.fSame != "" &&
        this.formPerson.value.fEmail != "" &&
        this.formPerson.value.fPass != ""
      ) {
        //? Identificar que tipo de modificacion se hace
        const API_CLIENT = this.enlaces.API_ENLACE_PERSONAS+this.enlaces.PERSONA_UPDATE_P+this.indexPerson+this.enlaces.PERSONA_UPDATE_U+this.indexClient;
        console.log(API_CLIENT);
        this.persona.updateClientDataPerson(API_CLIENT, {
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
            this.alerta.showAlert("Registro exitoso", "success", 2000)
          },
          error => {
            console.log(error);
            this.alerta.showAlert(error.message, "danger", 2000, error.status)
          }
          );
        } else {
        this.alerta.showAlert("Modificar mínimo los datos marcados", "warning", 2000)
      }
    } catch (error) {
      console.log(error);
    }
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
  }
  
  public clearTarjeta() {
    // Para mandar la tarjeta se debe modificar el valor y el campo en form
    let dirIndex = 0;
    if (this.tarjeta1 == true) {
      dirIndex = 0;
    }
    if (this.direccion2 == true) {
      dirIndex = 1;
    }
    if (this.direccion3 == true) {
      dirIndex = 2;
    }  
    this._propietario[dirIndex] = "";
    this._tarjeta[dirIndex] = "";
    this._fechaVenc[dirIndex] = "";
    this._cvv[dirIndex] = "";
    this.formPerson.value.fPropieta = "";
    this.formPerson.value.fTarjeta = "";
    this.formPerson.value.fFechaVen = "";
    this.formPerson.value.fcvv = 0;
  }

  public clearDireccion() {
    let dirIndex = 0;
    if (this.direccion1 == true) {
      dirIndex = 0;
    }
    if (this.direccion2 == true) {
      dirIndex = 1;
    }
    if (this.direccion3 == true) {
      dirIndex = 2;
    }    
    this._calle[dirIndex] = "";
    this._colonia[dirIndex] = "";
    this._municipio[dirIndex] = "";
    this._estado[dirIndex] = "";
    this._cp[dirIndex] = "";
    this._ninterior[dirIndex] = "";
    this._nexterior[dirIndex] = "";
    this._referenc[dirIndex] = "";
    this.formPerson.value.fCalle = ""
    this.formPerson.value.fColonia = ""
    this.formPerson.value.fMunicipio = ""
    this.formPerson.value.fEstado = ""
    this.formPerson.value.fCp = -1
    this.formPerson.value.fNinterior = -1
    this.formPerson.value.fNexterior = -1
    this.formPerson.value.fReferenc = ""
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

  direccionU(){
    this.direccion1 = true;
    this.direccion2 = false;
    this.direccion3 = false;
    this.position = 0; 
  }
  direccionD(){
    this.direccion1 = false;
    this.direccion2 = true;
    this.direccion3 = false;
    this.position = 1; 
  }
  direccionT(){
    this.direccion1 = false;
    this.direccion2 = false;
    this.direccion3 = true;
    this.position = 2; 
  }

  saveDirection() {
    let directionIndex = 0;
    const API_ADDRESS = this.enlaces.API_ENLACE_PERSONAS + this.enlaces.PERSONA_UPDATE_ADRES + this.indexPerson + this.enlaces.PERSONA_UPDATE_U + this.indexClient;
    if (this.direccion1 == true) {
      directionIndex = 0; 
    }
    if (this.direccion2 == true) {
      directionIndex = 1; 
    }
    if (this.direccion3 == true) {
      directionIndex = 2; 
    }

    this.persona.updateClientDirection(API_ADDRESS, {
      idDireccion: this.direccionesArry[directionIndex],
      calle: this.formPerson.value.fCalle,
      colonia: this.formPerson.value.fColonia,
      municipio: this.formPerson.value.fMunicipio,
      estado: this.formPerson.value.fEstado,
      cp: this.formPerson.value.fCp,
      n_interio: this.formPerson.value.fNinterior,
      n_exterior: this.formPerson.value.fNexterior,
      referencia: this.formPerson.value.fReferenc
    }).subscribe(response => {
      this.alerta.showAlert("Dirección modificada", "success", 2000);
    }, error => {
      console.log(error);
      this.alerta.showAlert("Ocurrió un error", "danger", 2000);
    });
  }

  tarjetaU(){
    this.tarjeta1 = true;
    this.tarjeta2 = false;
    this.tarjeta3 = false;
    this.positionCard = 0; 
    
  }
  tarjetaD(){
    this.tarjeta1 = false;
    this.tarjeta2 = true;
    this.tarjeta3 = false;
    this.positionCard = 1; 

  }
  tarjetaT(){
    this.tarjeta1 = false;
    this.tarjeta2 = false;
    this.tarjeta3 = true;
    this.positionCard = 2; 

  }

  saveCard() {
    let tarjetIdx = 0;
    const API_CARD = this.enlaces.API_ENLACE_PERSONAS + this.enlaces.PERSONA_UPDATE_CARDS + this.indexPerson + this.enlaces.PERSONA_UPDATE_U + this.indexClient;
    if (this.tarjeta1 == true) {
      tarjetIdx = 0;
    }
    if (this.tarjeta2 == true) {
      tarjetIdx = 1;
    }
    if (this.tarjeta3 == true) {
      tarjetIdx = 2;
    }
    if(this.tarjetsArry[tarjetIdx] == undefined){
      console.log("Es undefined");
      this.persona.updateClientTarget(API_CARD, {
        idTarjeta: this.tarjetsArry[tarjetIdx],
        nombre_propietario: this.formPerson.value.fPropieta[tarjetIdx],
        numero_tarjeta: this.formPerson.value.fTarjeta[tarjetIdx],
        fecha_vencimiento: this.formPerson.value.fFechaVen[tarjetIdx],
        cvv: this.formPerson.value.fcvv[tarjetIdx]
      }).subscribe(response => {
        this.alerta.showAlert("Tarjeta modificada", "success", 2000);
      }, error => {
        console.log(error);
        this.alerta.showAlert("Ocurrió un error", "danger", 2000);
      });
    }else{
      console.log("No es undefined");
      this.persona.updateClientTarget(API_CARD, {
        idTarjeta: this.tarjetsArry[tarjetIdx].id,
        nombre_propietario: this.formPerson.value.fPropieta,
        numero_tarjeta: this.formPerson.value.fTarjeta,
        fecha_vencimiento: this.formPerson.value.fFechaVen,
        cvv: this.formPerson.value.fcvv
      }).subscribe(response => {
        this.alerta.showAlert("Tarjeta modificada", "success", 2000);
      }, error => {
        console.log(error);
        this.alerta.showAlert("Ocurrió un error", "danger", 2000);
      }); 
    }
  }
}