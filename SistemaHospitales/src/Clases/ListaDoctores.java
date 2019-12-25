/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Clases;

import Interfaz.ElegirCiudad;
import Interfaz.ElegirHospital;
import Interfaz.MenuPrincipal;
import Interfaz.MostrarCiudades;
import Interfaz.MostrarDoctor;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

public class ListaDoctores  {

    private ArrayList<Doctor> doctores;

    public ListaDoctores() {
        doctores = new ArrayList<Doctor>();  //instancia de arraylist de doctores

    }

    public boolean modificarDoctor(Doctor D) {
        if (existeDoctor(D.getRut())) {

            doctores.set(entregaPosicionDoctor(D.getRut()), D);
            return true;
        }
        return false;
    }

    public Doctor getDoctor(String codigo) {

        return doctores.get(entregaPosicionDoctor(codigo));
    }

    public Doctor getDoctor(int i) {

        return doctores.get(i);
    }

    public boolean agregarDoctor(Doctor D) {
        if (existeDoctor(D.getRut()) == false) {
            doctores.add(D);
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
    public boolean eliminarDoctor(String codigo) {
        if (existeDoctor(codigo)) {
            doctores.remove(entregaPosicionDoctor(codigo));
            return true;
        }
        return false;
    }

    public boolean doctorVacio() {
        return doctores.isEmpty();
    }

    public int entregaPosicionDoctor(String codigo) {

        int entrega = 0;
        for (int i = 0; i < doctores.size(); i++) {
            if (doctores.get(i).getRut().equals(codigo)) {
                entrega = i;
            }
        }
        return entrega;
    }

    public int cantidadDoctores() {
        return doctores.size();
    }

    public boolean existeDoctor(String codigo) {

        for (int i = 0; i < doctores.size(); i++) {
            if (doctores.get(i).getRut().equals(codigo)) {
                return true;
            }
        }
        return false;
    }

   
}
