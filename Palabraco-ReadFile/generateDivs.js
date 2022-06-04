var words = getWords();
var panel = document.getElementById('panel');
var ammountOfWords = letterCount*2;

if (ammountOfWords%2==0){
    ammountOfWords++;
}

for(var i = 0 ; i <ammountOfWords;i++){
    var wordDiv = document.createElement('div');
    wordDiv.classList.add('word');
    for(var b = 0 ; b <letterCount;b++){
        var word = document.createElement('div');
        word.classList.add('letter');
        wordDiv.appendChild(word);
    }
    panel.appendChild(wordDiv);
    panel.appendChild(document.createElement('br'));
}