/*posee una instancia de listaciudades y posee un método main el cual instancia una ventana menú principal.*/

package Clases;

import Interfaz.MenuPrincipal;

public class SistemaHospitales {

    private MapaCiudades ciudades;

    public SistemaHospitales() {
        ciudades = new MapaCiudades();

    }

    public MapaCiudades getCiudades() {
        return ciudades;
    }

    public void setCiudades(MapaCiudades ciudades) {
        this.ciudades = ciudades;
    }
     public static void main (String [ ] args) {//metodo main del programa que abre una ventana menuprincipal
     
         MenuPrincipal MP = new MenuPrincipal();
         MP.setVisible(true);
     }
     
}


