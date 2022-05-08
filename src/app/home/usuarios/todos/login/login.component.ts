import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PersonasService } from '../../../../services/personas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnlacesService } from 'src/app/services/enlaces.service';
import { TokenService } from '../../../../services/token.service';
import { AuthService } from 'src/app/services/auth.service';

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

  @ViewChild('alerta') alerta: ElementRef;
  formLoginClient: FormGroup;

  constructor(
    private router: Router,
    private persona: PersonasService,//AuthService
    private formBuilder: FormBuilder,
    private enlaces: EnlacesService,
    private tokenService: TokenService,
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
              this.information(response.message, "success");
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
              this.information(response.message, "warning")
            }
          },
          reject => {
            console.log(reject);
            this.errores(reject.message, "danger");
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

  public information(texto: string, tipo: string) {
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
    setTimeout(() => { alertas.innerHTML = "" }, 2000);
  }

  public errores(texto: string, tipo: string) {
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
    setTimeout(() => { alertas.innerHTML = "" }, 2000);
  }
}
