import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EnlacesService } from '../../../../services/enlaces.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonasService } from 'src/app/services/personas.service';

@Component({
  selector: 'app-perfil-modify',
  templateUrl: './perfil-modify.component.html',
  styleUrls: ['./perfil-modify.component.css']
})
export class PerfilModifyComponent implements OnInit {
  //* Salida
  //* Entrada
  @ViewChild('alerta') alerta: ElementRef;

  //* Variables
  //? Variables de formulario
  formPersonModify: FormGroup; //controlsFormGroup
  radioExample: FormControl = new FormControl(); //radioExample

  //? Variables de carga
  //* Varaibles de busqueda 
  index: number; 
  idClient: number; 

  //* Variables para carga automatica en cliente
  enviarDatos = false; 
  cancelar = false; 
  informacionCliente = {
    nombre: null, 
    apaterno: null, 
    amaterno: null, 
    fnacimiento: null, 
    genero: null, 
    correo: null, 
    password: null, 
    telefono: null, 
    calle: null, 
    colonia: null, 
    municipio: null, 
    estado: null, 
    cp: null, 
    interior: null, 
    exterior: null, 
    referencia: null, 
    propietario: null, 
    tarjetanumero: null,
    vencimiento: null, 
    cvv: null  
  }  
  
  //* Constructores
  constructor(
    private router: Router,    
    private enlaces: EnlacesService, 
    private formBuilder: FormBuilder, 
    private persona: PersonasService
  ) { }

  ngOnInit(): void {
    //Se necesita recuperar indice con un metodo desde el back
    this.index = 6;
    this.idClient = 1;
  
    //? Preecargar datos
    this.persona.getClientInfo(this.index.toString()).subscribe(response => {
        this.informacionCliente.nombre = response.idPersona.nombre;
        this.informacionCliente.apaterno = response.idPersona.apellido_paterno;
        this.informacionCliente.amaterno = response.idPersona.apellido_materno;
        this.informacionCliente.fnacimiento = response.idPersonafecha_nac;
        this.informacionCliente.genero = response.idPersona.genero;

        this.informacionCliente.correo = response.correo;
        this.informacionCliente.password = response.contraseña;
        this.informacionCliente.telefono= response.idPersona.telefono;

        this.informacionCliente.calle = response.idPersona.direccion[0].calle;
        this.informacionCliente.colonia = response.idPersona.direccion[0].colonia;
        this.informacionCliente.municipio = response.idPersona.direccion[0].municipio;
        this.informacionCliente.estado = response.idPersona.direccion[0].estado;
        this.informacionCliente.cp = response.idPersona.direccion[0].cp;
        this.informacionCliente.exterior = response.idPersona.direccion[0].n_exterior;
        this.informacionCliente.interior = response.idPersona.direccion[0].n_interior;
        this.informacionCliente.referencia = response.idPersona.direccion[0].referencia;

        this.informacionCliente.propietario = response.idPersona.tarjeta[0].nombre_propietario;
        this.informacionCliente.tarjetanumero = response.idPersona.tarjeta[0].numero;
        this.informacionCliente.vencimiento = response.idPersona.tarjeta[0].fecha_vencimiento;
        this.informacionCliente.cvv = response.idPersona.tarjeta[0].cvv;
    });
    
    this.formPersonModify = this.formBuilder.group({
      fpersonName:      [this.informacionCliente.nombre, [Validators.required]],
      fpersonFname:     [this.informacionCliente.apaterno, [Validators.required]],
      fpersonLname:     [this.informacionCliente.amaterno],
      fpersonBdate:     [this.informacionCliente.fnacimiento],
      fpersonGender:    [this.informacionCliente.genero],
      // Datos de contacto
      fpersonCorreo:    [this.informacionCliente.correo, [Validators.required, Validators.email]],
      fpersonPassw:     [this.informacionCliente.password, [Validators.required, Validators.maxLength(8)]],
      fpersonPhone:     [this.informacionCliente.telefono, [Validators.minLength(10), Validators.maxLength(10)]],
      // Datos de direccion
      formCalle:        [this.informacionCliente.calle],
      formColonia:      [this.informacionCliente.colonia],
      formMunicipio:    [this.informacionCliente.municipio],
      formEstado:       [this.informacionCliente.estado],
      formCp:           [this.informacionCliente.cp],
      formInterior:     [this.informacionCliente.exterior],
      formExterior:     [this.informacionCliente.interior],
      formReferencia:   [this.informacionCliente.referencia],
      // Datos tarjeta
      formPropietario:  [this.informacionCliente.propietario],
      formTarjetanumero:[this.informacionCliente.tarjetanumero],
      formVencimiento:  [this.informacionCliente.vencimiento],
      formCvv:          [this.informacionCliente.cvv]
    });
  }
  
  public updatePerson() {
    const API_MODIFY_PERSON = this.enlaces.API_ENLACE_PERSONAS+this.enlaces.PERSONA_UPDATE_P+this.index+this.enlaces.PERSONA_UPDATE_U+this.idClient;

    // Formatear Fecha
    let date = this.formPersonModify.value.fpersonBdate;
    if(date != null){
      date = date.split("-");
      date = date[2]+"/"+date[1]+"/"+date[0];
      console.log(`${date}`);
    }else{
      date = null; 
    }

    if(this.enviarDatos){
      try{
        if(
          this.formPersonModify.value.fpersonName != null &&
          this.formPersonModify.value.fpersonFname != null &&
          this.formPersonModify.value.fpersonCorreo != null &&
          this.formPersonModify.value.fpersonPassw != null &&
          this.formPersonModify.value.fpersonName != "" &&
          this.formPersonModify.value.fpersonFname != "" &&
          this.formPersonModify.value.fpersonCorreo != "" &&
          this.formPersonModify.value.fpersonPassw != ""
        ){
          this.persona.updateClientDataPerson(API_MODIFY_PERSON,
            {
              nombre: this.formPersonModify.value.fpersonName,
              apellido_paterno: this.formPersonModify.value.fpersonFname,
              apellido_materno: this.formPersonModify.value.fpersonLname,
              fecha_nacimiento: date,
              genero: this.formPersonModify.value.fpersonGender,
              correo: this.formPersonModify.value.fpersonCorreo,
              contrasena: this.formPersonModify.value.fpersonPassw,
              telefono: this.formPersonModify.value.fpersonPhone,
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
              case 404: 
                this.errores("El servidor no pudo encontrar el servicio solicitado", "warning");
              break; 
              case 500: 
                this.errores("Error en el servidor", "danger");
              break; 
            }
            console.log("reject"+error.status);
          }
          );
        }else{
          this.errores("Debe modificar mimo los datos marcados", "warning");
        }
      }catch(error){
        console.log(error);
      }
    }

    /* if (this.informacion) {
      try {
        if (
          this.formPersonModify.value.fpersonName != null &&
          this.formPersonModify.value.fpersonFname != null &&
          this.formPersonModify.value.fpersonCorreo != null &&
          this.formPersonModify.value.fpersonPassw != null &&
          this.formPersonModify.value.fpersonName != "" &&
          this.formPersonModify.value.fpersonFname != "" &&
          this.formPersonModify.value.fpersonCorreo != "" &&
          this.formPersonModify.value.fpersonPassw != "" 
        ) {
          this.persona.updateClient(`${this.enlaces.API_ENLACE_PERSONAS}${this.enlaces.PERSONA_UPDATE}?id=${this.index}`,
            {
              nombre: this.formPersonModify.value.fpersonName,
              apellido_paterno: this.formPersonModify.value.fpersonFname,
              apellido_materno: this.formPersonModify.value.fpersonLname,
              fecha_nacimiento: this.formPersonModify.value.fpersonBdate,
              genero: this.formPersonModify.value.fpersonGender,
              correo: this.formPersonModify.value.fpersonCorreo,
              contrasena: this.formPersonModify.value.fpersonPassw,
              telefono: this.formPersonModify.value.fpersonPhone,
              idDireccion: 1,
              calle: this.formPersonModify.value.formCalle,
              colonia: this.formPersonModify.value.formColonia,
              municipio: this.formPersonModify.value.formMunicipio,
              estado: this.formPersonModify.value.formEstado,
              cp: this.formPersonModify.value.formCp,
              n_interio: this.formPersonModify.value.formInterior,
              n_exterior: this.formPersonModify.value.formExterior,
              referencia: this.formPersonModify.value.formReferencia,
              idTarjet: 1,
              nombre_propietario: this.formPersonModify.value.formPropietario,
              numero_tarjeta: this.formPersonModify.value.formTarjetanumero,
              fecha_vencimiento: this.formPersonModify.value.formVencimiento,
              cvv: this.formPersonModify.value.formCvv
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
              case 404: 
                this.errores("El servidor no pudo encontrar el servicio solicitado", "warning");
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

    } */
  }

  public enviar(){
    this.enviarDatos = true; 
    this.cancelar = false; 
    this.updatePerson();
  } 

  public cancel(){
    this.cancelar = true; 
    this.enviarDatos = false; 
    this.persona.getClientInfo("16").subscribe(response => {
      console.log(response)
    });
    // this.information("Cancelado", "danger");
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
  
  //* Métodos get
  //* Métodos post
  //* Métodos update
  //* Métodos delete

  public clearTarjeta() {
    this.informacionCliente.propietario = null;
    this.informacionCliente.tarjetanumero = null;
    this.informacionCliente.vencimiento = null;
    this.informacionCliente.cvv = null;
  }

  public clearDireccion() {
    this.informacionCliente.calle = null;
    this.informacionCliente.colonia = null;
    this.informacionCliente.municipio = null;
    this.informacionCliente.estado = null;
    this.informacionCliente.cp = null;
    this.informacionCliente.exterior = null;
    this.informacionCliente.interior = null;
    this.informacionCliente.referencia = null;
  }

}


/* Informacino completa

nombre: this.formPersonModify.value.fpersonName,
              apellido_paterno: this.formPersonModify.value.fpersonFname,
              apellido_materno: this.formPersonModify.value.fpersonLname,
              fecha_nacimiento: this.formPersonModify.value.fpersonBdate,
              genero: this.formPersonModify.value.fpersonGender,
              correo: this.formPersonModify.value.fpersonCorreo,
              contrasena: this.formPersonModify.value.fpersonPassw,
              telefono: this.formPersonModify.value.fpersonPhone,
              /* idDireccion: 1,
              calle: this.formPersonModify.value.formCalle,
              colonia: this.formPersonModify.value.formColonia,
              municipio: this.formPersonModify.value.formMunicipio,
              estado: this.formPersonModify.value.formEstado,
              cp: this.formPersonModify.value.formCp,
              n_interio: this.formPersonModify.value.formInterior,
              n_exterior: this.formPersonModify.value.formExterior,
              referencia: this.formPersonModify.value.formReferencia,
              idTarjeta: 1,
              nombre_propietario: this.formPersonModify.value.formPropietario,
              numero_tarjeta: this.formPersonModify.value.formTarjetanumero,
              fecha_vencimiento: this.formPersonModify.value.formVencimiento,
              cvv: this.formPersonModify.value.formCvv */