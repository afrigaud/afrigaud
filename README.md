# afrigaud
Alejandro Fernandez Rigaud (DNI 27119674)
# El tema elegido es: un servicio de gestion de alumnos

# Documentacion de la API 

## Obtener listado completo de estudiantes
##   Endpoint:  http://localhost:3000/api
##   Verbo: GET
##   Parametros: No tiene
##   Mensajes: 404 [No existe ningun recurso]

 
# Obtener un recurso alumno en particular
##   Endpoint:  http://localhost:3000/api/alumno/:id  
##   Verbo: GET
##   Parametros: legajo
##   Mensajes: 404 [No existe un recurso con ese legajo]

# Crear un recurso alumno
##   Endpoint:  http://localhost:3000/api/alumno/:id  
##   Verbo: POST
##   Parametros: legajo, nombre, edad, carrera 
##   Mensajes: 201 [Se creo el recurso], 400 [No se creo el recurso por que el legajo ya existe]   
   
# Modificar un recurso alumno
##   Endpoint:  http://localhost:3000/api/alumno/:id  	
##   Verbo: PUT
##   Parametros: legajo, nombre, edad, carrera
##   Mensajes: 200 [Se modifico el recurso], 404 [No se modifico el recurso por que el legajo no existe]  
   
# Eliminar un recurso alumno
##   Endpoint:  http://localhost:3000/api/alumno/:id  	
##   Verbo: DELETE
##   Parametros: legajo
##   Mensajes: 204 [Se elimino el recurso], 404 [No se elimino el recurso por que el legajo no existe]   

# Obtener un recurso cursada en particular
##   Endpoint:  http://localhost:3000/inscripcion/cursada/:id  
##   Verbo: GET
##   Parametros: legajo
##   Mensajes: 400 [No existe el recurso cursada para ese legajo],  404 [No existe un recurso con ese legajo]   
   
# Crear un recurso cursada
##   Endpoint:  http://localhost:3000/inscripcion/cursada/:id  
##   Verbo: POST
##   Parametros: legajo, materia, turno, dia 
##   Mensajes: 201 [Se creo el recurso], 404 [No se creo el recurso por que el legajo no existe]   

# Eliminar un recurso cursada
##   Endpoint:  http://localhost:3000/inscripcion/cursada/:id  	
##   Verbo: DELETE
##   Parametros: legajo, turno, dia
##   Mensajes: 204 [Se elimino el recurso], 400 [No existe el recurso cursada para ese legajo],  404 [No existe un recurso con ese legajo]   
   
# Obtener un recurso pago de un alumno en particular
##   Endpoint:  http://localhost:3000/api/pago/:id  
##   Verbo: GET
##   Parametros: legajo
##   Mensajes: 404 [No existe un recurso con ese legajo]

# Crear un recurso pago
##   Endpoint:  http://localhost:3000/api/pago/:id  
##   Verbo: POST
##   Parametros: legajo, fecha, concepto, monto, cuota
##   Mensajes: 201 [Se creo el recurso], 400 [No se creo el recurso por que ya existe ese pago], 404 [No existe un recurso con ese legajo]  

# Obtener el recurso saldo de un alumno en particular
##  Endpoint:  http://localhost:3000/api/pago/saldo/:id  
##  Verbo: GET
##  Parametros: legajo
##  Mensajes: 400 [No tiene saldo pendiente de pago], 404 [No existe un recurso con ese legajo] 
