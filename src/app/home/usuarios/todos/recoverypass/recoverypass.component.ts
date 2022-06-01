import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertaService } from 'src/app/services/alerta.service';
import { EnlacesService } from 'src/app/services/enlaces.service';
import { PersonasService } from 'src/app/services/personas.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-recoverypass',
  templateUrl: './recoverypass.component.html',
  styleUrls: ['./recoverypass.component.css']
})
export class RecoverypassComponent implements OnInit {

  formpassword: FormGroup;

  constructor(
    private router: Router,
    private persona: PersonasService,//AuthService
    private formBuilder: FormBuilder,
    private enlaces: EnlacesService,
    private token: TokenService,
    private alerta: AlertaService, 
  ) { }

  ngOnInit(): void {
    this.formpassword = this.formBuilder.group({
      fcorreo: [null, [Validators.required, Validators.email, Validators.pattern(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/)]]
    });
  }
  
  login(){
    console.log(this.formpassword.value.fcorreo);
    this.persona.recovery({
      mailTo: this.formpassword.value.fcorreo
    }).subscribe(response => {
      this.alerta.showAlert("Revise su su correo electrónico", "success", 2500);
    },reject => {
      this.alerta.showAlert("El correo no esta asociado a una cuenta", "danger", 3000);
    });
  }

}
