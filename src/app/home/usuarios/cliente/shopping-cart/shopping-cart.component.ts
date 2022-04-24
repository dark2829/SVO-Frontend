import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  producto = "Jabón en polvo Roma 1Kg";
  precioAntes = 50.50;
  precioReal = 45;
  cantidad = 1; 
  total = 12.50; 
  constructor() { }

  ngOnInit(): void {
  }

}
