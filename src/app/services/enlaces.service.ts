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
  public AUTH_URL               = "http://localhost:8080/auth/"

  public API_ENLACE_PERSONAS    = "http://localhost:8080/personas";
  public API_ENLACE_PROVEEDOR   = "http://localhost:8080/proveedores";
  public API_ENLACE_EMPLEADO    = "http://localhost:8080/empleados";
  public API_ENLACE_USUARIOS    = "http://localhost:8080/usuarios";
  public API_ENLACE_PRODUCTOS   = "http://localhost:8080/productos";

  //! Direcciones a metodos
  //* Proveedores
  public PROVEEDOR_INSERT = "/insert"; //?POST
  public PROVEEDOR_BUSCAR = "/findAllProveedores"; //? GET
  public PROVEEDOR_UPDATE = "/update?id="; //?POST
  //* Empleados
  public EMPLEADO_INSERT = "/insertEmpleado"; //? POST
  public EMPLEADO_BUSCAR = "/"; //?
  public EMPLEADO_UPDATE = "/"; //?
  //* Personas
  // public PERSONA_INSERT = "/insertNewUser"; //? POST
  public PERSONA_INSERT = "registro"; //? POST
  public PERSONA_LOGIN = "login"; //? POST
  public PERSONA_BUSCAR = "/findUserById?id="; //? GET
  public PERSONA_UPDATE_P = `/updateClient?id=`; //? POST
  public PERSONA_UPDATE_U = `&idUser=`; //? Continuación del anterior
  //* Usuarios
  public USUARIO_LOGIN_IDENTIFY = "/auth/login?identificador="; //? POST
  public USUARIO_LOGIN_PASSWORD = "&contrasena="; //? GET
  //* Productos 
  public PRODUCTO_INSERT = "/insertProduct"; //? POST
  public PRODUCTO_BUSCAR = "/findAllProductos"; //? GET
  public PRODUCTO_BUSCAR_ID = "/findProductById?id="; //? GET
  public PRODUCTO_UPDATE = "/update?id=" //? POST
}
