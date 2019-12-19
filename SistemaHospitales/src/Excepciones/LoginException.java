//EXCEPCION QUE REVISA LSO ERRORES AL MOMENTO DE INICIAR SESION COMO ADMINISTRADOR
//CASO1:USUARIO INCORRECTO
//CASO2:CONTRASEÑA INCORRECTA
package Excepciones;

public class LoginException extends Exception {
    
    private int codigoError;
     
    public LoginException(int codigoError){
        super();
        this.codigoError=codigoError;
    }
     
    @Override
    public String getMessage(){
         
        String mensaje="";
         
        switch(codigoError){
            case 1:
                mensaje="Error, usuario no registrado";
                break;
            case 2:
                mensaje="Error, contraseña incorrecta";
                break;
            
        }
         
        return mensaje;
         
    }
}
