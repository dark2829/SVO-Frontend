import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-modify',
  templateUrl: './perfil-modify.component.html',
  styleUrls: ['./perfil-modify.component.css']
})
export class PerfilModifyComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
}
