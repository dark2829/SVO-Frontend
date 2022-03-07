import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancel-request',
  templateUrl: './cancel-request.component.html',
  styleUrls: ['./cancel-request.component.css']
})
export class CancelRequestComponent implements OnInit {
  
  fecha = new Date();
  codigo = 123143; 
  productos = "Producto de ejemplo";

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

}
