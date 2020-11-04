import numpy as np

peso = [66, 70.5, 56.2]
altura = [1.92,1.56,1.89]

np_peso = np.array(peso)
np_altura = np.array(altura)

imc = np_peso/np_altura**2
""" redondear """
imc = np.round(imc,2)
print(imc)
""" filtrar """
print(imc>20)
""" sublista """
print(imc[imc>20])

np_2d = np.array([[1,2,3], [4,5,6]])
print(np_2d)
print(np_2d[0])
print(np_2d[0,0])
print(np_2d[:,0:2])

prom = np.mean(np_2d[:,0])
print(prom)



#####MATPLTLIB#####
import matplotlib.pyplot as plt
year = [1950, 1970,1990,2010]
pob = [2.5910,3.451,5.236,6.945]

plt.scatter(year,pob)
plt.xlabel("Años")
plt.ylabel("Poblacion(en millones)")
plt.title("Poblacion mundial")
""" plt.show() """

labels = ["A", "B", "C"]
values = [1,4,2]

plt.figure(figsize=(5,3), dpi=100)
bars = plt.bar(labels,values)
""" plt.show() """

patterns = ["/", "0", "*"]

for bar in bars: bar.set_hatch(patterns.pop(0))

plt.savefig("graph.png", dpi=300)

#llaves 
world = {
    "Colombia": 15.09,
    "Chile": 10.5,
    "Mexico" : 56.56
}

print(world)
print(world["Chile"])

##pandas

dic_world = {
    "country": ["Brazil","MExico","Argentina"],
    "capital": ["Rio", "CDMX", "BA"],
    "population": [1,2,3]
}
print(dic_world["country"])

import pandas as pd

world_df = pd.DataFrame(dic_world)
world_df.index = ["BR", "MX", "AR"]
print(world_df)
#sub dataframe
print(world_df[["capital"]])
#filtar
print(world_df[1:3])
#filtrar por  key
print(world_df.loc[["BR","MX"],["country","capital"]])
#filtrar por index
print(world_df.iloc[[0,1],[0,1]])
#filtrado por condicion
print(world_df[world_df["population"]>1])
#iterar dataframe
for i,x in world_df.iterrows():
 print(i+ ": "+x.capital )


 ##EJEMPLO DATASET FIFA

 fifa_df = pd.read_csv("fifa_data.csv")
 fifa_df.head()