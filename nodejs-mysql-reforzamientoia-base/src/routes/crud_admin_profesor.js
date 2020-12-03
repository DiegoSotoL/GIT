const express = require('express');
const router = express.Router();


const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/profesores/add', async (req,res) =>{
   const cursos = await pool.query('SELECT * FROM cursos');
   res.render('crud_admin/profesores/add',{cursos:cursos});
});

router.post('/profesores/add', async (req,res) =>{
   function getID(val){
      id = val.charAt(0)
      return id
   }
   const { rut,nombre_completo,telefono,correo} = req.body;
   const id_curso = getID(req.body.id_curso)
   const profesorNuevo ={
      rut,
      nombre_completo,
      telefono,
      correo,
      id_curso
   };
   await pool.query('INSERT INTO profesores set ?', [profesorNuevo]);
   req.flash('success', 'Profesor guardado satisfactoriamente!');
   res.redirect('/administracion/profesores')
 });

 router.get('/profesores', async (req,res) => {
   const profesores = await pool.query('SELECT * FROM profesores');
   resultArray = JSON.parse(JSON.stringify(profesores));


  var cursos = []

  for (i = 0; i < resultArray.length; i++) {
    console.log(resultArray[i].id_curso)
    nombre = await pool.query('SELECT nombre_curso FROM cursos WHERE id = ' + resultArray[i].id_curso);
    cursos.push(nombre)

  }
  for (i = 0; i < cursos.length; i++) {
    console.log(cursos[i][0].nombre_completo)
    resultArray[i].id_curso = cursos[i][0].nombre_curso
  }
   res.render('crud_admin/profesores/list',{ profesores:resultArray });
 });

 router.get('/profesores/delete/:id', async(req,res) => {
   console.log(req.params.id);
   const { id } = req.params;
   await pool.query('DELETE FROM profesores WHERE id = ?',[id]);
   req.flash('success', 'Profesor eliminado satisfactoriamente!'); 
   res.redirect('/administracion/profesores')
});

router.get('/profesores/edit/:id', async (req,res) => {
   console.log(req.params.nombre);
   const { id } = req.params;
   const profesores = await pool.query('SELECT * FROM profesores WHERE id = ?', [id] );
   console.log(profesores[0]);
   res.render('crud_admin/profesores/edit', {profesor : profesores[0]});
});
router.post('/profesores/edit/:id', async ( req , res ) => {
   const{id} = req.params;
   const { rut,nombre_completo,telefono,correo,id_curso} = req.body;
   const profesorNuevo ={
      rut,
      nombre_completo,
      telefono,
      correo,
      id_curso
   };
   await pool.query('UPDATE profesores set ? WHERE id = ?', [profesorNuevo, id])
   req.flash('success', 'Profesor actualizado satisfactoriamente!');
   res.redirect('/administracion/profesores')
});
module.exports = router; 