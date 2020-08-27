CREATE DATABASE database_app;

USE database_app;

CREATE TABLE colegios(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(60) NOT NULL,
    direccion VARCHAR(60) NOT NULL,
    telefono VARCHAR(60) NOT NULL,
    correo VARCHAR(60) NOT NULL
);
CREATE TABLE cursos(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre_curso VARCHAR(60) NOT NULL,
    cant_alumnos INT(11) NOT NULL,
    id_colegio INT(11),
    CONSTRAINT fk_colegio_curso FOREIGN KEY (id_colegio) REFERENCES colegios(id)

);
CREATE TABLE alumnos(
    rut VARCHAR(12) PRIMARY KEY NOT NULL, 
    nombre_completo VARCHAR(100) NOT NULL,
    telefono VARCHAR(60) NOT NULL,
    correo VARCHAR(60),
    contraseña VARCHAR(60),
    id_curso INT(11),
    CONSTRAINT fk_curso_alumno FOREIGN KEY (id_curso) REFERENCES cursos(id)

);
CREATE TABLE profesores(
    rut VARCHAR(12) PRIMARY KEY NOT NULL, 
    nombre_completo VARCHAR(100) NOT NULL,
    telefono VARCHAR(60) NOT NULL,
    correo VARCHAR(60) NOT NULL,
    contraseña VARCHAR(60) NOT NULL,
    id_curso INT(11),
    CONSTRAINT fk_curso_profesor FOREIGN KEY (id_curso) REFERENCES cursos(id)

);

CREATE TABLE asignaturas(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre_asignatura VARCHAR(60) NOT NULL,
    rut_profesor VARCHAR(12),
    rut_alumno VARCHAR(12),
    promedio INT(11) NOT NULL,
    CONSTRAINT fk_profesor_asignatura FOREIGN KEY (rut_profesor) REFERENCES profesores(rut),
    CONSTRAINT fk_alumno_asignatura FOREIGN KEY (rut_alumno) REFERENCES alumnos(rut)
);
CREATE TABLE notas(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre_actividad VARCHAR(60) NOT NULL,
    clasificacion INT(11) NOT NULL,
    rut_alumno VARCHAR(12),
    id_asignatura INT(11),
    CONSTRAINT fk_alumno_nota FOREIGN KEY (rut_alumno) REFERENCES alumnos(rut),
    CONSTRAINT fk_asignatura_nota FOREIGN KEY (id_asignatura) REFERENCES asignaturas(id)
);
CREATE TABLE unidades(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(60) NOT NULL,
    id_asignatura INT(11),
    CONSTRAINT fk_asignatura_unidad FOREIGN KEY (id_asignatura) REFERENCES asignaturas(id)
);
CREATE TABLE preguntas(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    pregunta VARCHAR(60) NOT NULL,
    nivel VARCHAR(60) NOT NULL,
    ruta_imagen VARCHAR(60) NOT NULL,
    id_unidad INT(11),
    CONSTRAINT fk_unidad_pregunta FOREIGN KEY (id_unidad) REFERENCES unidades(id)
);