package Clases;

import Interfaz.MenuPrincipal;
import Interfaz.MostrarCiudades;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
//MAPA DE LAS CIUDADES QUE IMPLEMENTA LOS METODOS DE LA INTERFACE REPORTE
public class MapaCiudades implements Reporte {

    private HashMap<String, Ciudad> ciudades;

    public MapaCiudades() {
        ciudades = new HashMap<String, Ciudad>(); //instancia de arraylist de ciudades
    }

    public boolean modificarCiudad(Ciudad C) {
        if (ciudades.containsKey(C.getCodigoPostal())) {

            ciudades.put(C.getCodigoPostal(), C);
            return true;
        }
        return false;
    }

    public Ciudad getCiudad(String codigo) {

        if (ciudades.containsKey(codigo)) {
            return ciudades.get(codigo);
        }
        return null;
    }

    public boolean agregarCiudad(Ciudad C) {
        if (!ciudades.containsKey(C.getCodigoPostal())) {
            ciudades.put(C.getCodigoPostal(), C);
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
    public boolean eliminarCiudad(String codigo) {
        if (ciudades.containsKey(codigo)) {
            ciudades.remove(codigo);
            return true;
        }
        return false;
    }

    public boolean ciudadesVacio() {
        return ciudades.isEmpty();
    }

    public int cantidadCiudades() {
        return ciudades.size();
    }

    public boolean existeCiudad(String text) {
        return ciudades.containsKey(text);
    }
    public Ciudad getCiudad(int i) {
        HashMap<String, Ciudad> P = new HashMap<String, Ciudad>();
        
        int j =0;
        P = MenuPrincipal.SH.getCiudades().ciudades;

        Set<String> keys = P.keySet();
        for (String key : keys) {
            if(i==j){
              Ciudad C = P.get(key);
              return C;
            }
          j++;         

        }
        return null;
    }
//METODO 1 DE LA INTERFACE
    @Override
    public void generarReporteTxt(String nombre) {
        FileWriter w = null;
        try {
            MapaCiudades LC = MenuPrincipal.SH.getCiudades();
            File f;
            f = new File(nombre);
            w = new FileWriter(f);
            BufferedWriter bw = new BufferedWriter(w);

            HashMap<String, Ciudad> P = new HashMap<String, Ciudad>();
            String[] dato = new String[4];

            P = MenuPrincipal.SH.getCiudades().ciudades;

            Set<String> keys = P.keySet();
            for (String key : keys) {
                Ciudad C = P.get(key);

                dato[0] = C.getNombre();
                dato[1] = C.getRegion();
                dato[2] = C.getCodigoPostal();

                try {

                    bw.write("ID: " + dato[0]);
                    bw.newLine();
                    bw.write("COD SALA: " + dato[1]);
                    bw.newLine();
                    bw.write("RUT PACIENTE: " + dato[2]);
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
        MostrarCiudades MC = new MostrarCiudades();
        MC.setVisible(true);
    }

    
}
