import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  index: number; 
  
  constructor(
    private router: Router, //usa un servicio router 
    private route: ActivatedRoute // Usa el servicio de route para obtener informacion de la ruta
  ){

  }

  ngOnInit(): void{
    this.index = this.route.snapshot.params['id'];
  }
}