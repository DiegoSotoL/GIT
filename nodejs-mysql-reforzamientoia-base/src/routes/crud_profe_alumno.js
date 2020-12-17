const express = require('express');
const router = express.Router();


const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/alumnos/add', async (req,res) =>{
   const cursos = await pool.query('SELECT * FROM cursos');
   res.render('crud_profe/alumnos/add',{cursos:cursos});
});

router.post('/alumnos/add', async (req,res) =>{
   function getID(val){
      id = val.charAt(0)
      return id
   }
   const { rut,nombre_completo,telefono,correo} = req.body;
   const id_curso = getID(req.body.id_curso)
   const alumnoNuevo ={
      rut,
      nombre_completo,
      telefono,
      correo,
      id_curso
   };
   await pool.query('INSERT INTO alumnos set ?', [alumnoNuevo]);
   req.flash('success', 'Alumno guardado satisfactoriamente!');
   res.redirect('/profesores/alumnos')
 });

 router.get('/alumnos', async (req,res) => {
   const alumnos = await pool.query('SELECT * FROM alumnos');
   resultArray = JSON.parse(JSON.stringify(alumnos));


  var nombresCursos = []

  for (i = 0; i < resultArray.length; i++) {
    console.log(resultArray[i].id_curso)
    nombre = await pool.query('SELECT nombre_curso FROM cursos WHERE id = ' + resultArray[i].id_curso);
    nombresCursos.push(nombre)

  }
  for (i = 0; i < nombresCursos.length; i++) {
    console.log(nombresCursos[i][0].nombre_curso)
    resultArray[i].id_curso = nombresCursos[i][0].nombre_curso
  }
   res.render('crud_profe/alumnos/list',{ alumnos:resultArray});
 });

 router.get('/alumnos/delete/:id', async(req,res) => {
   console.log(req.params.id);
   const { id } = req.params;
   await pool.query('DELETE FROM alumnos WHERE id = ?',[id]);
   req.flash('success', 'Alumno eliminado satisfactoriamente!'); 
   res.redirect('/profesores/alumnos')
});

router.get('/alumnos/edit/:id', async (req,res) => {
   console.log(req.params.nombre);
   const { id } = req.params;
   const alumnos = await pool.query('SELECT * FROM alumnos WHERE id = ?', [id] );
   console.log(alumnos[0]);
   res.render('crud_profe/alumnos/edit', {alumno : alumnos[0]});
});
router.get('/alumnos/performance/:id', async (req,res) => {
   enero= []
   febrero= []
   marzo= []
   abril= []
   mayo= []
   junio= []
   julio= []
   agosto= []
   septiembre= []
   octubre= []
   noviembre= []
   diciembre= []
   console.log(req.params.nombre);
   const { id } = req.params;
   const alumnos = await pool.query('SELECT * FROM alumnos WHERE id = ?', [id] );
   rutAlumno = alumnos[0].rut
   const user = await pool.query('SELECT * FROM users WHERE rut = ?', [rutAlumno] );
   idUser = user[0].id
   const dataUser = await pool.query('SELECT * FROM data_user WHERE id_user = ?', [idUser] );
   for(i=0;i<dataUser.length;i++){
      console.log(dataUser[i].fecha_intento.getMonth())
         if(dataUser[i].fecha_intento.getMonth()+1==1){
            enero.push(dataUser[i])
         }
         if(dataUser[i].fecha_intento.getMonth()+1==2){
            febrero.push(dataUser[i])
         }
         if(dataUser[i].fecha_intento.getMonth()+1==3){
            marzo.push(dataUser[i])
         }
         if(dataUser[i].fecha_intento.getMonth()+1==4){
            abril.push(dataUser[i])
         }
         if(dataUser[i].fecha_intento.getMonth()+1==5){
            mayo.push(dataUser[i])
         }
         if(dataUser[i].fecha_intento.getMonth()+1==6){
            junio.push(dataUser[i])
         }
         if(dataUser[i].fecha_intento.getMonth()+1==7){
            julio.push(dataUser[i])
         }
         if(dataUser[i].fecha_intento.getMonth()+1==8){
            agosto.push(dataUser[i])
         }
         if(dataUser[i].fecha_intento.getMonth()+1==9){
            septiembre.push(dataUser[i])
         }
         if(dataUser[i].fecha_intento.getMonth()+1==10){
            octubre.push(dataUser[i])
         }
         if(dataUser[i].fecha_intento.getMonth()+1==11){
            noviembre.push(dataUser[i])
         }
         if(dataUser[i].fecha_intento.getMonth()+1==12){
            diciembre.push(dataUser[i])            
         }        
         
   }
   eneroPasar = []
   for (i=0;i<enero.length;i++){
      mod1 = enero[i].res_bue_mod1
      
      respuestasBuenas = parseInt(enero[i].res_bue_mod1, 10)+parseInt(enero[i].res_bue_mod2, 10)+parseInt(enero[i].res_bue_mod3, 10)
      eneroPasar.push({x:enero[i].fecha_intento.getDate(), y: respuestasBuenas}) 
   }
   console.log(enero[0].fecha_intento.getDate())
   console.log(eneroPasar)
   
   res.render('crud_profe/alumnos/performance', {eneroPasar : eneroPasar});
});
router.get('/alumnos/addnota/:id', async (req,res) => {
   
   res.render('crud_profe/notas/list');
});
router.post('/alumnos/edit/:id', async ( req , res ) => {
   const{id} = req.params;
   const { rut,nombre_completo,telefono,correo,id_curso} = req.body;
   const alumnoNuevo ={
      rut,
      nombre_completo,
      telefono,
      correo,
      id_curso
   };
   await pool.query('UPDATE alumnos set ? WHERE id = ?', [alumnoNuevo, id])
   req.flash('success', 'Alumno actualizado satisfactoriamente!');
   res.redirect('/profesores/alumnos')
});
module.exports = router; 