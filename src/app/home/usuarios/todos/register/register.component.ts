import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonasService } from 'src/app/services/personas.service';
import { catchError } from 'rxjs';
import { EnlacesService } from '../../../../services/enlaces.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //* Salida
  //* Entrada
  @ViewChild('alerta') alertaHtml: ElementRef;
  email: string; 
  pass: string;

  //* Variables
  formPersona: FormGroup; 

  //* Constructores
  constructor(
    private router:Router, 
    private client: PersonasService, 
    private formBuilder: FormBuilder, 
    private enlace: EnlacesService, 
    private persona: PersonasService,
    private tokenService: TokenService, 
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
    const API_PERSONA = `${this.enlace.AUTH_URL}${this.enlace.PERSONA_INSERT}`;

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
        this.email = this.formPersona.value.persoEmail.toString().trim();
        this.pass = this.formPersona.value.persoPassw.toString();
        this.client.insertClient(API_PERSONA, {
          nombre: this.formPersona.value.persoFname.toString().trim(),
          apellido_paterno: this.formPersona.value.persoSname.toString().trim(),
          correo: this.formPersona.value.persoEmail.toString().trim(),
          contrasena: this.formPersona.value.persoPassw.toString(),
          idRol: 3, 
        }).subscribe(
          response => {
            this.alertChange("Registro exitoso", "success");
            this.persona.inicioSesion({
              identificador: this.email,
              contrasena: this.pass
            }).subscribe(response => {
              this.tokenService.setToken(response.data.tokenAccess);
              this.tokenService.setIdentificador(response.data.idUser.correo);
              this.tokenService.setAuthorities(response.data.rol[0].authority);
              this.tokenService.setNombre(response.data.idPerson.nombre);
              setTimeout(() => {this.router.navigate(['user/'+response.data.idPerson.id])} , 2000);
            })
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