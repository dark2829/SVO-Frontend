import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EnlacesService } from '../../../../services/enlaces.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  formularioPersona: FormGroup;
  fileChange: boolean = false;
  preView: string; 
  indexClient: any; 
  activeDirection: any = [true, false, false];
  directionToSaved: any = 0; 

  constructor(
    private router: Router,    
    private enlaces: EnlacesService, 
    private formBuilder: FormBuilder, 
    private persona: PersonasService, 
    private sanitizer: DomSanitizer,    
    private token: TokenService, 
    private alerta: AlertaService
  ) { }

  nombre: any = null; 
  apellP: any = null; 
  apellM: any = null; 
  fnaciM: any = null; 
  genero: any = null; 
  correo: any = null; 
  passwo: any = null; 
  telefo: any = null; 

  fcalle: any = null;
  fcolon: any = null;
  munici: any = null;
  estado: any = null;
  codPos: any = null;
  ninter: any = null;
  nexter: any = null;
  refere: any = null;
  
  namePr: any = null; 
  numbeT: any = null; 
  cvvTar: any = null; 
  fvenci: any = null; 

  ngOnInit(): void{
    this.persona.getPerson(this.token.getID()).subscribe(response => {
      this.indexClient = response.data.id;
      if(response.data.idPersona.nombre != null){
        this.nombre = response.data.idPersona.nombre; 
      }
      if(response.data.idPersona.apellido_paterno != null){
        this.apellP = response.data.idPersona.apellido_paterno;
      }
      if(response.data.idPersona.apellido_materno != null){
        this.apellM = response.data.idPersona.apellido_materno; 
      }
      if(response.data.idPersona.fecha_nac != null){
        let parsear = response.data.idPersona.fecha_nac;
        parsear = parsear.split("-");
        parsear = parsear[2]+"-"+parsear[1]+"-"+parsear[0];
        this.fnaciM =   parsear; 
      }
      if(response.data.idPersona.genero != null){
        this.genero = response.data.idPersona.genero;
      }
      if(response.data.idPersona.correo != null){
        this.correo = response.data.idPersona.correo; 
      }
      if(response.data.contraseña){
        this.passwo = response.data.contraseña;
      }
      if(response.data.idPersona.telefono != null){
        console.log(response.data.idPersona.telefono);
        this.telefo = response.data.idPersona.telefono;
      }
      if(response.data.idPersona.direccion.length > 0){
        this.fcalle = response.data.idPersona.direccion[0].calle;
        this.fcolon = response.data.idPersona.direccion[0].colonia;
        this.munici = response.data.idPersona.direccion[0].municipio;  
        this.estado = response.data.idPersona.direccion[0].estado;  
        this.codPos = response.data.idPersona.direccion[0].cp;  
        this.ninter = response.data.idPersona.direccion[0].n_interior;  
        this.nexter = response.data.idPersona.direccion[0].n_exterior;  
        this.refere = response.data.idPersona.direccion[0].referencia;  
      }

      if(response.data.idPersona.tarjeta.length > 0){
        this.namePr = response.data.idPersona.tarjeta[0].nombre_propietario;
        this.numbeT = response.data.idPersona.tarjeta[0].numero;
        this.cvvTar = response.data.idPersona.tarjeta[0].cvv;
        let parsear = response.data.idPersona.tarjeta[0].fecha_vencimiento;
        parsear = parsear.split("/");
        parsear = parsear[0] + "-" + parsear[1];
        this.fvenci = parsear;
      }

      this.formularioPersona = this.formBuilder.group({
        nombre: [this.nombre, [Validators.required]],
        apellP: [this.apellP, [Validators.required]],
        apellM: [this.apellM, [Validators.required]],
        fnaciM: [this.fnaciM],
        genero: [this.genero],
        correo: [this.correo],
        contas: [this.passwo],
        telefo: [this.telefo],

        fcalle: [this.fcalle],
        fcolon: [this.fcolon],
        munici: [this.munici],
        estado: [this.estado],
        codPos: [this.codPos],
        ninter: [this.ninter],
        nexter: [this.nexter],
        refere: [this.refere],

        namePr: [this.namePr],
        numbeT: [this.numbeT],
        cvvTar: [this.cvvTar],
        fvenci: [this.fvenci]
      });
    });
  }

  public guardarInfo(){
    const API_MODIFY_PERSON = this.enlaces.API_ENLACE_PERSONAS + this.enlaces.PERSONA_UPDATE_P + this.token.getID() + this.enlaces.PERSONA_UPDATE_U + this.indexClient;
    
    // Formatear Fecha
    let date = this.formularioPersona.value.fnaciM;
    if (date != null) {
      date = date.split("-");
      date = date[2] + "/" + date[1] + "/" + date[0];
      console.log(date);
    } else {
      date = null;
    }

    try {
      if (
        this.formularioPersona.value.nombre != null &&
        this.formularioPersona.value.apellP != null &&
        this.formularioPersona.value.correo != null &&
        this.formularioPersona.value.contas != null &&
        this.formularioPersona.value.nombre != "" &&
        this.formularioPersona.value.apellP != "" &&
        this.formularioPersona.value.correo != "" &&
        this.formularioPersona.value.contas != ""
      ) {
        //? Identificar que tipo de modificacion se hace
        const API_CLIENT = this.enlaces.API_ENLACE_PERSONAS+this.enlaces.PERSONA_UPDATE_P+this.token.getID()+this.enlaces.PERSONA_UPDATE_U+this.indexClient;
        this.persona.updateClientDataPerson(API_CLIENT, {
          nombre: this.formularioPersona.value.nombre,
          apellido_paterno: this.formularioPersona.value.apellP,
          apellido_materno: this.formularioPersona.value.apellM,
          fecha_nacimiento: date,
          genero: this.formularioPersona.value.genero,
          correo: this.formularioPersona.value.correo,
          contrasena: this.formularioPersona.value.contas,
          telefono: this.formularioPersona.value.telefo
        }).subscribe(
          response => {
            this.alerta.showAlert("Registro exitoso", "success", 2000)
            setTimeout( () => {window.location.reload()}, 2000)
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

  saveDirection(){
    const API_ADDRESS = this.enlaces.API_ENLACE_PERSONAS + this.enlaces.PERSONA_UPDATE_ADRES + this.token.getID() + this.enlaces.PERSONA_UPDATE_U + this.indexClient;
    console.log("Direccion a guardar: ",this.directionToSaved);

    this.persona.getPerson(this.token.getID()).subscribe(response => {
      if(response.data.idPersona.direccion.length == 0){
        this.persona.updateClientDirectionSNId(API_ADDRESS, {
          calle: this.formularioPersona.value.fcalle,
          colonia: this.formularioPersona.value.fcolon,
          municipio: this.formularioPersona.value.munici,
          estado: this.formularioPersona.value.estado,
          cp: this.formularioPersona.value.codPos,
          n_interio: this.formularioPersona.value.ninter,
          n_exterior: this.formularioPersona.value.nexter,
          referencia: this.formularioPersona.value.refere
        }).subscribe(response => {
          this.alerta.showAlert("Dirección modificada", "success", 2000);
        }, error => {
          console.log(error);
          this.alerta.showAlert("Ocurrió un error", "danger", 2000);
        });
        // this.formularioPersona.reset();
      }else{
        this.persona.updateClientDirection(API_ADDRESS, {
          idDireccion: response.data.idPersona.direccion[0].id,
          calle: this.formularioPersona.value.fcalle,
          colonia: this.formularioPersona.value.fcolon,
          municipio: this.formularioPersona.value.munici,
          estado: this.formularioPersona.value.estado,
          cp: this.formularioPersona.value.codPos,
          n_interio: this.formularioPersona.value.ninter,
          n_exterior: this.formularioPersona.value.nexter,
          referencia: this.formularioPersona.value.refere
        }).subscribe(response => {
          this.alerta.showAlert("Dirección modificada", "success", 2000);
        }, error => {
          console.log(error);
          this.alerta.showAlert("Ocurrió un error", "danger", 2000);
        });
      }
    })
    //no tiene direcciones
    //insertar
    //modificar
  }
  
  //? Identifica el boton y rellena el formulario con la informacion de direccion
  direccionActivedButton(id: number) {
    //? Identificar el boton de direccion
    this.activeDirection.forEach((element: any, index: number) => {
      this.activeDirection[index] = false;
    });
    this.activeDirection[id] = true;
    
    //? Rellenar formulario con info de la direccion
    this.persona.getPerson(this.token.getID()).subscribe(response => {
      console.log(response)
      console.log(response);
      if(response.data.idPersona.direccion.length == 0){
        this.formularioPersona = this.formBuilder.group({
          fcalle: [null],
          fcolon: [null],
          munici: [null],
          estado: [null],
          codPos: [null],
          ninter: [null],
          nexter: [null],
          refere: [null],
        });  
        this.alerta.showAlert("Al parecer no contiene datos", "warning", 2000);
      }else{
        if(response.data.idPersona.direccion.length <= id){
          this.formularioPersona = this.formBuilder.group({
            fcalle: [null],
            fcolon: [null],
            munici: [null],
            estado: [null],
            codPos: [null],
            ninter: [null],
            nexter: [null],
            refere: [null],
          });  
          this.alerta.showAlert("Al parecer no contiene datos", "warning", 2000);
        }else{
          this.directionToSaved = response.data.idPersona.direccion[id];
          this.formularioPersona = this.formBuilder.group({
            fcalle: [response.data.idPersona.direccion[id].calle],
            fcolon: [response.data.idPersona.direccion[id].colonia],
            munici: [response.data.idPersona.direccion[id].municipio],
            estado: [response.data.idPersona.direccion[id].estado],
            codPos: [response.data.idPersona.direccion[id].cp],
            ninter: [response.data.idPersona.direccion[id].n_interior],
            nexter: [response.data.idPersona.direccion[id].n_exterior],
            refere: [response.data.idPersona.direccion[id].referencia],
          });  
        }
      }
    });
  }

  public capturarArchivo(event: any): any{
    const archivoCapturado = event.target.files[0];
    this.fileChange = true; 
    this.extraerB64(archivoCapturado).then((imagen: any) => {
      this.preView = imagen.base;
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
  
  /*
  fcalle: [this.telefo],
  direccion1: boolean = true;
  direccion2: boolean = false;
  direccion3: boolean = false;
  tarjeta1: boolean = true;
  tarjeta2: boolean = false;
  tarjeta3: boolean = false;

  position: number = 0; 
  positionCard: number = 0; 
  
  //* Variables 
  indexPerson: string; 
  indexClient: string; 
  Bdate: any; 
  Vdate: any
  enviarDatos = false; 
  cancelar = false;
  direccionesArry: any [] = [];
  tarjetsArry: any [] = [undefined, undefined, undefined];
  
  
  //FIXME: Falta revisar los datos de modificar direccion y tarjetas
  
  el error es que genera una direccion per ose deberia modificar la direccion existente
  en tarjeta solo manda una parte del texto por campo. 
  
  ngOnInit(): void {
    this.indexPerson = this.token.getID();

    this.persona.getPerson(this.indexPerson).subscribe(response => {
      this.indexClient = response.data.id;//? Id usuario
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

  saveDirection() {    
    const API_ADDRESS = this.enlaces.API_ENLACE_PERSONAS + this.enlaces.PERSONA_UPDATE_ADRES + this.indexPerson + this.enlaces.PERSONA_UPDATE_U + this.indexClient;
    if (this.direccion1 == true) {
      this.persona.getPerson(this.indexPerson).subscribe(response => {
        if(response.data.idPersona.direccion[0].id == null){
          this.persona.updateClientDirectionSNId(API_ADDRESS, {
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
          this.formPerson.reset();
        }else{
          this.persona.updateClientDirection(API_ADDRESS, {
            idDireccion: response.data.idPersona.direccion[0].id,
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
      })
    }
    if (this.direccion2 == true) {
      this.persona.getPerson(this.indexPerson).subscribe(response => {
        console.log(response.data.idPersona.direccion.length == 1);
        if(response.data.idPersona.direccion.length == 1){
          this.persona.updateClientDirectionSNId(API_ADDRESS, {
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
        }else{
          this.persona.updateClientDirection(API_ADDRESS, {
            idDireccion: response.data.idPersona.direccion[1].id,
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
      })
    }
    if (this.direccion3 == true) {
      this.persona.getPerson(this.indexPerson).subscribe(response => {
        console.log(response.data.idPersona.direccion.length == 2);
        if(response.data.idPersona.direccion.length == 2){
          this.persona.updateClientDirectionSNId(API_ADDRESS, {
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
        }else{
          this.persona.updateClientDirection(API_ADDRESS, {
            idDireccion: response.data.idPersona.direccion[2].id,
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
      })
    }
  }

  tarjetaU(){
    this.tarjeta1 = true;
    this.tarjeta2 = false;
    this.tarjeta3 = false;
    let parseDate: any
    this.persona.getPerson(this.indexPerson).subscribe(response => {
      console.log(response.data.idPersona.tarjeta);

      if(response.data.idPersona.tarjeta.length == 0){
      this.formPerson.reset();
      }else{
        if(response.data.idPersona.tarjeta[0].fecha_vencimiento != null){
          parseDate = response.data.idPersona.tarjeta[0].fecha_vencimiento;
          parseDate = parseDate.split("/");
          parseDate = parseDate[0] + "-" + parseDate[1];
        }
        this.formPerson = this.formBuilder.group({
          fPropieta:   [response.data.idPersona.tarjeta[0].nombre_propietario],
          fTarjeta:    [response.data.idPersona.tarjeta[0].numero],
          fFechaVen:   [parseDate],
          fcvv:        [response.data.idPersona.tarjeta[0].cvv]
        });
      }
    });
    
  }
  tarjetaD(){
    this.tarjeta1 = false;
    this.tarjeta2 = true;
    this.tarjeta3 = false;
    let parseDate: any
    this.persona.getPerson(this.indexPerson).subscribe(response => {
      if(response.data.idPersona.tarjeta.length == 1){
      this.formPerson.reset();
      }else{
        if(response.data.idPersona.tarjeta[1].fecha_vencimiento != null){
          parseDate = response.data.idPersona.tarjeta[0].fecha_vencimiento;
          parseDate = parseDate.split("/");
          parseDate = parseDate[0] + "-" + parseDate[1];
        }
        this.formPerson = this.formBuilder.group({
          fPropieta:   [response.data.idPersona.tarjeta[1].nombre_propietario],
          fTarjeta:    [response.data.idPersona.tarjeta[1].numero],
          fFechaVen:   [parseDate],
          fcvv:        [response.data.idPersona.tarjeta[1].cvv]
        });
      }
    });
  }

  tarjetaT(){
    this.tarjeta1 = false;
    this.tarjeta2 = false;
    this.tarjeta3 = true;
    let parseDate: any
    this.persona.getPerson(this.indexPerson).subscribe(response => {
      if(response.data.idPersona.tarjeta.length == 2){
      this.formPerson.reset();
      }else{
        console.log(response.data.idPersona.tarjeta);
        if(response.data.idPersona.tarjeta[2].fecha_vencimiento != null){
          parseDate = response.data.idPersona.tarjeta[0].fecha_vencimiento;
          parseDate = parseDate.split("/");
          parseDate = parseDate[0] + "-" + parseDate[1];
        }
        this.formPerson = this.formBuilder.group({
          fPropieta:   [response.data.idPersona.tarjeta[2].nombre_propietario],
          fTarjeta:    [response.data.idPersona.tarjeta[2].numero],
          fFechaVen:   [parseDate],
          fcvv:        [response.data.idPersona.tarjeta[2].cvv]
        });
      }
    });
  }

  saveCard() {
    const API_CARD = this.enlaces.API_ENLACE_PERSONAS + this.enlaces.PERSONA_UPDATE_CARDS + this.indexPerson + this.enlaces.PERSONA_UPDATE_U + this.indexClient;
    if (this.tarjeta1 == true) {
      this.persona.getPerson(this.indexPerson).subscribe(response => {
        if(response.data.idPersona.tarjeta[0].id == null){
          this.persona.updateClientTargetSNId(API_CARD, {            
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
          this.formPerson.reset();
        }else{
          this.persona.updateClientTarget(API_CARD, {
            idTarjeta: response.data.idPersona.tarjeta[0].id,
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
      })
    }
    if (this.tarjeta2 == true) {
      this.persona.getPerson(this.indexPerson).subscribe(response => {
        console.log(response.data.idPersona[1]);
        if(response.data.idPersona.tarjeta[1] == undefined){
          this.persona.updateClientTargetSNId(API_CARD, {            
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
          this.formPerson.reset();
        }else{
          this.persona.updateClientTarget(API_CARD, {
            idTarjeta: response.data.idPersona.tarjeta[1].id,
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
      })
    }
    if (this.tarjeta3 == true) {
      this.persona.getPerson(this.indexPerson).subscribe(response => {
        if(response.data.idPersona.tarjeta[2] == undefined){
          this.persona.updateClientTargetSNId(API_CARD, {            
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
          this.formPerson.reset();
        }else{
          this.persona.updateClientTarget(API_CARD, {
            idTarjeta: response.data.idPersona.tarjeta[2].id,
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
      })
    }
  }*/
}