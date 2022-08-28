import pyodbc

dados_conexao = (
    "Driver={SQL Server};Server=DESKTOP-FKR1AFA;Database=Palabraco;Integrated Security=True;"
)

conexao = pyodbc.connect("Driver={SQL Server};Server=DESKTOP-FKR1AFA;Database=Palabraco;")
print("Deu certo")