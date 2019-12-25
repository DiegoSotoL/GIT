/*la clase ciudad posee 4 variables nombre (string), región (string), codigoPostal (string) y una ListaHospitales
,ademáss provee los getter y setter para cada uno de sus atributos y el constructor de tipo ciudad donde se instancia una ListaHospitales*/
package Clases;

public class Ciudad {

    private String nombre;
    private String region;
    private String codigoPostal;
    private ListaHospitales hospitales;

    public ListaHospitales getHospitales() {
        ListaHospitales LH= new ListaHospitales();
        LH=hospitales;
        return LH;
    }

    public void setHospitales(ListaHospitales hospitales) {
        this.hospitales = hospitales;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getCodigoPostal() {
        return codigoPostal;
    }

    public void setCodigoPostal(String codigoPostal) {
        this.codigoPostal = codigoPostal;
    }

    public Ciudad(String nombre, String region, String codigoPostal) { //constructor de objeto ciudad
        this.nombre = nombre;
        this.region = region;
        this.codigoPostal = codigoPostal;
        hospitales = new ListaHospitales();

    }

}
