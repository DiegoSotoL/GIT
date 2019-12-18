#framework de python
import datetime as fecha
#framework propio
import frameworkpropio as m
#framework externo
import colorama as c



c.init(convert = True)
print(c.Fore.GREEN + "Hola Mundo")
print( fecha.date.today())
print( fecha.timedelta(seconds= 9999))
m.agregar("cafe")