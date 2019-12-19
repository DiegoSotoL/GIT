//esta clase se encarga de realizar la conexion con la base de datos
package Clases;

import com.mysql.jdbc.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Conectar {
//EN ESTA CLASE SE APLICA EL PATRON SINGLETON PARA TENER UNA UNICA INSTANCIA DE CONECTAR
    private static Connection conn;
    private String driver = "com.mysql.jdbc.Driver";
    private String user = "root";
    private String password = "";
    private String url = "jdbc:mysql://localhost:3306/basesh";

    private Conectar() {
        try {
            String driver = "com.mysql.jdbc.Driver";
            String user = "root";
            String password = "";
            String url = "jdbc:mysql://localhost:3306/basesh";

            Class.forName(driver);
            try {
                conn = (Connection) DriverManager.getConnection(url, user, password);
            } catch (SQLException ex) {
                Logger.getLogger(Conectar.class.getName()).log(Level.SEVERE, null, ex);
            }
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(Conectar.class.getName()).log(Level.SEVERE, null, ex);
        }

    }

    //SI LA CONECCION NO ESTA INSTANCIADA SE CREA LA CONECCION CON EL CONSTRUCTOR CONECATR, EN EL CASO CONTRARIO SOLAMENTE OBTIENE LA CONECCION
    public static Connection getConnection() {
        if (conn == null) {
            new Conectar();
        }
        return conn;
    }

    public void desconectar() {
        //REALIZA EL TERMINO DE LA CONECCION
        conn = null;
        if (conn == null) {
            System.out.println("CONEXION FINALIZADA");
        }

    }
}
