const express = require('express');
const router = express.Router();
const helpers = require('../lib/helpers')
const passport = require('passport');

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/notas', async (req, res) => {
  const notas = await pool.query('SELECT * FROM notas');
  resultArray = JSON.parse(JSON.stringify(notas));

  var nombreAsignaturas = []
  var nombresAlum = []

  for (i = 0; i < resultArray.length; i++) {
    console.log(resultArray[i].id_alumno)
    nombre = await pool.query('SELECT nombre_completo FROM alumnos WHERE id = ' + resultArray[i].id_alumno);
    nombresAlum.push(nombre)

  }
  for (i = 0; i < nombresAlum.length; i++) {
    console.log(nombresAlum[i][0].nombre_completo)
    resultArray[i].id_alumno = nombresAlum[i][0].nombre_completo
  }

  for (i = 0; i < resultArray.length; i++) {
    console.log(resultArray[i].id_asignatura)
    nombre = await pool.query('SELECT nombre_asignatura FROM asignaturas WHERE id = ' + resultArray[i].id_asignatura);
    nombreAsignaturas.push(nombre)

  }
  for (i = 0; i < nombreAsignaturas.length; i++) {
    console.log(nombreAsignaturas[i][0].nombre_asignatura)
    resultArray[i].id_asignatura = nombreAsignaturas[i][0].nombre_asignatura
  }


  console.log(resultArray)
  res.render('crud_profe/notas/list', { notas: resultArray, });
});

router.get('/notas', async (req, res) => {
  const notas = await pool.query('SELECT * FROM notas');
  
  res.render('crud_profe/notas/list', { notas });
});

router.get('/notas/add', async (req, res) => {
  const asignaturas = await pool.query('SELECT * FROM asignaturas');
  const alumnos =await pool.query('SELECT * FROM alumnos');
  res.render('crud_profe/notas/add',{asignaturas:asignaturas, alumnos:alumnos});
});

router.get('/notas/reforzamiento', async (req, res) => {

  const notas = await pool.query('SELECT * FROM notas');
  resultArray = JSON.parse(JSON.stringify(notas));


  var nombresAlum = []
  var cantNotasAlumno = 0
  var sumaNotas = 0
  var promedio = 0
  var necesitanReforzamiento = []

  for (i = 0; i < resultArray.length; i++) {
    sumaNotas = resultArray[i].clasificacion
    cantNotasAlumno++
    for (j = i + 1; j < resultArray.length; j++) {
      if (resultArray[j].id_alumno == resultArray[i].id_alumno) {
        cantNotasAlumno++
        sumaNotas = sumaNotas + resultArray[j].clasificacion
      }
    }
    promedio = sumaNotas / cantNotasAlumno
    if (promedio < 40 && !necesitanReforzamiento.includes(resultArray[i].id_alumno)) {
      necesitanReforzamiento.push(resultArray[i].id_alumno)

    }
    console.log(resultArray[i].id_alumno)
    nombre = await pool.query('SELECT nombre_completo FROM alumnos WHERE id = ' + resultArray[i].id_alumno);
    nombresAlum.push(nombre)

    cantNotasAlumno = 0
  }
  for (i = 0; i < nombresAlum.length; i++) {
    console.log(nombresAlum[i][0].nombre_completo)
    resultArray[i].id_alumno = nombresAlum[i][0].nombre_completo
  }
  for (i = 0; i < necesitanReforzamiento.length; i++) {
    alumno = await pool.query('SELECT * FROM alumnos WHERE id = ' + necesitanReforzamiento[i]);
    const rut = alumno[0].rut;
    const nombre_completo = alumno[0].nombre_completo;
    const tipo = 3
    const correo = alumno[0].correo;
    const password = '1234'
    const nuevoUsuario = {
      rut,
      correo,
      password,
      nombre_completo,
      tipo
    };

    nuevoUsuario.password = await helpers.encryptPassword(password);
    const result = await pool.query('INSERT INTO users SET ?', [nuevoUsuario]);

  }

  console.log('necesitan reforzamiento: ' + necesitanReforzamiento)

  req.flash('success', 'Se han contactado a los alumnos que necesitan el reforzamiento!')
  res.redirect('/profesores/notas')
});

router.post('/notas/add', async (req, res) => {
  function getID(val){
    id = val.charAt(0)
    return id
 }
  const { nombre_actividad, clasificacion} = req.body;
  const id_alumno = getID(req.body.id_alumno)
  const id_asignatura = getID(req.body.id_asignatura)
  const notaNueva = {
    nombre_actividad,
    clasificacion,
    id_alumno,
    id_asignatura
  };
  await pool.query('INSERT INTO notas set ?', [notaNueva]);
  req.flash('success', 'Nota guardada satisfactoriamente!');
  res.redirect('/profesores/alumnos')
});

router.get('/notas/delete/:id', async (req, res) => {
  console.log(req.params.id);
  const { id } = req.params;
  await pool.query('DELETE FROM notas WHERE id = ?', [id]);
  req.flash('success', 'Nota eliminada satisfactoriamente!');
  res.redirect('/profesores/notas')
});

router.get('/notas/edit/:id', async (req, res) => {
  console.log(req.params.nombre);
  const { id } = req.params;
  const notas = await pool.query('SELECT * FROM notas WHERE id = ?', [id]);

  res.render('crud_profe/notas/edit', { nota: notas[0] });
});
router.post('/notas/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre_actividad, clasificacion, id_alumno, id_asignatura } = req.body;
  const notaNueva = {
    nombre_actividad,
    clasificacion,
    id_alumno,
    id_asignatura
  };
  await pool.query('UPDATE notas set ? WHERE id = ?', [notaNueva, id])
  req.flash('success', 'Nota actualizada satisfactoriamente!');
  res.redirect('/profesores/notas')
});
module.exports = router; 