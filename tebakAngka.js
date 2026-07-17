const angka = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50];

let jawaban = 0;
let skor = Number(localStorage.getItem("skorAngka")) || 0;
let nyawa = 3;

document.getElementById("skor").innerHTML = skor;
document.getElementById("nyawa").innerHTML = nyawa;

document.getElementById("skor").innerHTML = skor;

function soalBaru(){

    jawaban = angka[Math.floor(Math.random()*angka.length)];

    document.getElementById("soalAngka").innerHTML = jawaban;

    document.getElementById("hasil").innerHTML = "";

    let pilihan = [...angka]
        .sort(()=>Math.random()-0.5)
        .slice(0,3);

    if(!pilihan.includes(jawaban)){
        pilihan.push(jawaban);
    }

    pilihan.sort(()=>Math.random()-0.5);

    for(let i=0;i<4;i++){

        const tombol = document.getElementById("btn"+(i+1));

        tombol.innerHTML = pilihan[i];

        tombol.onclick = function(){

            cekJawaban(pilihan[i]);

        };

    }

}

function cekJawaban(pilih){

    if(pilih === jawaban){

        skor++;

        document.getElementById("skor").innerHTML = skor;

        localStorage.setItem("skorAngka", skor);

        document.getElementById("hasil").innerHTML =
        "⭐⭐⭐ Hebat!";

        setTimeout(soalBaru,1000);

    }else{

        nyawa--;

        document.getElementById("nyawa").innerHTML = nyawa;

        document.getElementById("hasil").innerHTML =
        "❌ Coba Lagi";

        if(nyawa <= 0){

            alert("😢 Permainan Selesai");

            nyawa = 3;
            skor = 0;

            document.getElementById("nyawa").innerHTML = nyawa;
            document.getElementById("skor").innerHTML = skor;

            localStorage.setItem("skorAngka", skor);

            soalBaru();

        }

    }

}

soalBaru();