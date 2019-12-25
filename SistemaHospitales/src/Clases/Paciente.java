/*la clase paciente posee 3 variables rut y nombre (ambos string heredados de persona y edad (int), además provee los getter 
y setter para cada uno de sus atributos, el constructor del objeto Paciente y posee un método sobrescrito de su clase padre
, el cual muestra todos sus atributos*/
package Clases;

import javax.swing.JOptionPane;

public class Paciente extends Persona {

    
    private int edad;
    private String telefono;

    public Paciente() {
    super("","");
        this.edad = 0;
        this.telefono="";

    
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    

    public int getEdad() {
        return edad;
    }

    public void setEdad(int edad) {
        this.edad = edad;
    }
    @Override
    public void mostrarDatos(){ //metodo sobreescrito de la clase padre(persona)
        System.out.println("Nombre: "+getNombre());
        System.out.println("Rut: "+getRut());
        System.out.println("Edad: "+edad);
        
    }

    public Paciente(String rut, String nombre, int edad, String telefono) { //constructor de objeto paciente
        super(rut,nombre);
        this.edad = edad;
        this.telefono=telefono;

    }

    @Override
    public void contactarPersona() {
        
        JOptionPane.showMessageDialog(null, "El Paciente " + this.getNombre() + " ,solo se puede contactar al telefono: " + telefono);
    }

}
