const mysql = require('mysql');
const {promisify} = require('util');

const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err,connection) =>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('SE HA CERRADO LA CONECCION CON LA BASE DE DATOS');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('LA BASE DE DATOS TIENE DEMASIADAS CONECCIONES');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('CONECCION A LA BASE DE DATOS DENEGADA');
        }
    }

    if(connection) connection.release();
    console.log('BASE DE DATOS CONECTADA')
    return;
});

pool.query = promisify(pool.query);

module.exports = pool;