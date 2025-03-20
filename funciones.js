var lista = [];
var ida = "";
var aciertos = 0;
var timer = "";
var listaImagenesAcertadas = [];

function CrearContenedoresImagenes() {
    const container = document.getElementById("container");
    container.innerHTML = ""; 
    for (let i = 0; i < 12; i++) {
        const div = document.createElement("div");
        div.id = "div" + i;
        container.appendChild(div);
    }
}

function GenerarImagenesAleatorias_y_Cargar_Imagenes() {
    lista = [...listaImagenes]; 
    for (let i = lista.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [lista[i], lista[j]] = [lista[j], lista[i]];
    }
    for (let i = 0; i < lista.length; i++) {
        const div = document.getElementById("div" + i);
        const img = document.createElement("img");
        img.src = "images/" + lista[i];
        img.id = "img" + i;
        img.onclick = function() { Jugada(this); };
        div.appendChild(img);
    }
}

function OcultarImagenes() {
    for (let i = 0; i < 12; i++) {
        const img = document.getElementById("img" + i);
        if (!listaImagenesAcertadas.includes(img.id)) {
            img.src = "images/cuadrado.png";
        }
    }
}

function inicio_partida() {
    aciertos = 0;
    ida = "";
    listaImagenesAcertadas = [];
    document.getElementById("contador").textContent = "0";
    document.getElementById("mensaje").textContent = "";
    CrearContenedoresImagenes();
    GenerarImagenesAleatorias_y_Cargar_Imagenes();
    clearTimeout(timer);
    timer = setTimeout(OcultarImagenes, 3000);
}

function Jugada(imagenPulsada) {
    if (listaImagenesAcertadas.includes(imagenPulsada.id)) {
        return;
    }
    imagenPulsada.src = "images/" + lista[parseInt(imagenPulsada.id.substring(3))];
    
    if (ida === "") {
        ida = imagenPulsada;
    } else {
        if (ida.id !== imagenPulsada.id) {
            const idaPosicion = parseInt(ida.id.substring(3));
            const imagenPulsadaPosicion = parseInt(imagenPulsada.id.substring(3));
            
            if (lista[idaPosicion] === lista[imagenPulsadaPosicion]) {
                aciertos++;
                document.getElementById("contador").textContent = aciertos;
                listaImagenesAcertadas.push(ida.id, imagenPulsada.id);
                
                if (aciertos === 6) {
                    document.getElementById("mensaje").textContent = "Felicidades! Has encontrado todas las parejas";
                }
            } else {
                setTimeout(function() {
                    ida.src = "images/cuadrado.png";
                    imagenPulsada.src = "images/cuadrado.png";
                }, 1000);
            }
            ida = "";
        }
    }
}
window.onload = inicio_partida;
document.getElementById("iniciarPartida").onclick = inicio_partida;