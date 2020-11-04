#variables
mvar = "Hola Mundo"
mvar1 = "HCIA"
var1 = 4
var2 = 6
lista = ["a","b"]

""" Tuples = Inmutable
Lists = si puede cambiar """

""" imprime la clase """
print(type(var1))
""" and como && """
print (4<2 and True)

#listas
listExample1 = [var1,var2, mvar,mvar1, lista]
print(listExample1)
print(listExample1[0])
""" imprimir el ultimo elemento """
print(listExample1[-1])

#sublista [inicio:fin(exclusivo)]
print(listExample1[1:4])
print(listExample1[:4])

#modificar lista con sublistas
print(listExample1)
listExample1[0:2] = [0,1]
print(listExample1)

#agregar a la lista 
listExample1.append(1000)
print(listExample1)
""" no rempalza """
listExample1.insert(0,"nuevo")
print(listExample1)

#eliminar de la lista
listExample1.remove("nuevo")
del(listExample1[-1])
print(listExample1)

#copiar listas

x=["a", "b", "c"]
y=x.copy()
y[0] = "nuevo"
print(x)
print(y)

#iteraciones 

for x in listExample1: print(x)

#funciones
def test_function(nombre):
 print("Hola "+nombre)

test_function("Diego")
test_function("kk")
test_function("benja")


def funcion_mult(x):
 return x*5

print(funcion_mult(2))

#funcion anonima (?)
y= lambda a,b,c : a+b+c
print(y(1,2,3))

#funciones lista
listExample2 = [1,2,3,4,100,5,666,734,223]
print(sorted(listExample2))
print(max(listExample2))
""" help(max) """
""" aproximar descimales """
num = 5.4366767
print(round(num,2))
"""  """
listExample3 = ["hola", "chao","jeje", "aaaa"]
print(listExample3.index("hola"))