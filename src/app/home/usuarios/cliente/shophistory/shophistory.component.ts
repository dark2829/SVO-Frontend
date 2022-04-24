import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shophistory',
  templateUrl: './shophistory.component.html',
  styleUrls: ['./shophistory.component.css']
})
export class ShophistoryComponent implements OnInit {
  //Variables 
  fecha = "12 de febrero de 2022";
  codigo = "abcdefgh";
  productos = "jabón roma";


  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  solicitudCancelacion(){
    this.router.navigate(['cancel-request']);
  }
}
