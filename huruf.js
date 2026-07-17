const canvas = document.getElementById("canvas");
const daftarHuruf = [
"A","B","C","D","E","F","G","H","I","J",
"K","L","M","N","O","P","Q","R","S","T",
"U","V","W","X","Y","Z"
];

let hurufAktif = 0;
const ctx = canvas.getContext("2d");
document.getElementById("gambarHuruf").src =
    "images/huruf/" + daftarHuruf[hurufAktif] + ".png";

let menggambar = false;

// =======================
// Menggambar huruf contoh
// =======================
function gambarHuruf(){

    // Bersihkan canvas
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    // ==========================
    // Garis bantu menulis
    // ==========================

    ctx.beginPath();

    // Garis Atas
    ctx.strokeStyle="#90CAF9";
    ctx.lineWidth=2;

    ctx.moveTo(30,115);
    ctx.lineTo(canvas.width-30,115);

    // Garis Tengah
    ctx.moveTo(30,250);
    ctx.lineTo(canvas.width-30,250);


    ctx.stroke();

    document.getElementById("hurufBesar").innerHTML =
        daftarHuruf[hurufAktif];

    document.getElementById("hurufKecil").innerHTML =
        daftarHuruf[hurufAktif].toLowerCase();

    // Huruf putus-putus
    ctx.font = "180px Arial";
    ctx.strokeStyle="#BDBDBD";
    ctx.lineWidth=5;
    ctx.setLineDash([8,8]);

    // Mengukur lebar huruf
    const text = daftarHuruf[hurufAktif];
    const textWidth = ctx.measureText(text).width;

    // Posisi tengah horizontal
    const x = (canvas.width - textWidth) / 2;

    // Posisi vertikal
    const y = 250;

// Gambar huruf
ctx.strokeText(text, x, y);

     // Kembalikan pengaturan garis
    ctx.setLineDash([]);
    ctx.strokeStyle = "#ff0000";   // Merah
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
}

gambarHuruf();

// =======================
// Pengaturan pena
// =======================

ctx.lineWidth = 8;

ctx.lineCap = "round";

ctx.strokeStyle = "#ff0000";

// =======================
// Mouse
// =======================

canvas.addEventListener("mousedown", function(e){

    menggambar = true;

    const pos = getPos(e);

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);

});

canvas.addEventListener("mouseup",function(){

    menggambar=false;

});

canvas.addEventListener("mouseleave",function(){

    menggambar=false;

});

canvas.addEventListener("mousemove", function(e){

    if(!menggambar) return;

    const pos = getPos(e);

    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

});

// =======================
// Tombol Hapus
// =======================

function hapusCanvas(){

    ctx.beginPath();
    gambarHuruf();

}

function berikutnya(){

    if(hurufAktif < daftarHuruf.length - 1){

        hurufAktif++;

        gambarHuruf();

        hapusCanvas();

        bacaHuruf();

    }

}

function sebelumnya(){

    if(hurufAktif > 0){

        hurufAktif--;

        gambarHuruf();

        hapusCanvas();

        bacaHuruf();

    }

}

function putarSuara(){

    let audio = new Audio(
        "audio/" + daftarHuruf[hurufAktif] + ".mp3"
    );

    audio.play();

}

function getPos(e) {
    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
    };
}

function bacaHuruf(){

    speechSynthesis.cancel();

    const suara = new SpeechSynthesisUtterance(
        daftarHuruf[hurufAktif]
    );

    suara.lang = "id-ID";

    suara.rate = 0.8;

    suara.pitch = 1.2;

    speechSynthesis.speak(suara);

}