var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3000);

//-----------------------------------------------
var ListaEstudiantes = [];
var ListaCursadas = [];
var ListaPagos = [];
var ListaArancel = [];
var ListaMateriasSistemas = [{nombre: 'Logica', dia: 'Lunes', turno:'Mañana'},{nombre: 'Derecho', dia: 'Martes', turno:'Noche'},
			{nombre: 'Sistemas y Metodos', dia: 'Miercoles', turno:'Mañana'},{nombre: 'Logica', dia: 'Jueves', turno:'Noche'},
			{nombre: 'Calculo', dia: 'Viernes', turno:'Noche'},{nombre: 'Probabilidad y Estadistica', dia: 'Martes', turno:'Mañana'},
			{nombre: 'Programacion 	1', dia: 'Miercoles', turno:'Noche'},{nombre: 'Arquitectura WEB', dia: 'Jueves', turno:'Mañana'}
];

var ListaMateriasPsicologia = [{nombre: 'Psicologia', dia: 'Lunes', turno:'Mañana'},{nombre: 'Antropologia', dia: 'Martes', turno:'Noche'},
			{nombre: 'Sociologia', dia: 'Miercoles', turno:'Mañana'},{nombre: 'Filosofia', dia: 'Jueves', turno:'Noche'},
			{nombre: 'Historia de la Psicologia', dia: 'Viernes', turno:'Noche'},{nombre: 'Probabilidad y Estadistica', dia: 'Martes', turno:'Mañana'},
			{nombre: 'Psicologia de la Educacion', dia: 'Miercoles', turno:'Noche'},{nombre: 'Psicologia Forense', dia: 'Jueves', turno:'Mañana'}
];


function Arancel (legajo, concepto, cuota ) {
	this.legajo = legajo;
	this.concepto = concepto;
	this.cuota = cuota;
	this.saldo = 12650;
	this.estado = 'impago';
}

function Estudiante (legajo, nombre, edad, carrera) {
	this.legajo = legajo;
	this.nombre = nombre;
	this.edad = edad;
	this.carrera = carrera;

	let matricula = new Arancel (legajo, 'matricula',1);
	ListaArancel.push(matricula);
	
	for (var i=1; i<13; i++ ) {
		var concepto = 'arancel';
		var cuota = i;
		let arancel = new Arancel (legajo, concepto, cuota);
		ListaArancel.push(arancel);
	}		
}

function Cursada (legajo, materia, turno, dia) {
	this.legajo = legajo;
	this.materia = materia;
	this.turno = turno;
	this.dia = dia;
}

function Pago (legajo, fecha, concepto, monto, cuota) {
	this.legajo = legajo;
	this.fecha = fecha;
	this.concepto = concepto;
	this.monto = monto;
	this.cuota = cuota;
}

//-----------------------------------------------
app.get('/api', function(req, res){
	res.sendfile('index.html');				
});

app.get('/api/alumno/:id', function(req, res){
	for( var i=ListaEstudiantes.length-1; i>=0; i-- )
		if( ListaEstudiantes[i].legajo == req.query.legajo ) break;
		if( i>=0 ) {
					res.json(ListaEstudiantes[i]);
		} else {
				res.status(404).send(req.body);
			}
});	

app.post('/api/alumno/', function(req, res){
	let p = ListaEstudiantes.some(function(p){ return p.legajo == req.query.legajo });
	if( p ) {
				//res.json({error: 'Ya existe ese legajo!'});
				res.status(400).send(req.body);
	} else {		
				let estudiante = new Estudiante (req.query.legajo, req.query.nombre, req.query.edad, req.query.carrera );
				ListaEstudiantes.push(estudiante);
				//res.json({success: true});
				res.status(201).send(req.body);
	}
});		

app.put('/api/alumno/:id', function(req, res){
var i;
	for( var i=ListaEstudiantes.length-1; i>=0; i-- )
		if( ListaEstudiantes[i].legajo == req.query.legajo ) break;
		if( i>=0 ) {
			ListaEstudiantes[i].nombre = req.query.nombre;
			ListaEstudiantes[i].edad = req.query.edad;
			ListaEstudiantes[i].carrera = req.query.carrera;
			//res.json({success: true});
			res.status(200).send(req.body);
		} else {
					//res.json({error: 'No existe ese legajo'});
					res.status(404).send(req.body);
				}
});

app.delete('/api/alumno/:id', function(req, res){
	var i;
	for( var i=ListaEstudiantes.length-1; i>=0; i-- )
		if( ListaEstudiantes[i].legajo == req.query.legajo ) break;
		if( i>=0 ) {
					ListaEstudiantes.splice(i, 1);
					//res.json({success: true});
					res.status(204).send(req.body);
		} else {
					//res.json({error: 'No existe ese legajo'});
					res.status(404).send(req.body);
				}
});

//-----------------------------------------------
app.get('/api/inscripcion/cursada/:id', function(req, res){
	var i;
	var ListaMaterias = [];
	let p = ListaEstudiantes.some(function(p){ return p.legajo == req.query.legajo });
	if( p ) {
				for( var i=ListaCursadas.length-1; i>=0; i-- )
					if( ListaCursadas[i].legajo == req.query.legajo ) {
							ListaMaterias.push(ListaCursadas[i]);
					}		
				if( ListaMaterias.length > 0 ) {
						res.json(ListaMaterias);
				} else {
							//res.json({error: 'No tiene inscripciones'});
							res.status(400).send(req.body);
						}
	} else {		
				//res.json({error: 'No esta registrado como estudiante'});
				res.status(404).send(req.body);
	}
});	

app.post('/api/inscripcion/cursada/:id', function(req, res){
	var i;
	let p = ListaEstudiantes.some(function(p){ return p.legajo == req.query.legajo });
	if( p ) {
				for( var i=ListaCursadas.length-1; i>=0; i-- )
					if( ListaCursadas[i].legajo == req.query.legajo && ListaCursadas[i].turno == req.query.turno && ListaCursadas[i].dia == req.query.dia ) break;
					if( i>=0 ) {
									//res.json({error: 'Ya esta inscripto ese dia en ese turno'});
									res.status(423).send(req.body);
					} else {
								let cursada = new Cursada (req.query.legajo, req.query.materia, req.query.turno, req.query.dia );
								ListaCursadas.push(cursada);
								//res.json({success: true});
								res.status(201).send(req.body);
							}
	} else {		
				//res.json({error: 'No esta registrado como estudiante'});
				res.status(404).send(req.body);
	}
});	

app.delete('/api/inscripcion/cursada/:id', function(req, res){
	var i;
	let p = ListaEstudiantes.some(function(p){ return p.legajo == req.query.legajo });
	if( p ) {
				for( var i=ListaCursadas.length-1; i>=0; i-- )
					if( ListaCursadas[i].legajo == req.query.legajo && ListaCursadas[i].turno == req.query.turno && ListaCursadas[i].dia == req.query.dia ) break;
					if( i>=0 ) {
								ListaCursadas.splice(i, 1);
								//res.json({success: true});
								res.status(204).send(req.body);
				} else {
							//res.json({error: 'No tiene inscripciones'});
							res.status(400).send(req.body);
						}
	} else {		
				//res.json({error: 'No esta registrado como estudiante'});
				res.status(404).send(req.body);
	}
});	


app.get('/api/inscripcion/materias/', function(req, res){
	res.json(ListaMateriasSistemas);
	
});	

//---------------------------------------------------------------------
app.get('/api/pago/:id', function(req, res){
	var PagosEstudiante = [];
	let p = ListaEstudiantes.some(function(p){ return p.legajo == req.query.legajo });
	if( p ) {
				for( var i=ListaPagos.length-1; i>=0; i-- )
					if( ListaPagos[i].legajo == req.query.legajo ) {
							PagosEstudiante.push(ListaPagos[i]);
					}		
				if( PagosEstudiante.length > 0 ) {
						res.json(PagosEstudiante);
				} else {
							//res.json({error: 'No tiene pagos'});
							res.status(400).send(req.body);
						}
	} else {		
				//res.json({error: 'No esta registrado como estudiante'});
				res.status(404).send(req.body);
	}
});		
	
app.post('/api/pago/:id', function(req, res){
	var i;
	let p = ListaEstudiantes.some(function(p){ return p.legajo == req.query.legajo });
	if( p ) {
				for( var i=ListaPagos.length-1; i>=0; i-- )
					if( ListaPagos[i].legajo == req.query.legajo && ListaPagos[i].concepto == req.query.concepto && ListaPagos[i].cuota == req.query.cuota) break;
					if( i>=0 ) {
									//res.json({error: 'El pago del concepto ya esta imputado'});
									res.status(400).send(req.body);
					} else {
								let pago = new Pago (req.query.legajo, req.query.fecha, req.query.concepto, req.query.monto, req.query.cuota );
								ListaPagos.push(pago);
								
								for( var j=ListaArancel.length-1; j>=0; j-- )
									if (ListaArancel[j].legajo == req.query.legajo && ListaArancel[j].concepto == req.query.concepto && ListaArancel[j].cuota == req.query.cuota) break;
									if( j>=0 ) {
													ListaArancel[j].estado = 'pagado'
									}		
								//res.json({success: true});
								res.status(201).send(req.body);
							}
	} else {		
				//res.json({error: 'No esta registrado como estudiante'});
				res.status(404).send(req.body);
	}
});		

app.get('/api/pago/saldo/:id', function(req, res){
	var i;
	var PagosEstudiante = [];
	let p = ListaEstudiantes.some(function(p){ return p.legajo == req.query.legajo });
	if( p ) {
				for( var i=0; i<=ListaArancel.length-1; i++ )
					if( ListaArancel[i].legajo == req.query.legajo && ListaArancel[i].estado == 'impago') {
							PagosEstudiante.push(ListaArancel[i]);
					}		
				if( PagosEstudiante.length > 0 ) {
						res.json(PagosEstudiante);
				} else {
							//res.json({error: 'No tiene saldo pendiente de pago'});
							res.status(400).send(req.body);
						}
	} else {		
				//res.json({error: 'No esta registrado como estudiante'});
				res.status(404).send(req.body);
	}
});

//-----------------------------------------------
app.use(function(req, res){
	res.type('text/plain');
	res.status(404);
	res.send('no encontro la URI');
});

app.use(function(err, req, res, next){
	console.error(err.stack);
	res.type('text/plain');
	res.status(500);
	res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
	console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.' );
});