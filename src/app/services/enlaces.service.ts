import { Injectable } from '@angular/core';
import { PersonasService } from './personas.service';

@Injectable({
  providedIn: 'root'
})
export class EnlacesService {
  constructor(
    private person: PersonasService
  ) { }

  //? Esta clase es para agregar un link universal y solo modificar rutas 
  //* Direccion raiz
  public API_ENLACE_PROVEEDOR = "http://localhost:8080/proveedores";
  public API_ENLACE_EMPLEADO = "http://localhost:8080/empleados";
  public API_ENLACE_PERSONAS = "http://localhost:8080/personas";

  //* Direcciones a metodos
  //* Proveedores
  public PROVEEDOR_INSERT = "/insert";
  public PROVEEDOR_BUSCAR = "/findAllProveedores";
  public PROVEEDOR_UPDATE = "/update?id=";
  //* Empleados
  public EMPLEADO_INSERT = "/insertEmpleado";
  public EMPLEADO_BUSCAR = "/";
  public EMPLEADO_UPDATE = "/";
  //* Peronas
  public PERSONA_INSERT = "/insertNewUser";
  public PERSONA_BUSCAR = "/";
  public PERSONA_UPDATE_P = `/updateClient?id=`;
  public PERSONA_UPDATE_U = `&idUser=`;
}
