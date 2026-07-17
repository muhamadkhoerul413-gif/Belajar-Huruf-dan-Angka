// =============================
// Canvas
// =============================
const bgCanvas = document.getElementById("bgCanvas");
const drawCanvas = document.getElementById("drawCanvas");

const bg = bgCanvas.getContext("2d");
const draw = drawCanvas.getContext("2d");

// =============================
// Data Angka
// =============================
const daftarAngka = [
    "0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50"
];

const namaAngka = [
   "Nol",
    "Satu",
    "Dua",
    "Tiga",
    "Empat",
    "Lima",
    "Enam",
    "Tujuh",
    "Delapan",
    "Sembilan",
    "Sepuluh",
    "Sebelas",
    "Dua Belas",
    "Tiga Belas",
    "Empat Belas",
    "Lima Belas",
    "Enam Belas",
    "Tujuh Belas",
    "Delapan Belas",
    "Sembilan Belas",
    "Dua Puluh",
    "Dua Puluh Satu",
    "Dua Puluh Dua",
    "Dua Puluh Tiga",
    "Dua Puluh Empat",
    "Dua Puluh Lima",
    "Dua Puluh Enam",
    "Dua Puluh Tujuh",
    "Dua Puluh Delapan",
    "Dua Puluh Sembilan",
    "Tiga Puluh",
    "Tiga Puluh Satu",
    "Tiga Puluh Dua",
    "Tiga Puluh Tiga",
    "Tiga Puluh Empat",
    "Tiga Puluh Lima",
    "Tiga Puluh Enam",
    "Tiga Puluh Tujuh",
    "Tiga Puluh Delapan",
    "Tiga Puluh Sembilan",
    "Empat Puluh",
    "Empat Puluh Satu",
    "Empat Puluh Dua",
    "Empat Puluh Tiga",
    "Empat Puluh Empat",
    "Empat Puluh Lima",
    "Empat Puluh Enam",
    "Empat Puluh Tujuh",
    "Empat Puluh Delapan",
    "Empat Puluh Sembilan",
    "Lima Puluh"
];

let angkaAktif = 0;
let menggambar = false;

// =============================
// Gambar Angka
// =============================
function gambarAngka(){

    bg.clearRect(0,0,bgCanvas.width,bgCanvas.height);

    document.getElementById("angkaBesar").innerHTML =
        daftarAngka[angkaAktif];

    document.getElementById("namaAngka").innerHTML =
        namaAngka[angkaAktif];

    // Tampilkan gambar sesuai angka
let gambar = "";

if (angkaAktif == 0) {
    gambar = "🚫";
} else {
    for (let i = 0; i < angkaAktif; i++) {
        gambar += "🍎 ";
    }
}

document.getElementById("gambarAngka").innerHTML = gambar;

    // Garis bantu
    bg.strokeStyle="#90CAF9";
    bg.lineWidth=2;

    bg.beginPath();

    bg.moveTo(40,120);
    bg.lineTo(560,120);

    bg.moveTo(40,250);
    bg.lineTo(560,250);

    bg.moveTo(40,380);
    bg.lineTo(560,380);

    bg.stroke();

    // Angka contoh
    bg.font="220px Arial";
    bg.strokeStyle="#BDBDBD";
    bg.lineWidth=5;
    bg.setLineDash([8,8]);

    const text=daftarAngka[angkaAktif];
    const w=bg.measureText(text).width;

    bg.strokeText(
        text,
        (bgCanvas.width-w)/2,
        300
    );

    bg.setLineDash([]);
}

gambarAngka();

// =============================
// Pensil
// =============================
draw.strokeStyle="#ff0000";
draw.lineWidth=8;
draw.lineCap="round";

function posisi(e){

    const rect = drawCanvas.getBoundingClientRect();

    return{
        x:(e.clientX-rect.left)*(drawCanvas.width/rect.width),
        y:(e.clientY-rect.top)*(drawCanvas.height/rect.height)
    };

}

function posisiTouch(e){

    const rect = drawCanvas.getBoundingClientRect();

    const touch = e.touches[0];

    return{
        x:(touch.clientX-rect.left)*(drawCanvas.width/rect.width),
        y:(touch.clientY-rect.top)*(drawCanvas.height/rect.height)
    };

}

drawCanvas.addEventListener("mousedown",function(e){

    menggambar=true;

    const p=posisi(e);

    draw.beginPath();

    draw.moveTo(p.x,p.y);

});

drawCanvas.addEventListener("mousemove",function(e){

    if(!menggambar) return;

    const p=posisi(e);

    draw.lineTo(p.x,p.y);

    draw.stroke();

});

drawCanvas.addEventListener("mouseup",function(){

    menggambar=false;

});

drawCanvas.addEventListener("mouseleave",function(){

    menggambar=false;

});

// =============================
// Tombol
// =============================
function hapusCanvas(){

    draw.clearRect(
        0,
        0,
        drawCanvas.width,
        drawCanvas.height
    );

}

function berikutnya(){

    if (angkaAktif < daftarAngka.length - 1){

        angkaAktif++;

        gambarAngka();

        hapusCanvas();

    }

}

function sebelumnya(){

    if(angkaAktif>0){

        angkaAktif--;

        gambarAngka();

        hapusCanvas();

    }

}

// =============================
// Touch HP Android
// =============================

drawCanvas.addEventListener("touchstart",function(e){

    e.preventDefault();

    menggambar=true;

    const p=posisiTouch(e);

    draw.beginPath();

    draw.moveTo(p.x,p.y);

});

drawCanvas.addEventListener("touchmove",function(e){

    e.preventDefault();

    if(!menggambar) return;

    const p=posisiTouch(e);

    draw.lineTo(p.x,p.y);

    draw.stroke();

});

drawCanvas.addEventListener("touchend",function(){

    menggambar=false;

});

function tampilkanGambar(){

    let isi="";

    if(angkaAktif===0){

        isi="🚫";

    }else{

        for(let i=0;i<angkaAktif;i++){

            isi+="🍎 ";

        }

    }

    document.getElementById("gambarAngka").innerHTML=isi;

}

function bacaAngka(){

    const suara = new SpeechSynthesisUtterance(
        namaAngka[angkaAktif]
    );

    suara.lang = "id-ID";

    speechSynthesis.speak(suara);

}