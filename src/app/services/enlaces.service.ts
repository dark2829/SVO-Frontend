import { Injectable } from '@angular/core';
import { PersonasService } from './personas.service';

@Injectable({
  providedIn: 'root'
})
export class EnlacesService {
  constructor(
  ) { }

  //? Esta clase es para agregar un link universal y solo modificar rutas 
  //* Direccion raiz
  public API_ENLACE_PROVEEDOR = "http://localhost:8080/proveedores";
  public API_ENLACE_EMPLEADO = "http://localhost:8080/empleados";
  public API_ENLACE_PERSONAS = "http://localhost:8080/personas";
  public API_ENLACE_USUARIOS = "http://localhost:8080/usuarios";

  //! Direcciones a metodos
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
  public PERSONA_BUSCAR = "/findUserById?id=";
  public PERSONA_UPDATE_P = `/updateClient?id=`;
  public PERSONA_UPDATE_U = `&idUser=`;
  //* Usuarios
  public USUARIO_LOGIN_IDENTIFY = "/login?identificador=";
  public USUARIO_LOGIN_PASSWORD = "&contrasena=";
}
