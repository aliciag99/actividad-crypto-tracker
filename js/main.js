import '../styles/style.css';

const URL = "https://api.coingecko.com/api/v3/coins/";

const pedirMoneda = async (nombreMoneda) => {

	const resultado = await fetch(URL + nombreMoneda);
	const resultadoParseado = await resultado.json();
	console.log(resultadoParseado);
    console.log(resultadoParseado.name);

    const datosMonedas = [resultadoParseado.name, "ATH: " + resultadoParseado.market_data.ath.eur + "€", "Current Price: " + resultadoParseado.market_data.current_price.eur + "€", "Rank: " + resultadoParseado.coingecko_rank];

    return datosMonedas;
};

const ponerLineas = async (idCaja, nombreMoneda) => {

    const caja = document.querySelector(idCaja);

    const arrayDatosMonedas = await pedirMoneda(nombreMoneda);
    
    
    for(let i=0; i<4; i++) {
        const linea = document.createElement("p");
        linea.textContent = arrayDatosMonedas[i];
        caja.appendChild(linea);
    }
}

ponerLineas("#caja1", "bitcoin");
ponerLineas("#caja2", "ethereum");
