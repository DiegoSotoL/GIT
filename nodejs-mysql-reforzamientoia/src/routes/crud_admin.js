const express = require('express');
const router = express.Router();


const pool = require('../database');


router.get('/colegios/add', (req,res) =>{
   res.render('crud_admin/colegios/add');
});

router.post('/colegios/add', async (req,res) =>{
   const { nombre,direccion,telefono,correo} = req.body;
   const ColegioNuevo ={
      nombre,
      direccion,
      telefono,
      correo
   }
   await pool.query('INSERT INTO colegios set ?', [ColegioNuevo]);
   res.redirect('/administracion/colegios')
 });

 router.get('/colegios', async (req,res) => {
   const colegios = await pool.query('SELECT * FROM colegios');
   res.render('crud_admin/colegios/list',{ colegios });
 });

 router.get('/colegios/delete/:id', async(req,res) => {
   console.log(req.params.id);
   const { id } = req .params;
   await pool.query('DELETE FROM colegios WHERE id = ?',[id]); 
   res.redirect('/administracion/colegios')
});

module.exports = router; 