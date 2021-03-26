var kérdések;
var kérdésSzám = 0;

function letöltés() {
fetch("/question.json")
    .then(response => response.json())
        .then(data => letöltésBefejeződött(data));   
}
window.onload = letöltés();


function letöltésBefejeződött(d) {
    console.log("Sikeres letöltés")
    console.log(d)
    kérdések = d;
    kérdésMegjelenítés(kérdések);
}

function kérdésMegjelenítés(kérdés) {
    document.getElementById("kérdés_szöveg").innerHTML = kérdések[kérdésSzám].questionText;
    document.getElementById("válasz1").innerHTML = kérdések[kérdésSzám].answer1;
    document.getElementById("válasz2").innerHTML = kérdések[kérdésSzám].answer2;
    document.getElementById("válasz3").innerHTML = kérdések[kérdésSzám].answer3;    
    document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdések[kérdésSzám].image;
    
}

window.onload = function () {
    letöltés();

    document.getElementById("előre").onclick = function előreLép() {
        kérdésSzám++;
        if (kérdésSzám==kérdések.length) {
            kérdésSzám = 0;
        }
        kérdésMegjelenítés(kérdésSzám);
        
    }

    document.getElementById("vissza").onclick = function visszaLép() {
        kérdésSzám--;
        if (kérdésSzám == -1) {
            kérdésSzám = kérdések.length-1;
        }
        kérdésMegjelenítés(kérdésSzám);
        

    }

    document.getElementById("válasz1").onclick = function válasz1Színezés (){
        if (kérdések[kérdésSzám].correctAnswer==1) {
            this.style.background = "darkgreen";
        }
        else {
            this.style.background = "lightcoral";
        }
    }

    document.getElementById("válasz2").onclick = function válasz2Színezés() {
        if (kérdések[kérdésSzám].correctAnswer == 2) {
            this.style.background = "darkgreen";
        }
        else {
            this.style.background = "lightcoral";
        }
    }

    document.getElementById("válasz3").onclick = function válasz3Színezés() {
        if (kérdések[kérdésSzám].correctAnswer == 3) {
            this.style.background = "darkgreen";
            
        }
        else {
            this.style.background = "lightcoral";
        }
    }
}

