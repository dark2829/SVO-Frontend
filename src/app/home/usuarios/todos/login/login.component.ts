import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PersonasService } from '../../../../services/personas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnlacesService } from 'src/app/services/enlaces.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  @ViewChild('alerta') alerta: ElementRef;
  formLoginClient: FormGroup; 

  constructor(
    private router:Router, 
    private persona: PersonasService,
    private formBuilder: FormBuilder,
    private enlaces: EnlacesService
  ) { }
  
  ngOnInit() :void{
    this.formLoginClient = this.formBuilder.group({
      formCorreo: [null, [Validators.required, Validators.email]],
      formPassword: [null, [Validators.required, Validators.maxLength(8)]]
    })
  }

  ingresar(){
    try{
      if(
        this.formLoginClient.value.formCorreo != null &&
        this.formLoginClient.value.formPassword != null &&
        this.formLoginClient.value.formCorreo != "" &&
        this.formLoginClient.value.formPassword != ""
      ){
        let correo = this.formLoginClient.value.formCorreo.toString().trim();
        let pass = this.formLoginClient.value.formPassword.toString().trim();
        let API_LOGIN = this.enlaces.API_ENLACE_USUARIOS + this.enlaces.USUARIO_LOGIN_IDENTIFY + correo + this.enlaces.USUARIO_LOGIN_PASSWORD + pass;
        this.persona.inicioSesion(API_LOGIN).subscribe(
          response => {
          this.information("Bienvenido", "success");
        },
        reject => {
          this.errores("Usuario o contraseña incorrecto", "danger");
        }
        );
      }
    }catch(error){  
      console.log(error);
    }
  }

  registro(){
    this.router.navigate(['registro']);
  }

  recovery(){
    this.router.navigate(['recovery']);
  }

  public information(texto: string, tipo: string){
    const alertas: any = this.alerta.nativeElement; 
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

  public errores(texto: string, tipo: string){
    const alertas: any = this.alerta.nativeElement; 
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
