CREATE DATABASE database_app;

USE database_app;

CREATE TABLE users(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    tipo VARCHAR(60) NOT NULL,
    nombre_completo VARCHAR(100) NOT NULL,
    correo VARCHAR(60) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fecha_creacion timestamp NOT NULL DEFAULT current_timestamp

);
CREATE TABLE colegios(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(60) NOT NULL,
    telefono VARCHAR(60) NOT NULL,
    correo VARCHAR(60) NOT NULL,
    fecha_creacion timestamp NOT NULL DEFAULT current_timestamp
);
CREATE TABLE cursos(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre_curso VARCHAR(100) NOT NULL,
    cant_alumnos INT(11) NOT NULL,
    fecha_creacion timestamp NOT NULL DEFAULT current_timestamp,
    id_colegio INT(11),
    CONSTRAINT fk_colegio_curso FOREIGN KEY (id_colegio) REFERENCES colegios(id)

);
CREATE TABLE alumnos(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    rut VARCHAR(12) NOT NULL, 
    nombre_completo VARCHAR(100) NOT NULL,
    telefono VARCHAR(60) NOT NULL,
    correo VARCHAR(60),
    contraseña VARCHAR(60),
    fecha_creacion timestamp NOT NULL DEFAULT current_timestamp,
    id_curso INT(11),
    CONSTRAINT fk_curso_alumno FOREIGN KEY (id_curso) REFERENCES cursos(id)

);
CREATE TABLE profesores(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    rut VARCHAR(12) NOT NULL, 
    nombre_completo VARCHAR(100) NOT NULL,
    telefono VARCHAR(60) NOT NULL,
    correo VARCHAR(60) NOT NULL,
    fecha_creacion timestamp NOT NULL DEFAULT current_timestamp,
    id_curso INT(11),
    CONSTRAINT fk_curso_profesor FOREIGN KEY (id_curso) REFERENCES cursos(id)

);

CREATE TABLE asignaturas(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre_asignatura VARCHAR(100) NOT NULL,
    fecha_creacion timestamp NOT NULL DEFAULT current_timestamp,
    promedio INT(11) NOT NULL,
    id_profesor INT(11),
    CONSTRAINT fk_profesor_asignatura FOREIGN KEY (id_profesor) REFERENCES profesores(id)
);
CREATE TABLE notas(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre_actividad VARCHAR(100) NOT NULL,
    clasificacion INT(11) NOT NULL,
    fecha_creacion timestamp NOT NULL DEFAULT current_timestamp,
    id_alumno INT(11),
    id_asignatura INT(11),
    CONSTRAINT fk_alumno_nota FOREIGN KEY (id_alumno) REFERENCES alumnos(id),
    CONSTRAINT fk_asignatura_nota FOREIGN KEY (id_asignatura) REFERENCES asignaturas(id)
);
CREATE TABLE unidades(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre_unidad VARCHAR(100) NOT NULL,
    fecha_creacion timestamp NOT NULL DEFAULT current_timestamp,
    id_asignatura INT(11),
    CONSTRAINT fk_asignatura_unidad FOREIGN KEY (id_asignatura) REFERENCES asignaturas(id)
);
CREATE TABLE preguntas(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    pregunta VARCHAR(100) NOT NULL,
    nivel VARCHAR(60) NOT NULL,
    ruta_imagen VARCHAR(60) NOT NULL,
    fecha_creacion timestamp NOT NULL DEFAULT current_timestamp,
    id_unidad INT(11),
    CONSTRAINT fk_unidad_pregunta FOREIGN KEY (id_unidad) REFERENCES unidades(id)
);