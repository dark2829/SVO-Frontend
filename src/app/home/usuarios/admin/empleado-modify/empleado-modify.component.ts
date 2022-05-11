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

      this.empleado.getAllEmpleadosByID(this.index).subscribe(response => {
        this.idPersona = response.data.idPersona.id;
        this.idEmpleado = response.data.id; 
        //FIXME: Falta agregar el id de usuario
        this.idUser = 0; 


        this.nEmpleado = response.data.no_empleado; 
        this.eNombre   = response.data.idPersona.nombre; 
        this.aPaterno  = response.data.idPersona.apellido_paterno; 
        this.aMaterno  = response.data.idPersona.apellido_materno; 
        this.eCurp     = response.data.curp; 
        this.Bdate = response.data.idPersona.fecha_nac; 
        this.Bdate = this.Bdate.split("-");
        this.Bdate = this.Bdate[2]+"-"+this.Bdate[1]+"-"+this.Bdate[0];
        this.fNacimiento      = this.Bdate;
        this.eGender   = response.data.idPersona.genero;
        this.eTelefono = response.data.idPersona.telefono;
        this.ePuesto   = response.data.idPuesto.nombre_puesto;
        this.eSalario  = response.data.salario;
        this.eCorreo   = response.data.idPersona.correo; 
        this.ePass     = ""
        this.eStatus   = response.data.estatus;

          this.formEmpleado = this.formBuilder.group({
            fEmpleado:   [response.data.no_empleado, [Validators.required]], 
            fNombre:     [response.data.idPersona.nombre,[Validators.required]],
            fApellidoP:  [response.data.idPersona.apellido_paterno, [Validators.required]],
            fApellidoM:  [response.data.idPersona.apellido_materno, [Validators.required]],
            fCurp:       [response.data.curp, [Validators.required]],
            fFnac:       [this.fNacimiento, [Validators.required]],
            fGenero:     [response.data.idPersona.genero, [Validators.required]],
            fTelefono:   [response.data.idPersona.telefono, [Validators.required]],
            fPuesto:     [response.data.idPuesto.nombre_puesto, [Validators.required]],
            fSalario:    [response.data.salario, [Validators.required]],
            fCorreo:     [response.data.idPersona.correo, [Validators.required, Validators.email]],
            fContra:     [null, [Validators.required]],
            fStatus:     [response.data.estatus, [Validators.required]]
          });
      })
    }
  }

  enviar(){
    //URL para modificar una persona aplicable a empleado
    const API_MODIFY_EMPLEADO = this.enlaces.API_ENLACE_PERSONAS+this.enlaces.PERSONA_UPDATE_P+this.enlaces.PERSONA_UPDATE_U+this.idUser; 

    try{
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
        this.formEmpleado.value.fEmpleado != "" &&
        this.formEmpleado.value.fNombre != "" &&
        this.formEmpleado.value.fApellidoP != "" &&
        this.formEmpleado.value.fApellidoM != "" &&
        this.formEmpleado.value.fCurp != "" &&
        this.formEmpleado.value.fFnac != "" &&
        this.formEmpleado.value.fGenero != "" &&
        this.formEmpleado.value.fTelefono != "" &&
        this.formEmpleado.value.fPuesto != "" &&
        this.formEmpleado.value.fSalario != "" &&
        this.formEmpleado.value.fCorreo != "" &&
        this.formEmpleado.value.fContra != "" &&
        this.formEmpleado.value.fStatus != ""
      ){
        //? Modificar formato de fecha
        let date = this.formEmpleado.value.fFnac;
        if(date != null){      
          date = date.split("-");
          date = date[2]+"/"+date[1]+"/"+date[0];      
          console.log(date);
        }else{
          date = null; 
        }
        //FIXME: Falta modificar informacion para agregar todo lo del empleado
        this.persona.updateClientDataPerson(API_MODIFY_EMPLEADO, {
          nombre: "string",
          apellido_paterno: "string",
          apellido_materno: "string",
          fecha_nacimiento: "string",
          genero: "string",
          correo: "string",
          contrasena: "string",
          telefono: "string",
        }).subscribe(response => {
          this.alerta.showAlert("response.message", "success", 2000);
          this.router.navigate(["empleados"]);
        }, reject => {
          this.alerta.showAlert(reject.error.message, "danger", 2000, reject.status);
        });

      }else{
        this.alerta.showAlert("Todos los campos son requeridos", "danger", 2000);
      }

    }catch(error){

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
