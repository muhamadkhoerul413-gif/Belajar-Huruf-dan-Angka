const huruf = [
"A","B","C","D","E","F","G","H",
"I","J","K","L","M","N","O","P",
"Q","R","S","T","U","V","W","X",
"Y","Z"
];

// Membaca skor yang sudah tersimpan
let skor = Number(localStorage.getItem("skorHuruf")) || 0;
let nyawa = 3;
let jawaban = "";

// Tampilkan skor saat halaman dibuka
document.getElementById("skor").innerHTML = skor;
document.getElementById("nyawa").innerHTML = nyawa;

function soalBaru(){

    jawaban = huruf[Math.floor(Math.random() * huruf.length)];

    document.getElementById("soalHuruf").innerHTML = jawaban;
    document.getElementById("hasil").innerHTML = "";

    let pilihan = [...huruf]
        .sort(() => Math.random() - 0.5)
        .slice(0,3);

    if(!pilihan.includes(jawaban)){
        pilihan.push(jawaban);
    }

    pilihan.sort(() => Math.random() - 0.5);

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

        // Simpan ke localStorage
        localStorage.setItem("skorHuruf", skor);

        document.getElementById("hasil").innerHTML =
        "⭐⭐⭐ Hebat!";

        setTimeout(soalBaru,1000);

    }else{

        nyawa--;

        document.getElementById("nyawa").innerHTML = nyawa;

        document.getElementById("hasil").innerHTML =
        "❌ Coba Lagi";

        if(nyawa <= 0){

            alert("Permainan Selesai");

            nyawa = 3;

            document.getElementById("nyawa").innerHTML = nyawa;

            soalBaru();

        }

    }

}

soalBaru();