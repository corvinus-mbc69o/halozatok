var kérdések;
var kérdésSzám = 1;
var hotList = [];          
var questionsInHotList = 3; 
var displayedQuestion;      
var numberOfQuestions;     
var nextQuestion = 1;   
var timerHandler;

document.addEventListener("DOMContentLoaded", () => {
    for (let i = 0; i < questionsInHotList; i++) {
        hotList[i] = {
            question: {},
            goodAnswers: 0
        }

    }    

    //Kérdésekszáma
    fetch("questions/count")
        .then(result => result.text())
        .then(n => { numberOfQuestions = parseInt(n) })


    //előre-hátra gombok
    document.getElementById("előre_gomb").addEventListener("click", előre);
    document.getElementById("vissza_gomb").addEventListener("click", vissza);

    //mentett állapot beolvasása
    if (localStorage.getItem("hotList")) {
        hotList = JSON.parse(localStorage.getItem("hotList"))
    }

    if (localStorage.getItem("displayedQuestion")) {
        displayedQuestion = parseInt(localStorage.getItem("displayedQuestion"))
    }
    
    if (localStorage.getItem("nextQuestion")) {
        nextQuestion = parseInt(localStorage.getItem("nextQuestion"))
    }

    //Első kérdések letöltése
    if (hotList.length===0) {
        for (let i = 0; i < questionsInHotList; i++) {
            kérdésBetöltés(nextQuestion, i);
            nextQuestion++;
        }
    } else {
        kérdésMegjelenítés();
    }
   

});

function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(
            result => {
                if (!result.ok) {
                    console.error(`Hibás letöltés: ${result.status}`);
                    return null;
                }
                else {
                    return result.json()
                }
            })
        
        .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)
                if (displayedQuestion === undefined && destination === 0) {
                    displayedQuestion = 0;
                    kérdésMegjelenítés();
                }
            }
        );
}

function kérdésMegjelenítés() {
    let kérdés = hotList[displayedQuestion].question;
    console.log(kérdés);
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText;
    document.getElementById("válasz1").innerText = kérdés.answer1;
    document.getElementById("válasz2").innerText = kérdés.answer2;
    document.getElementById("válasz3").innerText = kérdés.answer3;   

    if (kérdés.image) {
        document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
        document.getElementById("kép1").style.display = "block";
    }
    else {
        document.getElementById("kép1").style.display = "none";
    }    

    for (var i = 1; i < 3; i++) document.getElementById("válasz" + i).classList.remove("jó", "rossz")
    document.getElementById("válaszok").style.pointerEvents = "auto";
    
}

function előre() {
    clearTimeout(timerHandler);
    displayedQuestion++;
    if (displayedQuestion === questionsInHotList) displayedQuestion = 0;
    kérdésMegjelenítés();
}

function vissza() {
    displayedQuestion--;
    if (displayedQuestion <0) displayedQuestion = questionsInHotList-1;
    kérdésMegjelenítés();
}

function választás(n) {
    let kérdés = hotList[displayedQuestion].question;
    if (n=== kérdés.correctAnswer) {
        document.getElementById("válasz" + n).classList.add("jó")
        hotList[displayedQuestion].goodAnswers++;
        if (hotList[displayedQuestion].goodAnswers===3) {
            kérdésBetöltés(nextQuestion, displayedQuestion);
            nextQuestion++;
            //todo: kérdéslista vége ellenőrzés
        }
    }
    else {
        document.getElementById("válasz" + n).classList.add("rossz")
        document.getElementById("válasz" + kérdés.correctAnswer).classList.add("jó")
        hotList[displayedQuestion].goodAnswers=0;
    }

    document.getElementById("válaszok").style.pointerEvents = "none";
    timerHandler = setTimeout(előre, 3000);

    localStorage.setItem("hotList", JSON.stringify(hotList));
    localStorage.setItem("displayedQuestion", displayedQuestion);
    localStorage.setItem("nextQuestion", nextQuestion);
}

//window.onload = function () {
//    kérdésBetöltés(kérdésSzám);

//    document.getElementById("előre").onclick = function előreLép() {
//        //kérdésSzám++;
//        //if (kérdésSzám==kérdések.length) {
//        //    kérdésSzám = 0;
//        //}
//        //kérdésMegjelenítés(kérdésSzám);
//        clearTimeout(timeoutHandler)
//        displayedQuestion++;
//        if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
//        kérdésMegjelenítés()
        
//    }

//    document.getElementById("vissza").onclick = function visszaLép() {
//        kérdésSzám--;
//        if (kérdésSzám == -1) {
//            kérdésSzám = kérdések.length-1;
//        }
//        kérdésMegjelenítés(kérdésSzám);
        

//    }

//    document.getElementById("válasz1").onclick = function válasz1Színezés (){
//        if (kérdések[kérdésSzám].correctAnswer==1) {
//            this.style.background = "darkgreen";
//        }
//        else {
//            this.style.background = "lightcoral";
//        }
//    }

//    document.getElementById("válasz2").onclick = function válasz2Színezés() {
//        if (kérdések[kérdésSzám].correctAnswer == 2) {
//            this.style.background = "darkgreen";
//        }
//        else {
//            this.style.background = "lightcoral";
//        }
//    }

//    document.getElementById("válasz3").onclick = function válasz3Színezés() {
//        if (kérdések[kérdésSzám].correctAnswer == 3) {
//            this.style.background = "darkgreen";        
//        }
//        else {
//            this.style.background = "lightcoral";
//        }
//    }
//}

