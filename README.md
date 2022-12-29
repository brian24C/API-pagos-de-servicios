## API DE PAGO DE SERVICIOS

### Punto inportante:
- En JS se hace uso del localStorage:
		El "localStorage" está disponible en la mayoría de los navegadores modernos y, por lo general, está habilitado de forma predeterminada. Sin embargo, en algunos casos, el "localStorage" puede estar deshabilitado o no estar disponible.

     ##### Para habilitar el "localStorage" en el navegador del cliente, siga estos pasos:
		Abra el navegador y vaya a la página de configuración o ajustes del navegador.
		Busque la opción de "Privacidad" o "Cookies" y selecciónela.
		En la sección de "Cookies", asegúrese de que la opción de "Permitir que los sitios guarden y lean datos de las cookies" esté habilitada.
		Guarde los cambios y cierre la página de configuración o ajustes.
		Con esto ya se podrá guardar el token y datos del usuario logeado en el localStorage del navegador del cliente.

# Funcionalidades desarrolladas
### Login
- Vista para el ingreso de los usuarios, este debe ser con email y contraseña.
- Guardar token en local storage y únicamente mostrar la vista de login si es que el token no existe o es nulo.
- Si el usuario no está logueado no tendrá acceso a las otras vistas.

### Vista principal
- Navbar con links a la vista principal y para añadir un nuevo pago. Administrador: Link a servicios
- Lista de pagos realizados, cada card o ítem debe contener la siguiente información:
		-Logo del servicio
		Nombre del servicio
		Fecha de pago
		Monto
- Lista de pagos vencidos, cada card o item debe contener la siguiente información:
		Logo del servicio
		Nombre del servicio
		Fecha de pago
		Monto
		Penalidad
		
### Vista para añadir un nuevo pago
		- Fecha de vencimiento
		- Servicio (lista desplegable)
		- Monto
		- Tomar en cuenta que la fecha de pago al momento de realizar el post, debe ser la fecha actual.

### Vista de servicios(únicamente para el administrador)
- Forms de creación de un nuevo servicio:
		- Nombre del servicio
		- Prefijo
		- Url Logo
- Forms de modificación de un servicio:
		- Lista de servicios (lista desplegable)
		- Nombre del servicio
		- Prefijo
		- Url Logo

#### Consideraciones

- Los colores de los pagos realizados y vencidos deben ser distintos.
- En la esquina superior derecha, debe aparecer el nombre de usuario en conjunto con un logo estático que pueden elegir según su preferencia, además de el link o botón para el logout.
- Las vistas añadidas para el administrador no deben ser visibles para los usuarios normales.
- Las fuentes y colores son de libre elección.
- La opción de ver más de la vista principal, este indica que ahí deben ir todos los items correspondientes a la sección


## Que Aprendí?
- Uso de bootstrap, sweetalert2.
- Implementación de login con local storage.
- Uso de JWT en el login y obtención de datos del backend.
- Uso de funciones asíncronas.
- Implementación del CRUD.
