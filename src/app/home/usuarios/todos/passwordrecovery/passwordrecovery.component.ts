import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertaService } from 'src/app/services/alerta.service';
import { EnlacesService } from 'src/app/services/enlaces.service';
import { PersonasService } from 'src/app/services/personas.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-passwordrecovery',
  templateUrl: './passwordrecovery.component.html',
  styleUrls: ['./passwordrecovery.component.css']
})
export class PasswordrecoveryComponent implements OnInit {

  formPassword: FormGroup;
  correo: string; 

  constructor(
    private router: Router,
    private persona: PersonasService,//AuthService
    private formBuilder: FormBuilder,
    private enlaces: EnlacesService,
    private tokenService: TokenService,
    private alertas: AlertaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.correo = this.route.snapshot.params['correo'].toString();
    console.log(this.correo);
    this.formPassword = this.formBuilder.group({
      fpas1: [null, Validators.required], 
      fpas2: [null, Validators.required]
    });
  }
  
  validate(){
    if(this.formPassword.value.fpas1 == this.formPassword.value.fpas2){
      //FIXME: implementar metodo para actualziar contraseña
      this.alertas.showAlert("Las contraseñas si coinciden", "success", 2000);
    }else{
      this.alertas.showAlert("Las contraseñas no coinciden", "danger", 2000);
    }
  }
}
