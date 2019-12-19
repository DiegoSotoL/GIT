package Clases;

import java.util.ArrayList;

public class ListaSalas {

    private ArrayList<Sala> salas;

    public ListaSalas() {
        salas = new ArrayList<Sala>();  //instancia de arraylist de salas
    }

    public boolean modificarSala(Sala S) {
        if (existeSala(S.getCod())) {

            salas.set(entregaPosicionSala(S.getCod()), S);
            return true;
        }
        return false;
    }

    public Sala getSala(String codigo) {

        return salas.get(entregaPosicionSala(codigo));
    }

    public Sala getSala(int i) {

        return salas.get(i);
    }

    public boolean agregarSala(Sala S) {
        if (existeSala(S.getCod()) == false) {
            salas.add(S);
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
    public boolean eliminarSala(String codigo) {
        if (existeSala(codigo)) {
            salas.remove(entregaPosicionSala(codigo));
            return true;
        }
        return false;
    }

    public boolean salasVacio() {
        if (salas.isEmpty()) {
            return true;
        }
        return false;
    }

    public int entregaPosicionSala(String cod) {

        int entrega = 0;
        for (int i = 0; i < salas.size(); i++) {
            if (salas.get(i).getCod().equals(cod)) {
                entrega = i;
            }
        }
        return entrega;
    }

    public int cantidadSalas() {
        return salas.size();
    }

    public boolean existeSala(String codigo) {

        for (int i = 0; i < salas.size(); i++) {
            if (salas.get(i).getCod().equals(codigo)) {
                return true;
            }
        }
        return false;
    }
}
