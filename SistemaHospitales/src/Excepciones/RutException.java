//EXCEPCION QUE REVISA LSO ERRORES AL MOMENTO DE INICIAR SESION COMO ADMINISTRADOR
//CASO1:RUT NO VALIDO SEGUN ALGORITMO DE VALIDACION DE RUT(MODULO)
//CASO2:FALTAN CARACTERES EN EL RUT INGRESADO
//CASO3:SOBREAN CARACTERES EN EL RUT INGRESADO
package Excepciones;


public class RutException extends Exception{
     
    private int codigoError;
     
    public RutException(int codigoError){
        super();
        this.codigoError=codigoError;
    }
     
    @Override
    public String getMessage(){
         
        String mensaje="";
         
        switch(codigoError){
            case 1:
                mensaje="Error, rut no valido";
                break;
            case 2:
                mensaje="Error, faltan caracteres del rut";
                break;
            case 3:
                mensaje="Error, sobran caracteres del rut";
                break;
        }
         
        return mensaje;
         
    }
     
}
