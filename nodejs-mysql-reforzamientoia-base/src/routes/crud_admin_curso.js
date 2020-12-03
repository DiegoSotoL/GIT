const express = require('express');
const router = express.Router();


const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/cursos/add', isLoggedIn, async (req,res) =>{
   const colegios = await pool.query('SELECT * FROM colegios');
   res.render('crud_admin/cursos/add',{colegios:colegios});
});

router.post('/cursos/add', isLoggedIn, async (req,res) =>{
   function getID(val){
      id = val.charAt(0)
      return id
   }
   const { nombre_curso,cant_alumnos} = req.body;
   const id_colegio = getID(req.body.id_colegio)
   const cursoNuevo ={
      nombre_curso,
      cant_alumnos,
      id_colegio
   };
   await pool.query('INSERT INTO cursos set ?', [cursoNuevo]);
   req.flash('success', 'Curso guardado satisfactoriamente!');
   res.redirect('/administracion/cursos')
 });

 router.get('/cursos', isLoggedIn, async (req,res) => {
   const cursos = await pool.query('SELECT * FROM cursos');
   resultArray = JSON.parse(JSON.stringify(cursos));


  var nombresColegios = []

  for (i = 0; i < resultArray.length; i++) {
    console.log(resultArray[i].id_colegio)
    nombre = await pool.query('SELECT nombre FROM colegios WHERE id = ' + resultArray[i].id_colegio);
    nombresColegios.push(nombre)

  }
  for (i = 0; i < nombresColegios.length; i++) {
   
   resultArray[i].id_colegio = nombresColegios[i][0].nombre
 }
   res.render('crud_admin/cursos/list',{ cursos:resultArray });
 });

 router.get('/cursos/delete/:id', isLoggedIn, async(req,res) => {
   console.log(req.params.id);
   const { id } = req.params;
   await pool.query('DELETE FROM cursos WHERE id = ?',[id]);
   req.flash('success', 'Curso eliminado satisfactoriamente!'); 
   res.redirect('/administracion/cursos')
});

router.get('/cursos/edit/:id', isLoggedIn, async (req,res) => {
   console.log(req.params.nombre);
   const { id } = req.params;
   const cursos = await pool.query('SELECT * FROM cursos WHERE id = ?', [id] );
   console.log(cursos[0]);
   res.render('crud_admin/cursos/edit', {curso : cursos[0]});
});
router.post('/cursos/edit/:id', isLoggedIn, async ( req , res ) => {
   const{id} = req.params;
   const { nombre_curso,cant_alumnos,id_colegio} = req.body;
   const cursoNuevo ={
      nombre_curso,
      cant_alumnos,
      id_colegio
   };
   await pool.query('UPDATE cursos set ? WHERE id = ?', [cursoNuevo, id])
   req.flash('success', 'Curso actualizado satisfactoriamente!');
   res.redirect('/administracion/cursos')
});
module.exports = router; 