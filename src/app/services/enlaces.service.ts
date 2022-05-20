import { Injectable } from '@angular/core';

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
  public API_ENLACE_PRODUCTOS   = "http://localhost:8080/productos";//? Tambien se usa en favoritos
  public API_ENLACE_CARRITO     = "http://localhost:8080/cart";
  public PRODUCTOS_EN_CARRITO   = "http://localhost:4200/productInCarr"

  //! Direcciones a metodos
  //* Proveedores
  public PROVEEDOR_INSERT = "/insert"; //?POST
  public PROVEEDOR_BUSCAR = "/findAllProveedores"; //? GET
  public PROVEEDOR_UPDATE = "/update?id="; //?POST
  //* Empleados
  public EMPLEADO_INSERT = "/insertEmpleado"; //? POST
  public EMPLEADO_BUSCAR_ALL = "/findAllEmpleados"; //?GET
  public EMPLEADO_BUSCAR_ID = "/findEmpleadoById?id="; //?GET
  //* Personas
  public PERSONA_INSERT = "registro"; //? POST
  public PERSONA_BUSCAR = "/findUserById?id="; //? GET
  public PERSONA_UPDATE_P = `/updateClientDatosGenerales?id=`; //? POST
  public PERSONA_UPDATE_U = `&idUser=`; //? Continuación del anterior
  public PERSONA_UPDATE_ADRES = `/updateClientDirecciones?id=`; //? Continuación del anterior
  public PERSONA_UPDATE_CARDS = `/updateClientTarjetas?id=`; //? POST
  //* Usuarios
  public USUARIO_LOGIN_IDENTIFY = "/auth/login?identificador="; //? POST
  public USUARIO_LOGIN_PASSWORD = "&contrasena="; //? GET
  //* Productos 
  public PRODUCTO_INSERT = "/insertProduct"; //? POST
  public PRODUCTO_BUSCAR = "/findAllProductos"; //? GET
  public PRODUCTO_BUSCAR_ID = "/findProductById?id="; //? GET
  public PRODUCTO_UPDATE = "/update?id=" //? POST
  public PRODUCTO_STOCKDOWN = "/findStockBajo" //? GET
  public PRODUCTO_CONTACT = "/contactado?idProducto=" //? GET
  //* Carrito 
  public CARRITO_INSERT = "/carrito?idProducto="
  public CARRITO_INSERT_C = "&cantidad="
  public CARRITO_INSERT_U = "&idUsuario="
  public CARRITO_GET_ALL = "/actualizarProductosCarrito?idUsuario="//? GET
  public CARRITO_DELETE_P = "/delete/cart?idProducto="
  public CARRITO_PandU = "&idUsuario="
  public CARRITO_UPDATE =  "/actualizarCantidadProducto?idProducto=" //? POST
  //* Favoritos
  public FAVORITOS_GET_ALL = "/mostrarFavoritosPorUsuario?idUsuario="//?GET
  public FAVORITOS_ADD     = "/anadirFavoritos?idProducto="//?GET
  public FAVORITOS_DELETE  = "/borrarProductoFavorito?idProducto="//?GET
  public FAVORITOS_AandU   = "&idUsuario="//? GET
}
