import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PersonasService } from '../../../../services/personas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnlacesService } from 'src/app/services/enlaces.service';
import { TokenService } from '../../../../services/token.service';
import { AlertaService } from '../../../../services/alerta.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLogged = false;
  isLoginFail = false;
  identify: string;
  contrasena: string;
  nombre: string;
  roles: string;
  tipe: any = "password"; 

  @ViewChild('alerta') alerta: ElementRef;
  formLoginClient: FormGroup;

  constructor(
    private router: Router,
    private persona: PersonasService,//AuthService
    private formBuilder: FormBuilder,
    private enlaces: EnlacesService,
    private tokenService: TokenService,
    private alertService: AlertaService
  ) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorieties();
    }

    this.formLoginClient = this.formBuilder.group({
      formCorreo: [null, [Validators.required, Validators.email]],
      formPassword: [null, [Validators.required, Validators.maxLength(8)]]
    })

    if(window.sessionStorage.getItem('Values') == '1'){
      window.sessionStorage.setItem('Values', '0');
      window.location.reload();
    }else if(window.sessionStorage.getItem('Values') == '0'){
      window.sessionStorage.removeItem('Values');
    }
  }

  showpassword = () => {
    const res = (this.tipe == 'password') ? 'text' : 'password' ;
    this.tipe = res; 
  }

  ingresar() {
    try {
      if (
        this.formLoginClient.value.formCorreo != null &&
        this.formLoginClient.value.formPassword != null &&
        this.formLoginClient.value.formCorreo != "" &&
        this.formLoginClient.value.formPassword != ""
      ) {
        let correo = this.formLoginClient.value.formCorreo.toString().trim();
        let pass = this.formLoginClient.value.formPassword.toString().trim();
        this.persona.inicioSesion({
          identificador: this.formLoginClient.value.formCorreo,
          contrasena: this.formLoginClient.value.formPassword
        }).subscribe(
          response => {
            if (response != null) {
              this.alertService.showAlert(response.message, "success", 2000, "200");
              this.isLogged = true;
              this.isLoginFail = false;

              this.tokenService.setToken(response.data.tokenAccess);
              this.tokenService.setIdentificador(response.data.idUser.correo);
              this.tokenService.setAuthorities(response.data.rol[0].authority);
              this.tokenService.setNombre(response.data.idPerson.nombre);
              this.tokenService.setID(response.data.idPerson.id)
              this.roles = response.data.rol[0].authority;

              if (response.data.rol[0].authority == "Administrador") {
                setTimeout(() => { this.router.navigate(['userAdmin/' + response.data.idPerson.id]) }, 2000);

              }
              if (response.data.rol[0].authority == "Empleado") {
                setTimeout(() => { this.router.navigate(['userEmpleado/' + response.data.idPerson.id]) }, 2000);
              }
              if (response.data.rol[0].authority == "Cliente") {
                setTimeout(() => { this.router.navigate(['user/' + response.data.idPerson.id]) }, 2000);
              }
            } else {
              this.alertService.showAlert(response.message, "success", 2000, "200");
            }
          },
          reject => {                   
            this.alertService.showAlert(reject.error.message, "warning", 2500, reject.status);
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  registro() {
    this.router.navigate(['registro']);
  }

  recovery() {
    this.router.navigate(['recovery']);
  }
}
