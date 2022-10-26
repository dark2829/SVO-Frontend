import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EnlacesService } from '../../../../services/enlaces.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonasService } from 'src/app/services/personas.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TokenService } from '../../../../services/token.service';
import { AlertaService } from '../../../../services/alerta.service';

@Component({
  selector: 'app-perfil-modify',
  templateUrl: './perfil-modify.component.html',
  styleUrls: ['./perfil-modify.component.css']
})
export class PerfilModifyComponent implements OnInit {  

  formularioPersona: FormGroup; // Datos personales
  formularioDirection: FormGroup; // Direcciones
  formularioCards: FormGroup; // Tarjetas

  indexClient: any;

  fileChange: boolean = false;
  preView: any;
  img: any;

  activeDirection: any = [true, false, false];
  directionToSaved: any = 0; 
  indexToSaved: any = 0; 
  activeTarjet: any = [true, false, false];
  tarjetToSaved: any = 0; 
  indexToSavedTarjet: any = 0; 

  constructor(
    private router: Router,    
    private enlaces: EnlacesService, 
    private formBuilder: FormBuilder, 
    private persona: PersonasService, 
    private sanitizer: DomSanitizer,    
    private token: TokenService, 
    private alerta: AlertaService
  ) { }

  /* Variables para cargar informacion */
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
  
  parseCurrent: any; 
  dateCard: any; 

  ngOnInit(): void{

    //? identificar las fechas 
    this.parseCurrent = this.token.valiNac();
    this.dateCard = this.token.validNip();

    //? Setear formulario
    this.formularioPersona = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellP: ['', [Validators.required]],
      apellM: ['', [Validators.required]],
      fnaciM: [''],
      genero: [''],
      correo: [''],
      contas: ['', [Validators.minLength(5), Validators.maxLength(8)]],
      telefo: [''],
    });

    this.formularioDirection = this.formBuilder.group({
      fcalle: [null, [Validators.required]],
      fcolon: [null, [Validators.required]],
      munici: [null, [Validators.required]],
      estado: [null, [Validators.required]],
      codPos: [null, [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      ninter: [null, [Validators.maxLength(5), Validators.minLength(1)]],
      nexter: [null, [Validators.required, Validators.maxLength(5), Validators.minLength(1)]],
      refere: [null],
    });
    
    this.formularioCards = this.formBuilder.group({
      namePr: [null, [Validators.required]],
      numbeT: [null, [Validators.required]],
      cvvTar: [null, [Validators.required]],
      fvenci: [null, [Validators.required]]
    });

    let parsear;
    //? Obtiene la infromario de la persona
    this.persona.getPerson(this.token.getID()).subscribe(response => {
      console.log(response.data )
      if (response.data.idPersona.foto != null) {
        this.fileChange = true;
        this.preView = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'+response.data.idPersona.foto)
        this.img = response.data.idPersona.foto;
      }

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
        this.correo = response.data.correo; 
      }
      if(response.data.contraseña){
        this.passwo = response.data.contraseña;
      }
      if(response.data.idPersona.telefono != null){
        this.telefo = response.data.idPersona.telefono;
      }
      if(response.data.idPersona.direccion.length > 0){
        this.fcalle = response.data.idPersona.direccion[0].calle;
        this.fcolon = response.data.idPersona.direccion[0].colonia;
        this.munici = response.data.idPersona.direccion[0].municipio;  
        this.estado = response.data.idPersona.direccion[0].estado;  
        this.codPos = (response.data.idPersona.direccion[0].cp === -1) ? null : response.data.idPersona.direccion[0].cp;  
        this.ninter = (response.data.idPersona.direccion[0].n_interior === -1) ? null : response.data.idPersona.direccion[0].n_interior;  
        this.nexter = (response.data.idPersona.direccion[0].n_exterior === -1) ? null : response.data.idPersona.direccion[0].n_exterior;  
        this.refere = response.data.idPersona.direccion[0].referencia;  
      }

      if(response.data.idPersona.tarjeta.length > 0){
        if(response.data.idPersona.tarjeta[0].numero != null){
          this.namePr = response.data.idPersona.tarjeta[0].nombre_propietario;
          this.numbeT = response.data.idPersona.tarjeta[0].numero;
          this.cvvTar = (response.data.idPersona.tarjeta[0].cvv === -1) ? null : response.data.idPersona.tarjeta[0].cvv;
          parsear = response.data.idPersona.tarjeta[0].fecha_vencimiento;
          parsear = parsear.split("/");
          parsear = parsear[0] + "-" + parsear[1];
          this.fvenci = parsear;
        }

        this.formularioCards.patchValue({
          namePr: response.data.idPersona.tarjeta[0].nombre_propietario,
          numbeT: response.data.idPersona.tarjeta[0].numero,
          cvvTar: this.cvvTar,
          fvenci: response.data.idPersona.tarjeta[0].fecha_vencimiento
        });
      }

      this.formularioPersona.patchValue({
        nombre: response.data.idPersona.nombre,
        apellP: response.data.idPersona.apellido_paterno,
        apellM: response.data.idPersona.apellido_materno,
        fnaciM: this.fnaciM,
        genero: response.data.idPersona.genero,
        correo: response.data.correo,
        contas: '',
        telefo: response.data.idPersona.telefono,
      });

      this.formularioDirection.patchValue({
        fcalle: response.data.idPersona.direccion[0].calle,
        fcolon: response.data.idPersona.direccion[0].colonia,
        munici: response.data.idPersona.direccion[0].municipio,
        estado: response.data.idPersona.direccion[0].estado,
        codPos: this.codPos,
        ninter: this.ninter,
        nexter: this.nexter,
        refere: response.data.idPersona.direccion[0].referencia,
      });

    });

    if(window.sessionStorage.getItem('Values') == '1'){
      window.sessionStorage.setItem('Values', '0');
      window.location.reload();
    }
  }

  public guardarInfo(){ //? Solo informacion basica
    const API_MODIFY_PERSON = this.enlaces.API_ENLACE_PERSONAS + this.enlaces.PERSONA_UPDATE_P + this.token.getID() + this.enlaces.PERSONA_UPDATE_U + this.indexClient;
    
    // Formatear Fecha
    let date = this.formularioPersona.value.fnaciM;
    if (date != null) {
      date = date.split("-");
      date = date[2] + "/" + date[1] + "/" + date[0];
    } else {
      date = null;
    }

    try {
      if (
        this.formularioPersona.value.nombre != null &&
        this.formularioPersona.value.apellP != null &&
        this.formularioPersona.value.apellM != null &&
        this.formularioPersona.value.correo != null &&
        this.formularioPersona.value.contas != null &&
        this.formularioPersona.value.nombre != "" &&
        this.formularioPersona.value.apellP != "" &&
        this.formularioPersona.value.apellM != "" &&
        this.formularioPersona.value.correo != "" &&
        this.formularioPersona.value.contas != "" &&
        this.formularioPersona.value.contas.length >= 5
      ) {
        //? Identificar que tipo de modificacion se hace
        const API_CLIENT = this.enlaces.API_ENLACE_PERSONAS+this.enlaces.PERSONA_UPDATE_P+this.token.getID()+this.enlaces.PERSONA_UPDATE_U+this.indexClient;
        this.persona.updateClientDataPerson(API_CLIENT, {
          nombre: this.formularioPersona.value.nombre.trimStart().trimEnd(),
          apellido_paterno: this.formularioPersona.value.apellP.trimStart().trimEnd(),
          apellido_materno: this.formularioPersona.value.apellM.trimStart().trimEnd(),
          fecha_nacimiento: date,
          genero: this.formularioPersona.value.genero,
          correo: this.formularioPersona.value.correo.trimStart().trimEnd(),
          contrasena: this.formularioPersona.value.contas,
          telefono: this.formularioPersona.value.telefo
        }).subscribe(
          response => {
            this.alerta.showAlert("Datos guardados", "success", 2000)
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

    if(this.img != null){
      this.persona.updatePicture(this.token.getIdPerson(), {
        foto: this.img
      }).subscribe(response => {
        //this.alerta.showAlert("Imagen capturada", "success", 2000);
      }, reject => {
        this.alerta.showAlert("Imagen no capturada", "success", 2000);
      });
    }
  }

  saveDirection(){
    const API_ADDRESS = this.enlaces.API_ENLACE_PERSONAS + this.enlaces.PERSONA_UPDATE_ADRES + this.token.getIdPerson() + this.enlaces.PERSONA_UPDATE_ADRES_2+this.indexToSaved;
    if(this.formularioDirection.value.munici != null){
      this.persona.getPerson(this.token.getID()).subscribe(response => {
        console.log(response.data.idPersona.direccion[this.indexToSaved].id)
        const ni = (this.formularioDirection.value.ninter == null || this.formularioDirection.value.ninter == "") ? -1 : this.formularioDirection.value.ninter; 
        this.persona.updateClientDirection(API_ADDRESS, {
          idDireccion: response.data.idPersona.direccion[this.indexToSaved].id,
          calle: this.formularioDirection.value.fcalle.trimStart().trimEnd(),
          colonia: this.formularioDirection.value.fcolon.trimStart().trimEnd(),
          municipio: this.formularioDirection.value.munici.trimStart().trimEnd(),
          estado: this.formularioDirection.value.estado,
          cp: this.formularioDirection.value.codPos,
          n_interior: ni,
          n_exterior: this.formularioDirection.value.nexter,
          referencia: this.formularioDirection.value.refere
        }).subscribe(response => {
          this.alerta.showAlert(`Dirección ${this.indexToSaved+1} modificada`, "success", 2000);
        }, error => {
          console.log(error);
          this.alerta.showAlert("Ocurrió un error", "danger", 2000);
        });
      })
    }else{
      this.alerta.showAlert("Primero llene los campos", "warning", 2000)
    }
  }

  clearDirection() {
    const API_ADDRESS = this.enlaces.API_ENLACE_PERSONAS + this.enlaces.PERSONA_UPDATE_ADRES + this.token.getIdPerson() + this.enlaces.PERSONA_UPDATE_ADRES_2 + this.indexToSaved;
    console.log("Direccion a guardar: ", this.directionToSaved);
    
    this.persona.getPerson(this.token.getID()).subscribe(response => {
      console.log(response.data.idPersona.direccion[this.indexToSaved].id)
      this.persona.updateClientDirection(API_ADDRESS, {

        idDireccion: response.data.idPersona.direccion[this.indexToSaved].id,
        calle: "",
        colonia: "",
        municipio: "",
        estado: "",
        cp: "-1",
        n_interior: "-1",
        n_exterior: "-1",
        referencia: ""
      }).subscribe(response => {
        this.formularioDirection.patchValue({    
          fcalle: [null],
          fcolon: [null],
          munici: [null],
          estado: [null],
          codPos: [null],
          ninter: [null],
          nexter: [null],
          refere: [null],
        });
        this.alerta.showAlert(`Dirección ${this.indexToSaved + 1} eliminada`, "success", 2000);
      }, error => {
        console.log(error);
        this.alerta.showAlert("Ocurrió un error", "danger", 2000);
      });
    })
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
      
      const cp =     (response.data.idPersona.direccion[id].cp === -1) ? null : response.data.idPersona.direccion[id].cp ;
      const ninter = (response.data.idPersona.direccion[id].n_interior === -1) ? null : response.data.idPersona.direccion[id].n_interior ;
      const nexter = (response.data.idPersona.direccion[id].n_exterior === -1) ? null : response.data.idPersona.direccion[id].n_exterior ;
      this.indexToSaved = id;

      if (response.data.idPersona.direccion[id].estado == null || response.data.idPersona.direccion[id].estado == "") {
        this.formularioDirection.patchValue({
          fcalle: [null],
          fcolon: [null],
          munici: [null],
          estado: [null],
          codPos: [null],
          ninter: [null],
          nexter: [null],
          refere: [null],
        });
        this.alerta.showAlert("Esta direccion no contiene datos", "warning", 2000);
      }else{
        this.directionToSaved = response.data.idPersona.direccion[id]
        this.formularioDirection.patchValue({
          fcalle: [response.data.idPersona.direccion[id].calle],
          fcolon: [response.data.idPersona.direccion[id].colonia],
          munici: [response.data.idPersona.direccion[id].municipio],
          estado: [response.data.idPersona.direccion[id].estado],
          codPos: [cp],
          ninter: [ninter],
          nexter: [nexter],
          refere: [response.data.idPersona.direccion[id].referencia],
        });  
      }
    });
  }

  public saveCard(){
    const API_TARJETA = this.enlaces.API_ENLACE_PERSONAS+this.enlaces.PERSONA_UPDATE_CARDS+this.token.getIdPerson()+this.enlaces.PERSONA_UPDATE_ADRES_2+this.indexToSavedTarjet;
    let parseDate: any; 
    if(this.formularioCards.value.fvenci != null){
      console.log("Recibe fecha",this.formularioCards.value.fvenci);
      parseDate = this.formularioCards.value.fvenci;
      parseDate = parseDate.replace("/", "-");
      console.log(parseDate);
      this.persona.getPerson(this.token.getID()).subscribe(response => {
        this.persona.updateClientTarget(API_TARJETA, {
          idTarjeta: response.data.idPersona.tarjeta[this.indexToSavedTarjet].id,
          nombre_propietario: this.formularioCards.value.namePr,
          numero_tarjeta: this.formularioCards.value.numbeT,
          fecha_vencimiento: this.formularioCards.value.fvenci,
          cvv: this.formularioCards.value.cvvTar
        }).subscribe(response => {
          this.alerta.showAlert("tarjeta registrada", "success", 2500);
        }, reject => {
          console.log(reject)
          this.alerta.showAlert("Ocurrio un pobema", "danger", 2500);
        });
      });
    }else{
      this.alerta.showAlert("Seleccione una fecha", "warning", 2500);
    }
  }
  public clearCard() {
    const API_TARJETA = this.enlaces.API_ENLACE_PERSONAS + this.enlaces.PERSONA_UPDATE_CARDS + this.token.getIdPerson() + this.enlaces.PERSONA_UPDATE_ADRES_2 + this.indexToSavedTarjet;
    let parseDate: any;
    this.persona.getPerson(this.token.getID()).subscribe(response => {
      this.persona.updateClientTarget(API_TARJETA, {
        idTarjeta: response.data.idPersona.tarjeta[this.indexToSavedTarjet].id,
        nombre_propietario: null,
        numero_tarjeta: null,
        fecha_vencimiento: "0000-00",
        cvv: "-1"
      }).subscribe(response => {
        this.formularioCards.patchValue({    
          namePr: [null],
          numbeT: [null],
          cvvTar: [null],
          fvenci: [null]
        });
        this.alerta.showAlert("tarjeta eliminada", "success", 2500);
      }, reject => {
        console.log(reject)
        this.alerta.showAlert("Ocurrio un pobema", "danger", 2500);
      });
    });
  }

  //? Identifica el boton y rellena el formulario con la informacion de direccion
  tarjetActivedButton(id: number) {
    let parseData: any; 
    this.indexToSavedTarjet = id; 

    this.activeTarjet.forEach((element: any, index: number) => {
      this.activeTarjet[index] = false;
    });
    this.activeTarjet[id] = true;

    this.persona.getPerson(this.token.getID()).subscribe(response => {
      if(response.data.idPersona.tarjeta[id].fecha_vencimiento == null || response.data.idPersona.tarjeta[id].fecha_vencimiento == ""){
        this.formularioCards.patchValue({
          namePr: [null],
          numbeT: [null],
          cvvTar: [null],
          fvenci: [null]
        });
        this.alerta.showAlert("Esta tarjeta no contiene datos", "warning", 2000);
      }else{
        if(response.data.idPersona.tarjeta[id].fecha_vencimiento != null){
          parseData = response.data.idPersona.tarjeta[id].fecha_vencimiento;
        }
        this.tarjetToSaved = response.data.idPersona.tarjeta[id].id;
        this.formularioCards.patchValue({
          namePr: [response.data.idPersona.tarjeta[id].nombre_propietario],
          numbeT: [response.data.idPersona.tarjeta[id].numero],
          cvvTar: [this.cvvTar],
          fvenci: [parseData]
        });  
      }
    });
  }

  public capturarArchivo(event: any): any {
    this.img = null; 
    const archivoCapturado = event.target.files[0];
    this.fileChange = true;
    this.extraerB64(archivoCapturado).then((imagen: any) => {
      this.preView = imagen.base;
      this.img = imagen.base.split(',')[1];
    })
  }

  extraerB64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        })
      }

    } catch (ex) {
      console.log(ex);
    }
  })
}