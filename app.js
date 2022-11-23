let userInput = document.querySelector(".search input");
let ul = document.querySelector("ul");
ul.style.display = "none" ;
let infoText = document.querySelector(".info-text");


//Show user ths searched word
function showWord(result,word) {
    if (result.title) {
        infoText.style.color = "red";
        infoText.innerHTML = `${result.title} for <b>${word}</b>`;
    } else {
        userInput.blur();
        infoText.innerHTML = "";
        userInput.value = "";
        ul.style.display = "block";
        showUser(result);
    }
    
}

//Show user the detail in UI
function showUser(data) {
    //variable of array length - 1 || Last Array index
    let last_phonetic = data[0].phonetics.length - 1 ;
    let last_meaning = data[0].meanings.length - 1 ;
    let last_definition = data[0].meanings[last_meaning].definitions.length - 1 ;
    //Speech audio
    audio = new Audio(data[0].phonetics[last_phonetic].audio);
    console.log(data);
    document.querySelector(".details p").innerText = data[0].word;
    document.querySelector(".details span").innerText = `${data[0].meanings[last_meaning].partOfSpeech} ${data[0].phonetics[last_phonetic].text}`;
    document.querySelector(".meaning span").innerText = data[0].meanings[last_meaning].definitions[last_definition].definition;
    let example = data[0].meanings[last_meaning].definitions[last_definition].example;
    if (example == undefined) {
        document.querySelector(".example").style.display = "none";
    }else {
        document.querySelector(".example").style.display = "block";
        document.querySelector(".example span").innerText = example;
    }
    let synonyms ;
    let synonyms_length = data[0].meanings[last_meaning].synonyms.length;
    document.querySelector(".synonyms .list").innerHTML = "";
    for (let j = 0 ; j < synonyms_length ; j++) {
        synonyms = `<span onclick="searchSynonyms('${data[0].meanings[last_meaning].synonyms[j]}')">${data[0].meanings[last_meaning].synonyms[j]}</span>`;
        if (synonyms[0] == undefined ) {
            document.querySelector(".synonyms").style.display = "none";
        }else {
            document.querySelector(".synonyms").style.display = "block";
            document.querySelector(".synonyms .list").style.color = "#9a9a9a";
            document.querySelector(".synonyms .list").insertAdjacentHTML("beforeend",synonyms);
        }
    }
    
}

//click Synonyms to search that
function searchSynonyms(key) {
    searchWord(key);
}

//Click to play speech
document.querySelector(".fa-volume-up").addEventListener("click", _=> {
    audio.play();
})

//add user input to search word function (Data fetch)
function searchWord (word) { 
    ul.style.display = "none";
    infoText.style.color = "black";
    infoText.innerText = `Searching ${word}`;
    fetch (`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => response.json())
    .then(result => showWord(result,word))
}
//UserInput Box
userInput.addEventListener("keyup", (e)=> {
    if (e.key == "Enter" && e.target.value) {
        searchWord(e.target.value);
    }
})

//User input box while focus
userInput.addEventListener("focus", _ => {
    infoText.style.color = "#9a9a9a";
    ul.style.display = "none";
    infoText.innerText = `Type any existing word and press enter to get meaning, example, synonyms, etc.`;
})