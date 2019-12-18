import pandas as pd

datos = {"Nombre":["Diego", "Javiera","Constanza"],"Calificaciones":
        ["100", "90","120"],"Deportes":
        ["Futbol", "Natacion", "Basquetball"], "Materias":
        ["Calculo", "Metodos numericos","Cocina"]
        }


df=pd.DataFrame(datos)
print (df)



