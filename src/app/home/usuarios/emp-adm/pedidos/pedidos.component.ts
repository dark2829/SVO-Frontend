import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  id = 1;  
  constructor(
    private router: Router
  ) { }

  ngOnInit(
    
  ): void {
  }
  
  cancelacion(){
    this.router.navigate(['cancel']);
  }
}
