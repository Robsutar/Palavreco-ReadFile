

var finish = false;

var wordArray = getWords();
var testedWords = [];
var correctWord = wordArray[Math.floor(Math.random()*wordArray.length)];
//console.log("Correct: "+correctWord);
console.log("Quantidade de letras: "+letterCount);
console.log("Palavra correta: "+correctWord);

var wordsDiv = document.getElementsByClassName('word');
var word = wordsDiv[0];
var letters = word.getElementsByTagName('div');
var actualLetter = letters[0];
changeActualLetter(0);

function changeActualLetter(index) {
    if (index>=letters.length){
        index = letters.length-1;
    }else if (index<0){
        index = 0;
    }

    actualLetter.style.backgroundColor = boxColorNormal;
    actualLetter = letters[index];
    actualLetter.style.backgroundColor = boxColorSelected;
}

function paintDiv(div,color){
    div.style.backgroundColor = color;
}

function paintAllInDiv(div, color){
    for (var i = 0; i < div.length;i++){
        paintDiv(div[i],color);
    }
}

function changeActualWordDiv() {
    var index = Array.from(wordsDiv).indexOf(word)+1;

    word = wordsDiv[index];
    letters = word.getElementsByTagName('div');
    changeActualLetter(0);
}

function getWordInDiv() {
    var str = "";
    for(let i = 0; i < letters.length; i = i + 1 ) {
        str+=letters[i].innerHTML;
    }
    return str;
}

function win() {
    finish = true;
    var boxes = document.getElementsByClassName('letter');

    var i = 0;
    function myLoop() {         
        setTimeout(function() {  
            var box = boxes[i];
            box.style.color = color;
            box.style.backgroundColor=color;
            i++;                  
            if (i < boxes.length) {         
            myLoop();            
            }else {
                var centerWord = wordsDiv[Math.floor(wordsDiv.length/2)];
                var centerWLetters = centerWord.getElementsByClassName('letter');

                var actualIndex = 0;
                for (var b = 0;b<centerWLetters.length;b++){
                    var centerWLetter = centerWLetters[b];
                    centerWLetter.innerHTML = correctWord.charAt(actualIndex);
                    actualIndex++;
                    centerWLetter.style.color = color;
                    centerWLetter.style.backgroundColor = boxColorConfirm;
                }
            }                
        }, 200/ammountOfWords)
    }
    myLoop(); 
}

function lose() {
    finish = true;
    var boxes = document.getElementsByClassName('letter');

    var i = 0;
    function myLoop() {         
        setTimeout(function() {  
            var box = boxes[i];
            box.style.color = color;
            box.style.backgroundColor=boxColorWrong;
            i++;                  
            if (i < boxes.length) {         
            myLoop();            
            }else {

            }                
        }, 200/ammountOfWords)
    }
    myLoop(); 
}

document.addEventListener('keydown', (event) => {
    if (!finish){
        var index = Array.from(letters).indexOf(actualLetter);
        var str = event.key;

        if (str.length==1 && str.toLowerCase() != str.toUpperCase()) {
            var letter = event.key.toUpperCase();
            actualLetter.innerHTML = letter;

            if (index>=letters.length){
                index = 0;
            }
            changeActualLetter(index+1);
        }else if (str=='Backspace'){
            if (actualLetter.innerHTML==''){
                changeActualLetter(index-1);
            }
            actualLetter.innerHTML = '';
        }else if (str=='Enter'){
            var str = getWordInDiv();
            var indexWords = Array.from(wordsDiv).indexOf(word);
            if (str.length==letterCount){
                if (!wordArray.includes(str)){
                    alert('não encontrada no banco');
                }else if (str==correctWord){
                    win();
                }else if (indexWords+1>=wordsDiv.length){
                    lose();
                }else if (testedWords.includes(str)){
                    alert('já digitaste');
                }else {
                    testedWords.push(str);
                    
                    var beforeLetters = letters;
                    changeActualWordDiv();
                    paintAllInDiv(beforeLetters,boxColorUnselect)
                    l1:for (var j = 0;j < str.length;j++){
                        var char = str.charAt(j);
                        for (var k = 0;k < correctWord.length;k++){
                            var oriChar = correctWord.charAt(k);
                            if (char==oriChar){
                                if (j==k){
                                    //console.log(" + Encontrado >"+char+"< em: "+j+" : "+k);
                                    paintDiv(beforeLetters[k],boxColorConfirm);
                                    continue l1;
                                }else{
                                    //console.log(" ? Encontrado >"+char+"< em: "+j+" : "+k);
                                    paintDiv(beforeLetters[j],boxColorSuspect);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
});