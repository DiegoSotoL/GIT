import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

pk_df = pd.read_csv("F:\Escritorio\Material Poyecto IA\GIT\GIT\python huawei\Pokemon.csv",index_col=0)
pk_df.head()

pk_df.columns = pk_df.columns.str.lower().str.replace(" ","")
pk_df.columns

pk_df.columns = pk_df.columns.str.replace(".","_")
pk_df.columns

pk_df.head(20)

pk_df.name = pk_df.name.str.replace(".*(?=Mega)","")
pk_df.head(20)

pk_df = pk_df.set_index("name")
pk_df.head()

pk_df.isnull().any()

pk_df.isna().sum()

pk_df.drop("type2",inplace=True,axis=1)
pk_df.head()

pk_df["type1"].value_counts()

plt.figure(figsize=(15,10))
plt.bar(pk_df["type1"].unique(),pk_df["type1"].value_counts())
plt.title("Distribución de Tipos de Pokemon")

plt.xlabel("Types")
plt.ylabel("Total")

pk_df.describe()

plt.figure(figsize=(10,8))
sns.heatmap(pk_df.corr(),annot=True)
plt.show()

sns.countplot(pk_df["generation"])

sns.distplot(pk_df["hp"])

sns.boxplot(x="legendary",y="attack",data=pk_df)

pk_df["type1"].value_counts()

plt.figure(figsize=(15,15))

for index, i in enumerate(pk_df["type1"].unique()):
  x = pk_df[pk_df["type1"]==i]
  plt.scatter(x.attack,x.defense,label=i,cmap=plt.cm.prism,s=120)
  

plt.legend()
plt.grid()
plt.xlabel("Attack")
plt.ylabel("Defense")
plt.title("Attack - Defense bye Type of Pokemon")