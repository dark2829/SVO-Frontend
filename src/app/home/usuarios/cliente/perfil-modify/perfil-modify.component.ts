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

  //* Variables para carga automatica en cliente
  enviarDatos = false; 
  cancelar = false; 
  informacionCliente = {
    nombre: null, 
    apaterno: null, 
    amaterno: "", 
    fnacimiento: "", 
    genero: "M", 
    correo: null, 
    password: null, 
    telefono: "", 
    calle: "", 
    colonia: "", 
    municipio: "", 
    estado: "", 
    cp: "", 
    interior: "", 
    exterior: "", 
    referencia: "", 
    propietario: "", 
    tarjetanumero: "",
    vencimiento: "", 
    cvv: ""  
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
    this.index = 16;

    this.formPersonModify = this.formBuilder.group({
      fpersonName:      [this.informacionCliente.nombre, [Validators.required]],
      fpersonFname:     [this.informacionCliente.apaterno, [Validators.required]],
      fpersonLname:     [null],
      fpersonBdate:     [null],
      fpersonGender:    [null],
      // Datos de contacto
      fpersonCorreo:    [this.informacionCliente.correo, [Validators.required, Validators.email]],
      fpersonPassw:     [this.informacionCliente.password, [Validators.required, Validators.maxLength(8)]],
      fpersonPhone:     [null, [Validators.minLength(10), Validators.maxLength(10)]],
      // Datos de direccion
      formCalle:        [null],
      formColonia:      [null],
      formMunicipio:    [null],
      formEstado:       [null],
      formCp:           [null],
      formInterior:     [null],
      formExterior:     [null],
      formReferencia:   [null],
      // Datos tarjeta
      formPropietario:  [null],
      formTarjetanumero:[null],
      formVencimiento:  [null],
      formCvv:          [null]
    })
  }
  
  public updatePerson() {
    const API_MODIFY_PERSON = this.enlaces.API_ENLACE_PERSONAS+this.enlaces.PERSONA_UPDATE_P+this.index+this.enlaces.PERSONA_UPDATE_U+"16";

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
    console.log(
      this.formPersonModify.value.fpersonName != null &&
          this.formPersonModify.value.fpersonFname != null &&
          this.formPersonModify.value.fpersonCorreo != null &&
          this.formPersonModify.value.fpersonPassw != null &&
          this.formPersonModify.value.fpersonName != "" &&
          this.formPersonModify.value.fpersonFname != "" &&
          this.formPersonModify.value.fpersonCorreo != "" &&
          this.formPersonModify.value.fpersonPassw != ""
    );
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