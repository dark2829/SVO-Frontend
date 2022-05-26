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
      fcorreo: [null, Validators.required]
    });
  }
  
  login(){
    this.router.navigate(['recoveryPassword/'+this.formpassword.value.fcorreo])
  }

}
