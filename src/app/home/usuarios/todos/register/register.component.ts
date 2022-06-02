import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonasService } from 'src/app/services/personas.service';
import { catchError } from 'rxjs';
import { EnlacesService } from '../../../../services/enlaces.service';
import { TokenService } from 'src/app/services/token.service';
import { AlertaService } from '../../../../services/alerta.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //* Salida
  //* Entrada
  email: string;
  pass: string;

  //* Variables
  formPersona: FormGroup;

  //* Constructores
  constructor(
    private router: Router,
    private client: PersonasService,
    private formBuilder: FormBuilder,
    private enlace: EnlacesService,
    private persona: PersonasService,
    private tokenService: TokenService,
    private alerta: AlertaService
  ) { }

  ngOnInit(): void {
    this.formPersona = this.formBuilder.group({
      persoFname: [null, [Validators.required]],
      persoSname: [null, [Validators.required]],
      persoEmail: [null, [Validators.required, Validators.email, Validators.pattern(/^([a-z0-9_\.-]+)@([\da-z\.-]{2,10})\.([a-z\.]{2,6})$/)]],
      persoPassw: [null, [Validators.required, Validators.maxLength(8), Validators.minLength(5)]]
    });
  }

  //* Métodos get
  //* Métodos post

  //* Métodos update
  //* Métodos delete
  public insertClient() {
    const API_PERSONA = `${this.enlace.AUTH_URL}${this.enlace.PERSONA_INSERT}`;

    let camposValidos = (
      this.formPersona.value.persoFname != null &&
      this.formPersona.value.persoFname != "" &&
      this.formPersona.value.persoSname != null &&
      this.formPersona.value.persoSname != "" &&
      this.formPersona.value.persoEmail != null &&
      this.formPersona.value.persoEmail != "" &&
      this.formPersona.value.persoPassw != null &&
      this.formPersona.value.persoPassw != ""
    );

    if (camposValidos) {
      try {
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
            console.log(response);
            this.alerta.showAlert("Registro exitoso", "success", 2000, response.status);

            this.persona.inicioSesion({
              identificador: this.email,
              contrasena: this.pass
            }).subscribe(response => {
              this.tokenService.setToken(response.data.tokenAccess);
              this.tokenService.setIdentificador(response.data.idUser.correo);
              this.tokenService.setAuthorities(response.data.rol[0].authority);
              this.tokenService.setNombre(response.data.idPerson.nombre);
              this.tokenService.setID(response.data.idPerson.id)

              setTimeout(() => { this.router.navigate(['user/' + response.data.idPerson.id]) }, 2000);
            })

          },
          error => {
            this.alerta.showAlert(error.error.message, "warning", 2500)
          }
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      this.alerta.showAlert("Todos los campos son obligatorios", "warning", 2500)
    }
  }

  public enviar() {
    this.insertClient();
  }

  //* Métodos navegación
  login() {
    this.router.navigate(['login']);
  }

  home() {
    this.router.navigate(['']);
  }
}