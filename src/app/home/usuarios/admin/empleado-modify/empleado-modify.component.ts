import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { EnlacesService } from '../../../../services/enlaces.service';
import { TokenService } from '../../../../services/token.service';
import { PersonasService } from '../../../../services/personas.service';
import { AlertaService } from '../../../../services/alerta.service';

@Component({
  selector: 'app-empleado-modify',
  templateUrl: './empleado-modify.component.html',
  styleUrls: ['./empleado-modify.component.css']
})
export class EmpleadoModifyComponent implements OnInit {
  
  formEmpleado: FormGroup; 
  index: string; 

  puestoJson: any = {
    Cajero: 1,
    Almacenador: 2,
    Repartidor: 3,
  }

  estatusJson: any = {
    Activo: 1,
    Inactivo: 2,
  }
  
  Bdate: any; 
  idPersona: any; 
  idEmpleado: any; 
  idUser: any; 

  nEmpleado: string; 
  eNombre: string; 
  aPaterno: string; 
  aMaterno: string; 
  eCurp: string; 
  fNacimiento: string;   
  eGender: string; 
  eTelefono: string; 
  ePuesto: string; 
  eSalario: string; 
  eCorreo: string; 
  ePass: string; 
  eStatus: string; 

  constructor(
    private empleado: EmpleadosService, 
    private persona: PersonasService, 
    private formBuilder: FormBuilder, 
    private router: Router, 
    private enlaces: EnlacesService,
    private token: TokenService, 
    private route: ActivatedRoute, //? Pasar info en liga
    private alerta: AlertaService
  ) { }

  ngOnInit(): void {
    if(this.token.getToken()){
      this.index = this.route.snapshot.params['id'].toString();

      this.formEmpleado = this.formBuilder.group({
        fEmpleado:   [null, [Validators.required]], 
        fNombre:     [null ,[Validators.required]],
        fApellidoP:  [null, [Validators.required]],
        fApellidoM:  [null, [Validators.required]],
        fCurp:       [null, [Validators.required]],
        fFnac:       [null, [Validators.required]],
        fGenero:     [null ,[Validators.required]],
        fTelefono:   [null, [Validators.required]],
        fPuesto:     [null, [Validators.required]],
        fSalario:    [null, [Validators.required]],
        fCorreo:     [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]{2,10}\.[a-z]{2,4}$")]],
        fContra:     [null, [Validators.required, Validators.minLength(5)]],
        fStatus:     ['',   [Validators.required]]
      });
      
      this.empleado.getAllEmpleadosByID(this.index).subscribe(response => {
        //? Obtener index de cada elemento
        this.idPersona = response.data.idPersona.id;
        this.idUser = response.data.id; 
        this.idEmpleado = response.data.idEmpleado.id; 

        this.nEmpleado = response.data.idEmpleado.no_empleado; 
        this.eNombre   = response.data.idPersona.nombre; 
        this.aPaterno  = response.data.idPersona.apellido_paterno; 
        this.aMaterno  = response.data.idPersona.apellido_materno; 
        this.eCurp     = response.data.idEmpleado.curp; 
        this.Bdate = response.data.idPersona.fecha_nac; 
        this.Bdate = this.Bdate.split("-");
        this.Bdate = this.Bdate[2]+"-"+this.Bdate[1]+"-"+this.Bdate[0];
        this.fNacimiento      = this.Bdate;
        this.eGender   = response.data.idPersona.genero;
        this.eTelefono = response.data.idPersona.telefono;
        this.ePuesto   = response.data.idEmpleado.idPuesto.nombre_puesto;
        this.eSalario  = response.data.idEmpleado.salario;
        this.eCorreo   = response.data.idPersona.correo; 
        this.ePass     = ""
        this.eStatus   = response.data.idEmpleado.estatus;

          this.formEmpleado.patchValue({
            fEmpleado:   this.nEmpleado, 
            fNombre:     this.eNombre,
            fApellidoP:  this.aPaterno,
            fApellidoM:  this.aMaterno,
            fCurp:       this.eCurp,
            fFnac:       this.fNacimiento,
            fGenero:     this.eGender ,
            fTelefono:   this.eTelefono,
            fPuesto:     this.ePuesto,
            fSalario:    this.eSalario,
            fCorreo:     this.eCorreo,
            fContra:     null,
            fStatus:     this.eStatus
          });
      })
    }
  }

  enviar(){
    //URL para modificar una persona aplicable a empleado
    const API_MODIFY_EMPLEADO = this.enlaces.API_ENLACE_PERSONAS+this.enlaces.PERSONA_UPDATE_P+this.idPersona+this.enlaces.PERSONA_UPDATE_U+this.idUser; 
      if(
        this.formEmpleado.value.fEmpleado != null &&
        this.formEmpleado.value.fNombre != null &&
        this.formEmpleado.value.fApellidoP != null &&
        this.formEmpleado.value.fApellidoM != null &&
        this.formEmpleado.value.fCurp != null &&
        this.formEmpleado.value.fFnac != null &&
        this.formEmpleado.value.fGenero != null &&
        this.formEmpleado.value.fTelefono != null &&
        this.formEmpleado.value.fPuesto != null &&
        this.formEmpleado.value.fSalario != null &&
        this.formEmpleado.value.fCorreo != null &&
        this.formEmpleado.value.fContra != null &&
        this.formEmpleado.value.fStatus != null &&
        this.formEmpleado.value.fContra.length >= 5
      ){
        //? Modificar formato de fecha
        let date = this.formEmpleado.value.fFnac;
        if(date != null){      
          date = date.split("-");
          date = date[2]+"/"+date[1]+"/"+date[0];      
        }else{
          date = null; 
        }
        this.empleado.updateEmpleadoDataPerson(API_MODIFY_EMPLEADO, {
          nombre: this.formEmpleado.value.fNombre,
          apellido_paterno: this.formEmpleado.value.fApellidoP,
          apellido_materno: this.formEmpleado.value.fApellidoM,
          fecha_nacimiento: date,
          genero: this.formEmpleado.value.fGender,
          correo: this.formEmpleado.value.fCorreo,
          contrasena: this.formEmpleado.value.fContra,
          telefono: this.formEmpleado.value.fTelefono,
          curp: this.formEmpleado.value.fCurp,
          idPuesto: this.puestoJson[this.formEmpleado.value.fPuesto],
          salario: this.formEmpleado.value.fSalario,
          estatus: this.formEmpleado.value.fStatus
        }).subscribe(response => {
          this.alerta.showAlert("Información actualizada", "success", 2000);
          setTimeout(() => {this.listaEmpleado()}, 2500);
        }, reject => {
          this.alerta.showAlert(reject.error.message, "danger", 2000, reject.status);
        });

      }else{
        this.alerta.showAlert("Error al guardar datos, inténtelo de nuevo", "danger", 2000);
      }

  }

  public cancelar(){
    this.alerta.showAlert("Cancelado", "secondary", 2000);
    setTimeout(() => {this.listaEmpleado()} , 2500);
  }

  public listaEmpleado(){
    this.router.navigate(['empleados']);
  }
}
