const express = require('express');
const router = express.Router();
const pool = require('../database');


router.get('/preguntas/add', (req,res) =>{
   res.render('crud_admin/preguntas/add');
});

router.post('/preguntas/add', async (req,res) =>{
   const { pregunta,nivel,ruta_imagen,id_unidad} = req.body;
   const preguntaNueva ={
      pregunta,
      nivel,
      ruta_imagen,
      id_unidad
   };
   await pool.query('INSERT INTO preguntas set ?', [preguntaNueva]);
   req.flash('success', 'Pregunta guardada satisfactoriamente!');
   res.redirect('/administracion/preguntas')
 });

 router.get('/preguntas', async (req,res) => {
   const preguntas = await pool.query('SELECT * FROM preguntas');
   res.render('crud_admin/preguntas/list',{ preguntas });
 });

 router.get('/preguntas/delete/:id', async(req,res) => {
   console.log(req.params.id);
   const { id } = req.params;
   await pool.query('DELETE FROM preguntas WHERE id = ?',[id]);
   req.flash('success', 'Pregunta eliminada satisfactoriamente!'); 
   res.redirect('/administracion/preguntas')
});

router.get('/preguntas/edit/:id', async (req,res) => {
   console.log(req.params.nombre);
   const { id } = req.params;
   const preguntas = await pool.query('SELECT * FROM preguntas WHERE id = ?', [id] );
   console.log(preguntas[0]);
   res.render('crud_admin/preguntas/edit', {pregunta : preguntas[0]});
});
router.post('/preguntas/edit/:id', async ( req , res ) => {
   const{id} = req.params;
   const { pregunta,nivel,ruta_imagen,id_unidad} = req.body;
   const preguntaNueva ={
      pregunta,
      nivel,
      ruta_imagen,
      id_unidad
   };
   await pool.query('UPDATE preguntas set ? WHERE id = ?', [preguntaNueva, id])
   req.flash('success', 'Pregunta actualizada satisfactoriamente!');
   res.redirect('/administracion/preguntas')
});
module.exports = router; 