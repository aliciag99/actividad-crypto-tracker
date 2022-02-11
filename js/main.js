import '../styles/style.css';

const URL = "https://api.coingecko.com/api/v3/coins/";
const URLTrending = "https://api.coingecko.com/api/v3/search/trending";

// Llamada a la API cuando se da un nombre de moneda
const pedirMoneda = async (nombreMoneda) => {

	const resultado = await fetch(URL + nombreMoneda);
	const resultadoParseado = await resultado.json();

    if (typeof resultadoParseado.name === 'undefined') {
        alert("No se ha podido encontrar esa criptomoneda");
    } else {
        const datosMonedas = [resultadoParseado.name, 
            "ATH: " + resultadoParseado.market_data.ath.eur + "€", 
            "Current Price: " + resultadoParseado.market_data.current_price.eur + "€", "Rank: " + resultadoParseado.coingecko_rank, 
            resultadoParseado.image.large];

        return datosMonedas;
    }
};

// Introducir en la caja y el modal los datos de una moneda
const ponerLineas = async (idCaja, nombreMoneda, idModal) => {

    const caja = document.querySelector(idCaja);
    const arrayDatosMonedas = await pedirMoneda(nombreMoneda);
    
    if (typeof arrayDatosMonedas !== 'undefined') {

        for(let i=0; i<4; i++) {
            const linea = document.createElement("p");
            linea.textContent = arrayDatosMonedas[i];
            caja.appendChild(linea);
        }

        const imagenMoneda = arrayDatosMonedas[4];
        let imagen = document.createElement("img");
            
        document.getElementById(idModal).appendChild(imagen);
        imagen.src = imagenMoneda;
    }
}

ponerLineas("#caja1", "bitcoin", "modal1");
ponerLineas("#caja2", "ethereum", "modal2");

// Usar el botón buscar para mostrar la moneda introducida
const buscar = document.getElementById("buscar");

buscar.addEventListener("click", function() {

    let caja3 = document.getElementById("caja3");
    caja3.classList.remove("caja-oculta");
    caja3.innerHTML = "";

    let modal3 = document.getElementById("modal3");
    modal3.innerHTML = "";

    const monedaBuscada = document.getElementById("introducirNombre").value.toLowerCase();
    ponerLineas("#caja3", monedaBuscada, "modal3");
});

// Aparición y ocultación de modales
const modal1 = document.getElementById("contenedorModal1");
const modal2 = document.getElementById("contenedorModal2");
const modal3 = document.getElementById("contenedorModal3");

const pulsar1 = document.getElementById("caja1");
const pulsar2 = document.getElementById("caja2");
const pulsar3 = document.getElementById("caja3");


pulsar1.onclick = function() {
	modal1.style.display = "block";
}
pulsar2.onclick = function() {
	modal2.style.display = "block";
}
pulsar3.onclick = function() {
	modal3.style.display = "block";
}

window.onclick = function(event) {
	if (event.target == modal1) {
		modal1.style.display = "none";
	}
    if (event.target == modal2) {
		modal2.style.display = "none";
	}
    if (event.target == modal3) {
		modal3.style.display = "none";
	}
}

// Llamada a la API para mostrar las monedas trending
const monedasTrending = async () => {

	const resultadoTrending = await fetch(URLTrending);
	const resultadoTrendingParseado = await resultadoTrending.json();

    const cajaTrending = document.getElementById("trending");

    for(let i=0; i<7; i++) {
        const puesto = document.createElement("p");
        puesto.textContent = resultadoTrendingParseado.coins[i].item.name;
        cajaTrending.appendChild(puesto);
    }
}

monedasTrending();