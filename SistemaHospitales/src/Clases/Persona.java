/*: clase abstracta que posee 2 variables rut (string) y nombre (string) además provee los getter y setter para cada uno de sus atributos, el constructor de tipo persona, un metodo mostrar datos, el cual imprime por consola los datos de la persona. Esta clase se hereda a las clases hijas. Y un método abstracto llamado contactar persona, este contacta a doctores y pacientes de manera distinta.*/
package Clases;

public abstract class Persona {

    private String rut;
    private String nombre;

    public String getNombre() {
        return nombre;
    }

    public String getRut() {
        return rut;
    }

    public Persona(String rut, String nombre) {
        this.rut = rut;
        this.nombre = nombre;

    }

    public void mostrarDatos() {

        System.out.println("Nombre: " + nombre);
        System.out.println("Rut: " + rut);
    }
    //METODO VALIDAR RUT EL CUAL SE HEREDA A PACIENTE Y A DOCTOR
    public boolean validarRut() {
        Boolean lDevuelve = false;
        int Ult = this.rut.length();
        int Largo = this.rut.length() - 2;
        int Constante = 2;
        int Suma = 0;
        int Digito = 0;

        for (int i = Largo; i >= 0; i--) {
            System.out.println(this.rut.substring(i, i + 1));
            Suma = Suma + Integer.parseInt(this.rut.substring(i, i + 1)) * Constante;
            Constante = Constante + 1;
            if (Constante == 8) {
                Constante = 2;
            }
        }
        String Ultimo = this.rut.substring(Ult - 1).toUpperCase();
        Digito = 11 - (Suma % 11);
        if (Digito == 10 && Ultimo.equals("K")) {
            lDevuelve = true;
        } else {
            if (Digito == 11 && Ultimo.equals("0")) {
                lDevuelve = true;
            } else {

                if (Digito == Integer.parseInt(Ultimo)) {

                    lDevuelve = true;

                }

            }

        }
        return lDevuelve;
    }
    //METODO ABSTARCTO QUE CONTACTA A LAS PERSONAS MEDIANTE CORREO(DOCTOR) Y TELEFONO(PACIENTE)
    public abstract void contactarPersona();
}
