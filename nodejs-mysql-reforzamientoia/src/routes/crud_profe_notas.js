const express = require('express');
const router = express.Router();


const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/notas', async (req,res) => {
  const notas = await pool.query('SELECT * FROM notas');
  res.render('crud_profe/notas/list',{ notas });
});

 router.get('/notas', async (req,res) => {
  const notas = await pool.query('SELECT * FROM notas');
  res.render('crud_profe/notas/list',{ notas });
});

 router.get('/notas/add', async (req,res) => {
   
  res.render('crud_profe/notas/add');
});
router.post('/notas/add', async (req,res) =>{
  const { nombre_actividad,clasificacion,id_alumno,id_asignatura} = req.body;
  const notaNueva ={
    nombre_actividad,
    clasificacion,
    id_alumno,
    id_asignatura
  };
  await pool.query('INSERT INTO notas set ?', [notaNueva]);
  req.flash('success', 'Alumno guardado satisfactoriamente!');
  res.redirect('/profesores/alumnos')
});
module.exports = router; 