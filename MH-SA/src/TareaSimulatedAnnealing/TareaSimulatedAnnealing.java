//METAHEURISTICA DE SIMULATED ANNEALLING
package TareaSimulatedAnnealing;

import java.text.DecimalFormat;

/**
 *
 * @author diego
 */
public class TareaSimulatedAnnealing {

    public static void main(String[] args) {

        //int [] posibleSolucion = {0,0,1,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,1,0,0,1,1};//SOLUCION INICIAL
        int cantCiudades = 36;//cantidad de ciudades
        int[] solucionInicial = new int[cantCiudades]; // instancia de array de enteros que guarda la solucion inical generada randomicamente
        double[] costos = new double[cantCiudades]; //instancia de arreglo de costos
        double costo;// guarda el costo de la solucion factible
        costos = llenarCostos();//rellena el array de costos

        do {//realiza el ciclo hasta encontrar una solucion factible
            for (int i = 0; i < solucionInicial.length; i++) {

                double numero = (double) (Math.random() * 1);// guarda en numero un numero entre 0 y 1

                if (numero > 0.5) { //si el numero es mayor a 0.5 se instala la antena
                    solucionInicial[i] = 1;
                } else {//si el numero es menor a 0.5 no se instala la antena
                    solucionInicial[i] = 0;
                }
            }

        } while (!factible(solucionInicial));//el ciclo termina cuando la solucion obtenida de manera randomica sea factible
        System.out.println("SOLUCION GENERADA RANDOMICAMENTE: ");
        for (int d = 0; d < solucionInicial.length; d++) {
            System.out.print(solucionInicial[d]);
        }
        System.out.println("");
        //solucionInicial guarda la solucion factible
        costo = calcularCosto(solucionInicial, costos);//recibe el costo de la solucion factible
        System.out.println("COSTO SOLUCION RANDOMICA: " + costo);

        int[] mejorSolucion = new int[35];//almacena la solucion encontrada por la metaheuristica
        mejorSolucion = Annealing(solucionInicial, costos);//metodo que devuelve una nueva solucion
        System.out.println("");
        System.out.println("LA SOLUCION ENCONTRADA MEDIANTE LA METAHEURISTICA ES: ");
        //recorrido que muestra la nueva solucion
        for (int i = 0; i < mejorSolucion.length; i++) {
            if (mejorSolucion[i] == 1) {
                if (i < 30) {//condicion puesta ya que el id 32 no se encontraba en el problema
                    System.out.println("id:" + (i + 2));
                } else {
                    System.out.println("id:" + (i + 3));
                }
            }

        }
        System.out.println("COSTO MEJOR SOLUCION ENTERGADA POR MH: " + calcularCosto(mejorSolucion, costos));//imprime la mejor solucion
        System.out.println("");

    }//FINAL MAIN

    public static boolean factible(int[] solucionInicial) {//recibe una solucion cualquiera

        int cantCiudades = 36;//numero de ciudades delrpoblema
        int[][] parametros = new int[cantCiudades][cantCiudades];//instancia de matriz con los parametros de el problema
        boolean[] pertenece = new boolean[36];//arreglo boolean que guarda true si la ciudad esta cubierta
        pertenece = llenarArrayBoolean();
        parametros = llenarParametros(cantCiudades, cantCiudades);//llama la funcion que retorna un array lleno con los parametros

        for (int i = 0; i < solucionInicial.length; i++) {//recorre el arreglo binario de la solucion que se analilza la factibilidad

            if (solucionInicial[i] == 1) {//si se pone una antena lo analiza

                for (int j = 0; j < cantCiudades; j++) {//recorre las coberturas de cada ciudad

                    if (parametros[i][j] == 1) {//se encontro una ciudad que esta en cobertura por lo tanto se verifica que no exista en el conjunto solucion

                        pertenece[j] = true; //la ciudad esta cubierta

                    } else {

                    }

                }

            }
        }
        for (int k = 0; k < pertenece.length; k++) {//si el arreglo booleano posee un false retorna false
            if (!pertenece[k]) {
                return false;
            }
        }
        
        return true; //en el caso de que no encuentre valores false retorna true(solucion factible)

    }

    private static int[][] llenarParametros(int m, int n) {//llena la matriz de coberturas por ciudad

      int[][] parametros = {{1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0},
                            {0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0},
                            {1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0},
                            {1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0},
                            {0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0},
                            {0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
                            {0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
                            {0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
                            {0, 0, 0, 0, 0, 1, 8, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0},
                            {0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
                            {0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
                            {0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0},
                            {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1},
                            {0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0},
                            {0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0},
                            {0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0},
                            {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0},
                            {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0},
                            {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0},
                            {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0},
                            {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
                            {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
                            {0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0},
                            {0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0},
                            {0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0},
                            {0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0},
                            {1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0},
                            {0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0},
                            {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1},
                            {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1},
                            {0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0},
                            {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0},
                            {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0},
                            {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1},
                            {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0},
                            {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1}};
        return parametros;
    }

    private static double[] llenarCostos() {//llena la amtriz de costos
        double[] costos = new double[36];
        costos[0] = 1;
        costos[1] = 1.5;
        costos[2] = 1.2;
        costos[3] = 2;
        costos[4] = 3;
        costos[5] = 2;
        costos[6] = 1;
        costos[7] = 1;
        costos[8] = 3;
        costos[9] = 4;
        costos[10] = 3;
        costos[11] = 3;
        costos[12] = 2;
        costos[13] = 2.5;
        costos[14] = 1.5;
        costos[15] = 2;
        costos[16] = 2;
        costos[17] = 3;
        costos[18] = 2;
        costos[19] = 2;
        costos[20] = 3;
        costos[21] = 2;
        costos[22] = 3;
        costos[23] = 3;
        costos[24] = 1;
        costos[25] = 2.5;
        costos[26] = 2;
        costos[27] = 3.5;
        costos[28] = 2;
        costos[29] = 1.5;
        costos[30] = 2;
        costos[31] = 3;
        costos[32] = 3.5;
        costos[33] = 2;
        costos[34] = 2.5;
        costos[35] = 1.5;
        return costos;

    }

    private static double calcularCosto(int[] solucionInicial, double[] costos) {//recibe el array de solucion y el de costos para calcular cuanto seria el costo de la solucion factible
        double saldo = 0;
        for (int i = 0; i < solucionInicial.length; i++) {//recorrido del array de solucion

            saldo = saldo + solucionInicial[i] * costos[i];//multiplica el numero de la matriz binaria por el numero del array de costos(ej:1*2+0*1.....etc)

        }
        return saldo;//retorna la sumatoria
    }

    private static boolean[] llenarArrayBoolean() {//llena el arreglo de valores false
        boolean[] pertenece = new boolean[36];
        for (int i = 0; i < pertenece.length; i++) {
            pertenece[i] = false;
        }
        return pertenece;

    }

    private static int[] Annealing(int[] solucionInicial, double[] costos) {//metodo que devuelve un array binario copn la nueva solucion dada una solucion inicial
        int solucionActual[] = solucionInicial;//almacena la solucion que recibe por parametro
        int nuevaSolucion[] = new int[35];//almacena la mejorSolucion obtenida dentro de las iteracionkes
        int cantidadDeDisminuciones =0;
        double temperaturaActual = 100;//valor de la temperatura T(0)
        double temperaturaMin = 0.1;//criterio de termino
        double alfa = 0.9; //almacena el enfriamiento geometrico

        while (temperaturaActual > temperaturaMin) {//itera mientras la temperatura no disminuya mas que el criterio de termino
            //inicialioza dos valosres randoms para realizar un swap
            int random1 = obtenerRandom();
            int random2 = obtenerRandom();
            nuevaSolucion = solucionActual;

            //genera una nueva solucion mediante opt-1(swap)
            int aux = nuevaSolucion[random1];
            nuevaSolucion[random1] = nuevaSolucion[random2];
            nuevaSolucion[random2] = aux;

            double costoActual = calcularCosto(solucionActual, costos);

            //remplaza los parametros de la solucion para generar una nueva solucion
            if (factible(nuevaSolucion)) {//si la nueva solucion es factible la analiza
                double nuevoCosto = calcularCosto(solucionInicial, costos);//calcula su costo
                if (nuevoCosto < costoActual) {//si el costo es menos(mejor fitness)

                    solucionActual = nuevaSolucion;//la mejor solucion va a ser la nueva solucion factible
                    temperaturaActual = actualizarTemperatura(temperaturaActual, alfa,cantidadDeDisminuciones);//se actualiza la temperatura segun el factor del enfriamiento geometrico
                    cantidadDeDisminuciones++;
                } else {//si la nueva solucion tiene pero fitnes se utilzia el criterio de la metropolis para determinar si la solucion es valida

                    double diferencia = nuevoCosto - costoActual;//diferencia de las diferencias
                    double euler = 2.71;//variable de euler
                    double criterio = (double) Math.pow(euler, (-diferencia / temperaturaActual));//realiza el calculo del criterio metropolis
                    double numero = (double) (Math.random() * 1);//genera un random(entre 0-1)

                    if (numero < criterio) {//si el criterio es mayor al valor randomico se acepta

                        solucionActual = nuevaSolucion;//la mejor solucion va a ser la nueva solucion factible
                        temperaturaActual = actualizarTemperatura(temperaturaActual, alfa, cantidadDeDisminuciones);//se actualiza la temperatura segun el factor del enfriamiento geometrico
                        cantidadDeDisminuciones++;
                    } else {
                        temperaturaActual = actualizarTemperatura(temperaturaActual, alfa,cantidadDeDisminuciones);
                        cantidadDeDisminuciones++;
                    }

                }

            } else {
                temperaturaActual = actualizarTemperatura(temperaturaActual, alfa,cantidadDeDisminuciones);
                cantidadDeDisminuciones++;

            }

        }

        return solucionActual;
    }

    private static double actualizarTemperatura(double temperaturaActual, double alfa, int k) {

        double cambio = 0;
        
        cambio = temperaturaActual * Math.pow(alfa, k);//realiza el calculo del criterio de cambio

        return cambio;
    }

    private static int obtenerRandom() {//obtiene un numero random de 0-35
        int numero = (int) (Math.random() * 36);
        return numero;
    }

}