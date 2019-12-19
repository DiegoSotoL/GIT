/*
la clase Sala posee 3 variables cod (string), ubicación (string), y cantCamillas (int), además provee los getter 
y setter para cada uno de sus atributos y el constructor del objeto Sala.
 */
package Clases;


public class Sala {

    private String cod;
    private String ubicacion;
    private int cantCamillas;

    public String getCod() {
        return cod;
    }

    public void setCod(String cod) {
        this.cod = cod;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public int getCantCamillas() {
        return cantCamillas;
    }

    public void setCantCamillas(int cantCamillas) {
        this.cantCamillas = cantCamillas;
    }

    public Sala(String cod, String ubicacion, int cantCamillas) {//constructor de objeto sala
        this.cod = cod;
        this.ubicacion = ubicacion;
        this.cantCamillas = cantCamillas;
    }

}
