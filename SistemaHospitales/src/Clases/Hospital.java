/*
la clase hospital posee 6 variables, nombre (string), dirección (string), numeroRol (string), ListaPacientes, ListaSalas
, ListaDoctor, además provee los getter y setter para cada uno de sus atributos y el constructor de tipo Hospital
, donde se instancia una ListaPacientes, una ListaSalas y una ListaDoctores.
 */
package Clases;

public class Hospital {

    private String nombre;
    private String direccion;
    private String numeroRol;
    private ListaPacientes pacientes;
    private ListaSalas salas;
    private ListaDoctores doctores;

    public String getNombre(){
        return nombre;
        
    }
    
    public ListaDoctores getDoctores() {
        ListaDoctores LD =new ListaDoctores();
        LD= doctores;
        return LD;
    }

    public void setDoctores(ListaDoctores doctores) {
        this.doctores = doctores;
    }

    public ListaPacientes getPacientes() {
        ListaPacientes LP =new ListaPacientes();
        LP=pacientes;
        return LP;
    }

    public void setPacientes(ListaPacientes pacientes) {
        this.pacientes = pacientes;
    }

    public ListaSalas getSalas() {
        ListaSalas LS = new ListaSalas();
        LS= salas;
        return LS;
    }

    public void setSalas(ListaSalas salas) {
        this.salas = salas;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getNumeroRol() {
        return numeroRol;
    }

    public void setNumeroRol(String numeroRol) {
        this.numeroRol = numeroRol;
    }

    

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Hospital(String nombre, String direccion, String numeroRol) {//constructor de objeto hospital
        this.nombre = nombre;
        this.direccion = direccion;
        this.numeroRol = numeroRol;
        pacientes = new ListaPacientes();
        salas = new ListaSalas();
        doctores = new ListaDoctores();
    }

}
