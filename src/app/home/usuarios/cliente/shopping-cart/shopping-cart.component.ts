import { Component, OnInit } from '@angular/core';
import { EnlacesService } from '../../../../services/enlaces.service';
import { PersonasService } from '../../../../services/personas.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  
  total: string; 

  constructor(
    private enlaces: EnlacesService, 
    private persona: PersonasService
  ) { }

  ngOnInit() {  
  }

}
