from cmath import log
from wsgiref import headers
import requests
from bs4 import BeautifulSoup

filePath = 'E:\RobsutarProjects\HTMLCSSJS\Palabraco\lista.txt'

url = 'https://www.palabrasaleatorias.com/palavras-aleatorias.php?fs=10&fs2=0&Submit=Nova+palavra'

headers = {
    'User-Agent': "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Mobile Safari/537.36"}


def printMe(s1):
    utf8stdout = open(1, 'w', encoding='utf-8', closefd=False)
    print (s1,file=utf8stdout)

def writeFileWord(file,word):
    file.write(word+"\n")

def isWordValid(s1,list):
    if ' ' in s1:
        return " Espaço encontrado: "+s1
    if not len(s1)>2:
        return " Palavra muito pequena: "+s1
    if len(s1)>11:
        return " Palavra muito grande: "+s1
    if s1 in list:
        return " Repetido: "+s1
    return 0

def openFile(type):
    return open(filePath, type, encoding='utf-8')

def validateFile():
    file1 = openFile('r')
    Lines = file1.readlines()
    file1.close()

    list = []

    for line in Lines:
        s1 = line.strip()
        verification = isWordValid(s1,list)

        if (verification==False):
            list.append(s1)
        else:
            printMe(str(verification))

    with openFile('w') as f:
        for s1 in list:
            writeFileWord(f,s1)

def webDownloadLoop():
    palabracas = []

    file1 = openFile('r')
    Lines = file1.readlines()
    file1.close()

    for line in Lines:
        palabracas.append(line.strip())

    print("Quantidade de palavras atual: "+str(len(palabracas)))

    worldAmmount = 10000
    for i in range(0,worldAmmount):
        proximosDez = []
        for b in range(0,10):
            i+=1
            site = requests.get(url,headers=headers)
            soup = BeautifulSoup(site.content,'html.parser')
            allDiv = soup.findAll('td')
            palavrasDiv = allDiv[0].findAll('div',style='font-size:3em; color:#6200C5;')

            for palavra in palavrasDiv:
                s1 = palavra.get_text().strip()
                verification = isWordValid(s1,palabracas)

                if (verification==False):
                    printMe((str(len(palabracas)+len(proximosDez))+" <> "+s1))
                    proximosDez.append(s1)
                else:
                    printMe(str(verification))

        palabracas.extend(proximosDez)

        with openFile('a') as f:
            for palavra in proximosDez:
                    writeFileWord(f,palavra)
        
webDownloadLoop()