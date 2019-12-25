/*
la clase Consulta posee 6 variables idConsulta (string), codSala (string), rutPacientes (string), rutDoctor (string), fechaHora (string), 
y motivoConsulta (string), además provee los getter y setter para cada uno de sus atributos y el constructor del objeto Consulta.
 */
package Clases;

public class Consulta {

    private String idConsulta;
    private String codSala;
    private String rutPaciente;
    private String rutDoctor;
    private String fechaHora;
    private String motivoConsulta;

    public String getIdConsulta() {
        return idConsulta;
    }

    public void setIdConsulta(String idConsulta) {
        this.idConsulta = idConsulta;
    }

    public String getCodSala() {
        return codSala;
    }

    public void setCodSala(String codSala) {
        this.codSala = codSala;
    }

    public String getRutPaciente() {
        return rutPaciente;
    }

    public void setRutPaciente(String rutPaciente) {
        this.rutPaciente = rutPaciente;
    }

    public String getRutDoctor() {
        return rutDoctor;
    }

    public void setRutDoctor(String rutDoctor) {
        this.rutDoctor = rutDoctor;
    }

    public String getFechaHora() {
        return fechaHora;
    }

    public void setFechaHora(String fechaHora) {
        this.fechaHora = fechaHora;
    }

    public String getMotivoConsulta() {
        return motivoConsulta;
    }

    public void setMotivoConsulta(String motivoConsulta) {
        this.motivoConsulta = motivoConsulta;
    }

    public Consulta(String idConsulta, String codSala, String rutPaciente, String rutDoctor, String fechaHora, String motivoConsulta) { //constructor de objeto consulta
        this.idConsulta = idConsulta;
        this.codSala = codSala;
        this.rutPaciente = rutPaciente;
        this.rutDoctor = rutDoctor;
        this.fechaHora = fechaHora;
        this.motivoConsulta = motivoConsulta;
    }

}
