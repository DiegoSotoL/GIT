/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Clases;

import Interfaz.ElegirCiudad;
import Interfaz.ElegirDoctor;
import Interfaz.ElegirHospital;
import Interfaz.MenuPrincipal;
import Interfaz.MostrarCiudades;
import Interfaz.MostrarConsultas;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
//LISTA DE CONSULTAS QUE IMPLEMETA LOS METODOS DE LA INTERFACE REPORTE
public class ListaConsultas implements Reporte {

    private ArrayList<Consulta> consultas;

    //CONSTRUCTORES
    public ListaConsultas() {
        consultas = new ArrayList<Consulta>(); //instancia de arraylist de consultas
    }

	//M�TODOS
    public boolean modificarConsulta(Consulta C) {
        if (existeConsulta(C.getIdConsulta())) {

            consultas.set(entregaPosicionConsulta(C.getIdConsulta()), C);
            return true;
        }
        return false;
    }

    public Consulta getConsulta(String codigo) {

        return consultas.get(entregaPosicionConsulta(codigo));
    }

    public Consulta getConsulta(int i) {

        return consultas.get(i);
    }

    public boolean agregarConsulta(Consulta C) {
        if (existeConsulta(C.getIdConsulta()) == false) {
            consultas.add(C);
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
    public boolean eliminarConsulta(String codigo) {
        if (existeConsulta(codigo)) {
            consultas.remove(entregaPosicionConsulta(codigo));
            return true;
        }
        return false;
    }

    public boolean consultasVacio() {
        if (consultas.isEmpty()) {
            return true;
        }
        return false;
    }

    public int entregaPosicionConsulta(String id) {

        int entrega = 0;
        for (int i = 0; i < consultas.size(); i++) {
            if (consultas.get(i).getIdConsulta().equals(id)) {
                entrega = i;
            }
        }
        return entrega;
    }

    public int cantidadConsultas() {
        return consultas.size();
    }

    public boolean existeConsulta(String codigo) {

        for (int i = 0; i < consultas.size(); i++) {
            if (consultas.get(i).getIdConsulta().equals(codigo)) {
                return true;
            }
        }
        return false;
    }
    //METODO 1 DE LA INTERFACE
    @Override
    public void generarReporteTxt(String nombre) {
        String cod = ElegirCiudad.codCiudad;
        String codHospital = ElegirHospital.rolHospital;
        String rutDoc = ElegirDoctor.rutDoctor;

        FileWriter w = null;
        try {
            ListaConsultas LC = MenuPrincipal.SH.getCiudades().getCiudad(cod).getHospitales().getHospital(codHospital).getDoctores().getDoctor(rutDoc).getConsultas();
            File f;
            f = new File("Consultas del doctor " + MenuPrincipal.SH.getCiudades().getCiudad(cod).getHospitales().getHospital(codHospital).getDoctores().getDoctor(rutDoc).getNombre()+".txt");
            w = new FileWriter(f);
            BufferedWriter bw = new BufferedWriter(w);
            for (int i = 0; i < LC.cantidadConsultas(); i++) {

                try {

                    bw.write("ID: " + LC.getConsulta(i).getIdConsulta());
                    bw.newLine();
                    bw.write("COD SALA: " + LC.getConsulta(i).getCodSala());
                    bw.newLine();
                    bw.write("RUT PACIENTE: " + LC.getConsulta(i).getRutPaciente());
                    bw.newLine();
                    bw.write("RUT DOCTOR: " + LC.getConsulta(i).getRutDoctor());
                    bw.newLine();
                    bw.write("FECHA/HORA: " + LC.getConsulta(i).getFechaHora());
                    bw.newLine();
                    bw.write("MOTIVO: " + LC.getConsulta(i).getMotivoConsulta());
                    bw.newLine();
                    bw.newLine();
                } catch (IOException e) {
                };

            }
            bw.close();

            // TODO add your handling code here:
        } catch (IOException ex) {
            Logger.getLogger(MostrarCiudades.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            try {
                w.close();
            } catch (IOException ex) {
                Logger.getLogger(MostrarCiudades.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }
    //METODO 2 DE LA INTERFACE
    @Override
    public void generarReportePorPantalla() {
        MostrarConsultas MC = new MostrarConsultas();
        MC.setVisible(true);
    }
}
