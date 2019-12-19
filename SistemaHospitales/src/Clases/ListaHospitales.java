package Clases;

import java.util.ArrayList;

public class ListaHospitales {

    private ArrayList<Hospital> hospitales;

    public ListaHospitales() {
        hospitales = new ArrayList<Hospital>();  //instancia de arraylist de hospitales
    }

    public boolean modificarHospital(Hospital H) {
        if (existeHospital(H.getNumeroRol())) {

            hospitales.set(entregaPosicionHospital(H.getNumeroRol()), H);
            return true;
        }
        return false;
    }

    public Hospital getHospital(String codigo) {

        return hospitales.get(entregaPosicionHospital(codigo));
    }

    public Hospital getHospital(int i) {

        return hospitales.get(i);
    }

    public boolean agregarHospital(Hospital H) {
        if (existeHospital(H.getNumeroRol()) == false) {
            hospitales.add(H);
            return true;
        } else {
            return false;
        }
    }

    /*METODO DE SOBRECARGA?????
     public void agregarCiudad(int codigo, String nombre) 
     {
     Ciudad nuevo; 	
     nuevo = new Ciudad(codigo,nombre);
     cursos.add(nuevo);
     }
     */
    public boolean eliminarHospital(String codigo) {
        if (existeHospital(codigo)) {
            hospitales.remove(entregaPosicionHospital(codigo));
            return true;
        }
        return false;
    }

    public boolean hospitalVacio() {
        return hospitales.isEmpty();
    }

    public int entregaPosicionHospital(String rol) {

        int entrega = 0;
        for (int i = 0; i < hospitales.size(); i++) {
            if (hospitales.get(i).getNumeroRol().equals(rol)) {
                entrega = i;
            }
        }
        return entrega;
    }

    public int cantidadHospitales() {
        return hospitales.size();
    }

    public boolean existeHospital(String codigo) {

        for (int i = 0; i < hospitales.size(); i++) {
            if (hospitales.get(i).getNumeroRol().equals(codigo)) {
                return true;
            }
        }
        return false;
    }
}
