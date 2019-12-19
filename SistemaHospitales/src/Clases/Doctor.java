/*
la clase Doctor posee 5 variables rut y nombre (ambos string heredados de persona), contacto (string), especialidad (string), salaAtencion (string) 
y una ListaConsultas, además provee los getter y setter para cada uno de sus atributos, el constructor de tipo Doctor donde se 
instancia una ListaConsultas y posee un método sobrescrito de su clase padre, el cual muestra todos sus atributos.
 */
package Clases;

import Excepciones.RutException;
import Interfaz.MandarCorreoAdmin;
import javax.swing.JOptionPane;

public class Doctor extends Persona{
    private String contacto;
    private String especialidad;
    private String salaAtencion;
    private ListaConsultas consultas;

    public Doctor() {
        super("","");
        this.contacto = "";
        this.especialidad = "";
        this.salaAtencion = "";
        consultas = new ListaConsultas();
    }

    public ListaConsultas getConsultas() {
        ListaConsultas LC = new ListaConsultas();
        LC=consultas;
        return LC;
    }

    public void setConsultas(ListaConsultas consultas) {
        this.consultas = consultas;
    }

    
    public String getContacto() {
        return contacto;
    }

    public void setContacto(String contacto) {
        this.contacto = contacto;
    }

    public String getEspecialidad() {
        return especialidad;
    }

    public void setEspecialidad(String especialidad) {
        this.especialidad = especialidad;
    }

    public String getSalaAtencion() {
        return salaAtencion;
    }

    public void setSalaAtencion(String salaAtencion) {
        this.salaAtencion = salaAtencion;
    }
    
    @Override
    public void mostrarDatos(){     //metodo sobreescrito de la clase padre(persona)
        System.out.println("Nombre: "+getNombre());
        System.out.println("Rut: "+getRut());
        System.out.println("Contacto: "+contacto);
        System.out.println("Especialidad: "+especialidad);
        System.out.println("Sala: "+salaAtencion);
    }

    public Doctor(String rut, String nombre, String contacto, String especialidad, String salaAtencion) {//constructor de objeto doctor
        super(rut,nombre);
        this.contacto = contacto;
        this.especialidad = especialidad;
        this.salaAtencion = salaAtencion;
        consultas = new ListaConsultas();
    }

    @Override
    public void contactarPersona() {
        
        MandarCorreoAdmin MCA = new MandarCorreoAdmin();
        MCA.setVisible(true);
        
    }
   

}
