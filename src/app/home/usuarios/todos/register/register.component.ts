import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonasService } from 'src/app/services/personas.service';
import { catchError } from 'rxjs';
import { EnlacesService } from '../../../../services/enlaces.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //* Salida
  //* Entrada
  @ViewChild('alerta') alertaHtml: ElementRef;

  //* Variables
  formPersona: FormGroup; 

  //* Constructores
  constructor(
    private router:Router, 
    private client: PersonasService, 
    private formBuilder: FormBuilder, 
    private enlace: EnlacesService, 
    private persona: PersonasService
  ) { }

  ngOnInit(): void {
    this.formPersona = this.formBuilder.group({
      persoFname: [null, [Validators.required]],
      persoSname: [null, [Validators.required]],
      persoEmail: [null, [Validators.required, Validators.email]],
      persoPassw: [null, [Validators.required, Validators.maxLength(8)]]
    });
  }

  //* Métodos get
  //* Métodos post

  //* Métodos update
  //* Métodos delete
  public insertClient(){
    const API_PERSONA = `${this.enlace.API_ENLACE_PERSONAS}${this.enlace.PERSONA_INSERT}`;

    let camposValidos = (
      this.formPersona.value.persoFname != null &&
      this.formPersona.value.persoFname != ""   &&
      this.formPersona.value.persoSname != null &&
      this.formPersona.value.persoSname != ""   &&
      this.formPersona.value.persoEmail != null &&
      this.formPersona.value.persoEmail != ""   &&
      this.formPersona.value.persoPassw != null &&
      this.formPersona.value.persoPassw != ""
    );

    if(camposValidos){
      try{
        //Intentar mandar datos sin catch error
        /* this.client.insertClient(API_PERSONA, {
          nombre: this.formPersona.value.persoFname.toString().trim(),
          apellido_paterno: this.formPersona.value.persoSname.toString().trim(),
          correo: this.formPersona.value.persoEmail.toString().trim(),
          contrasena: this.formPersona.value.persoPassw.toString(),
          idRol: 3
        }).subscribe(
          respuesta => console.log(respuesta), 
          error => console.log(error)); */
        this.client.insertClient(API_PERSONA, {
          nombre: this.formPersona.value.persoFname.toString().trim(),
          apellido_paterno: this.formPersona.value.persoSname.toString().trim(),
          correo: this.formPersona.value.persoEmail.toString().trim(),
          contrasena: this.formPersona.value.persoPassw.toString(),
          idRol: 3
        }).subscribe(
          respuesta => {
            this.alertChange("Registro exitoso", "success")
          }, 
          error => {
            switch(error.status){
              case 0:
                this.alertInfo("Error de conexión", "danger");
              break;
              case 400: 
                this.alertInfo("El correo ya está registrado", "warning");
              break; 
              case 500: 
                this.alertInfo("Error en el servidor", "danger");
              break; 
            }
            console.log("reject"+error.status);
          }
          );
      }catch(error){
        console.log(error);
      }
    }else{
      this.alertInfo("Todos los campos son obligatorios", "warning");
    }
  }

  public enviar(){
    this.insertClient();
  }

  //* Métodos navegación
  login(){
    this.router.navigate(['login']);
  }

  home(){
    this.router.navigate(['']);
  }

  //* Métodos 
  public alertChange(texto: string, tipo: string) {
    const alertas: any = this.alertaHtml.nativeElement;
    alertas.innerHTML = `
                          <div 
                          class="alert alert-${tipo} alert-dismissible" 
                          style=
                            "
                            position: fixed; top:25vh; right:0%;
                              
                            ">
                          <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                          <strong>¡${texto}!</strong>
                          </div>
    `;
    // TODO: cambiar a la pagina de inicio, pero antes se debe recuperar el id para saber que usuario es
    // setTimeout(() => { this.home() }, 1000);
  }

  public alertInfo(texto: string, tipo: string) {
    const alertas: any = this.alertaHtml.nativeElement;
    alertas.innerHTML = `
                          <div 
                          class="alert alert-${tipo} alert-dismissible" 
                          style=
                            "
                            position: fixed; top:25vh; right:0%;
                              
                            ">
                          <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                          <strong>¡${texto}!</strong>
                          </div>
    `;
    setTimeout(() => {alertas.innerHTML = ""} , 2000);
  }
}