import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { EnlacesService } from '../../../../services/enlaces.service';
import { TokenService } from '../../../../services/token.service';

@Component({
  selector: 'app-empleado-modify',
  templateUrl: './empleado-modify.component.html',
  styleUrls: ['./empleado-modify.component.css']
})
export class EmpleadoModifyComponent implements OnInit {
  
  formEmpleado: FormGroup; 
  @ViewChild('alerta') alerta: ElementRef;
  index: string; 

  nEmpleado: string; 
  pNombre: string; 
  aPaterno: string; 
  aMaterno: string; 
  curp: string; 
  bdate: string; 
  gender: string; 
  telefono: string; 
  puesto: string; 
  salario: string; 
  correo: string; 
  pass: string; 
  estatus: string; 

  constructor(
    private empleado: EmpleadosService, 
    private formBuilder: FormBuilder, 
    private router: Router, 
    private enlaces: EnlacesService,
    private token: TokenService, 
    private route: ActivatedRoute //? Pasar info en liga
  ) { }

  ngOnInit(): void {
    if(this.token.getToken()){
      this.index = this.route.snapshot.params['id'].toString();
      
      this.empleado.getAllEmpleadosByID(this.index).subscribe(response => {
        console.log(response);
        this.nEmpleado  = response.data.no_empleado,
        this.pNombre    = response.data.idPersona.nombre,
        this.aPaterno   = response.data.idPersona.apellido_paterno,
        this.aMaterno   = response.data.idPersona.apellido_materno,
        this.curp       = response.data.curp,
        this.bdate      = response.data.idPerson.fecha_nac,
        this.gender     = 'F'/* response.data.idPersona.genero */,
        this.telefono   = response.data.idPersona.telefono,
        this.puesto     = response.data.idPuesto.id,
        this.salario    = response.data.salario,
        this.correo     = response.data.idPerson.correo,
        this.pass       = "",
        this.estatus    = response.data.estatus

        this.formEmpleado = this.formBuilder.group({
          fNombre:     [], 
          fApellidoP:  [], 
          fApellidoM:  [], 
          fCurp:       [], 
          fBdate:      [], 
          fGender:     ['F', []], 
          fTelefono:   [], 
          fPuesto:     [], 
          fSalario:    [], 
          fCorreo:     [],
          fPass:       [], 
          fEstatus:    []
        });
      })
    }
  }

}
