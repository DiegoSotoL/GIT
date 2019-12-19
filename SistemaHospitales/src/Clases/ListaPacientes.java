/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Clases;

import java.util.ArrayList;


public class ListaPacientes {

    private ArrayList<Paciente> pacientes;

    public ListaPacientes() {
        pacientes = new ArrayList<Paciente>();  //instancia de arraylist de pacientes
    }

    public boolean modificarPaciente(Paciente P) {
        if (existePaciente(P.getRut())) {

            pacientes.set(entregaPosicionPaciente(P.getRut()), P);
            return true;
        }
        return false;
    }

    public Paciente getPaciente(String codigo) {

        return pacientes.get(entregaPosicionPaciente(codigo));
    }

    public Paciente getPaciente(int i) {

        return pacientes.get(i);
    }

    public boolean agregarPaciente(Paciente P) {
        if (existePaciente(P.getRut()) == false) {
            pacientes.add(P);
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
    public boolean eliminarCPaciente(String codigo) {
        if (existePaciente(codigo)) {
            pacientes.remove(entregaPosicionPaciente(codigo));
            return true;
        }
        return false;
    }

    public boolean pacientesVacio() {
        return pacientes.isEmpty();
    }

    public int entregaPosicionPaciente(String rut) {

        int entrega = 0;
        for (int i = 0; i < pacientes.size(); i++) {
            if (pacientes.get(i).getRut().equals(rut)) {
                entrega = i;
            }
        }
        return entrega;
    }

    public int cantidadPacientes() {
        return pacientes.size();
    }

    public boolean existePaciente(String codigo) {

        for (int i = 0; i < pacientes.size(); i++) {
            if (pacientes.get(i).getRut().equals(codigo)) {
                return true;
            }
        }
        return false;
    }
}
