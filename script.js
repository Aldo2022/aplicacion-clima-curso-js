let urlBase = "https://api.openweathermap.org/data/2.5/weather?"; //Url base de la api
let ciudad = "londres"; //variable como ejemplo, pero luego al clickear, toma otro nombre elegido
let idioma = "es";
let celsius = "metric";
let api_key = "10cdc5c13bb48306cd570d7270b48ae4"; //codigo particular para usar el api

////-------------------------------------------------------------------------------------------------------------
let busqueda = document.getElementById("botonBusqueda"); //Llamo al boton y lo guardo en una variable
busqueda.addEventListener("click", () => {
  //Si dentro del boton se ejecuta un click ejecuta una funcion
  const ciudad = document.getElementById("ciudadEntrada").value; //Entonces en el campo ciudadEntrada tiene un valor, se guarda en una variable
  if (ciudad) {
    fetchDatosClima(ciudad); //Si hay una ciudad, la funcion recibe y hace un fetch
  }
});
////-------------------------------------------------------------------------------------------------------------
function fetchDatosClima(ciudad) {
  fetch(
    `${urlBase}q=${ciudad}&lang=${idioma}&units=${celsius}&appid=${api_key}`
  ) //Para hacer el fetch tomo las variables de arriba
    .then((data) => data.json()) //Si hay una respuesta o una data , hace la conversion de json a texto normal
    .then((data) => mostrarDatosClima(data)); //Y ese texto normal se ejecuta en otra funcion
}
////----------------------------------------------------------------------------------------------------------------
function mostrarDatosClima(data) {
  console.log(data); //clg de prueba
  const divDatosClima = document.getElementById("datosClima"); //Obtener una referencia al elemento del DOM (Document Object Model) con el ID "datosClima":
  divDatosClima.innerHTML = ""; //Se limpia todo el  contenido HTML dentro de ese elemento y lo deja vacio para mostrar otro consulta:

  const ciudadNombre = data.name; // data tiene mucha info para lo que uno necesite en este caso solo los voy a guardar a todos en variable
  const paisNombre = data.sys.country; // data tiene mucha info para lo que uno necesite en este caso solo los voy a guardar a todos en variable
  const temperatura = data.main.temp; //pARA VER COMO ESTA ESTRUCTuRADO la info, data.main.temp. se mira en inspeccionar en google
  const humedad = data.main.humidity;
  const descripcion = data.weather[0].description; //En este caso weather tiene un array y de ahi luego obtengo la descripcion
  const icono = data.weather[0].icon;

  const ciudadTitulo = document.createElement("h2"); //Voy a crear un elemento HTML h2 dentro de JS, que seria  un nuevo nodo que se agregará como hijo:
  ciudadTitulo.textContent = `${ciudadNombre} - ${paisNombre}`; //Para luego guardar mediante textContent la variable o lo q tenga ciudadNombre
  ciudadTitulo.style = "color: white";

  const temperaturaInfo = document.createElement("p"); //creo un parrafo que seria  un nuevo nodo que se agregará como hijo:
  temperaturaInfo.textContent = `La temperatura es: ${Math.floor(
    temperatura
  )}°C`; //En este caso guardo la temperatura celsius
  temperaturaInfo.style = " color: yellow";

  const humedadInfo = document.createElement("p"); //lo mismo pero creo otro parrafo que seria  un nuevo nodo que se agregará como hijo:
  humedadInfo.textContent = `La humedad es de: ${humedad}%`; //detallo la descripcion
  humedadInfo.style = " color: rgb(238, 127, 36)";

  const iconoInfo = document.createElement("img");
  iconoInfo.src = `https://openweathermap.org/img/wn/${icono}@2x.png`;

  const descripcionInfo = document.createElement("p"); //lo mismo pero creo otro parrafo que seria  un nuevo nodo que se agregará como hijo:
  descripcionInfo.textContent = `La descripcion meteorologica es : ${descripcion}`; //detallo la descripcion

  divDatosClima.appendChild(ciudadTitulo); //Agregar el nuevo nodo al elemento padre: q seria divDatosClima
  divDatosClima.appendChild(temperaturaInfo); //idem
  divDatosClima.appendChild(humedadInfo); //idem
  divDatosClima.appendChild(iconoInfo); //idem
  divDatosClima.appendChild(descripcionInfo); //idem
}
