let huruf = Number(localStorage.getItem("skorHuruf")) || 0;
let angka = Number(localStorage.getItem("skorAngka")) || 0;

document.getElementById("nilaiHuruf").innerHTML = huruf;
document.getElementById("nilaiAngka").innerHTML = angka;

const total = huruf + angka;

document.getElementById("totalBintang").innerHTML = "⭐ " + total;

let predikat = "";

if(total >= 20){

    predikat = "🏆 Juara";

}else if(total >= 10){

    predikat = "🥇 Hebat";

}else if(total >= 5){

    predikat = "😊 Pintar";

}else{

    predikat = "🌱 Terus Belajar";

}

document.getElementById("predikat").innerHTML = predikat;

function resetNilai(){

    localStorage.removeItem("skorHuruf");
    localStorage.removeItem("skorAngka");

    location.reload();

}