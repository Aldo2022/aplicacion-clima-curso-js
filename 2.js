////****       variables       ****************/

let urlBase = "https://api.openweathermap.org/data/2.5/weather?"; //Url base de la api
let city = "londres"; //variable como ejemplo, pero luego al clickear, toma otro nombre elegido
let idioma = "es";
let celsius = "metric";
let api_key = "10cdc5c13bb48306cd570d7270b48ae4"; //codigo particular para usar el api

////  Este evento va a ejecutar si hay un click y si hay un valor **

let btnBuscar = document.getElementById("buscar"); //tomo id del boton y lo pongo en una variable

btnBuscar = addEventListener("click", () => {
  //si en el boton buscar hay un click ejecuta una funcion
  const ciudadInput = document.getElementById("ciudadEntrada").value; //ahora si hay un valor lo guardo en otra variable
  if (ciudadInput) {
    //si hay un valor en la variable
    fetchClima(ciudadInput); //ejecuto la funcion q busca el fetch con el parametro donde esta la ciudad abuscar
  }

  ////  Esta funcion hace fetch con el nombre de la ciudad, esa respuesta va a ser ejecutado como un dato en una funcion
  function fetchClima(city) {
    fetch(`${urlBase}q=${city}&lang=${idioma}&units=${celsius}&appid=${api_key}`)
      .then((response) => response.json())
      .then((data) => mostrarClima(data));
  }

  //// Cuando se ejecuta la funcion lo traemos como objeto para utilizarlo mas adelante
  function mostrarClima(data) {
    console.log(data);

    //// Tomo todas las entradas de datos del html y los guardo en su variable respectiva
    const ciudadElemento = document.getElementById("ciudad");
    const iconoElemento = document.getElementById("icono");
    const temperaturaElemento = document.getElementById("temperatura");
    const humedadElemento = document.getElementById("humedad");
    const sensacionElemento = document.getElementById("sensacion");
    const visibilidadElemento = document.getElementById("visibilidad");
    const vientoElemento = document.getElementById("viento");

    const lluviaElemento = document.getElementById("lluvia");
    const descripcionElemento = document.getElementById("desc");
    const amanecerElemento = document.getElementById("amanece");
    const oscurecerElemento = document.getElementById("oscurece");

    //// En icono, se guarda un valor si la API me trae el dato "si llueve".  En caso q NO llueva no se guarda nada en icono y la varible RAIN queda en cero
    let icono = data.weather[0].icon;
    let rain = 0;
    if (rain < data.rain) {
      rain = data.rain;
    }

    //// Una vez q tengo todas las entradas html en mi variable JS
    ////En las variables JS guardo todo los datos de la API. La api te trrae un ARRAY de objeto y uno lo desglosa
    ciudadElemento.textContent = `${data.name} - ${data.sys.country}`; //Datos de ciudad y Pais
    iconoElemento.src = `https://openweathermap.org/img/wn/${icono}@2x.png`; ////1)-https://openweathermap.org/weather-conditions 2)La URL es https://openweathermap.org/img/wn/10d@2x.png

    temperaturaElemento.textContent = `${Math.floor(data.main.temp)}°C`; //Datos d temperatura
    humedadElemento.textContent = `H: ${data.main.humidity}%`; //DAtos de humedad
    sensacionElemento.textContent = `ST: ${Math.floor(data.main.feels_like)}°C`;
    visibilidadElemento.textContent = `Vis: ${data.visibility / 1000}km`;
    vientoElemento.textContent = `V: ${(data.wind.speed * 3.6).toFixed(1)} k/h ${convertirDireccionViento(data.wind.deg)}`;
    lluviaElemento.textContent = `Lluvias: ${rain}%`;
    descripcionElemento.textContent = data.weather[0].description;

    ////Aca voy a crear un 1) Elemento 2) clase  desde JS
    const amanece = document.createElement("i");
    amanece.classList.add("fa", "fa-sun-o");
    ////Luego los datos a mostrar momentaneamente lo guardo en una variable para luego ser visualizados cuando los pida
    const agregarHoraAmanecer = document.createTextNode(` ${convertirTimestampAHora(data.sys.sunrise, data.timezone)}`);
    amanecerElemento.textContent = "";
    ////cuando esta limpia la entrada a mostrar en mi entrada JS q tiene un elemento <p> ingreso un Elemento <i> nuevo con su clase y los dato de la api
    amanecerElemento.appendChild(amanece);
    amanecerElemento.appendChild(agregarHoraAmanecer);

    ////idem
    const oscurece = document.createElement("i");
    oscurece.classList.add("fa", "fa-moon-o");
    const agregarHoraOscurecer = document.createTextNode(` ${convertirTimestampAHora(data.sys.sunset, data.timezone)}`);
    oscurecerElemento.textContent = "";
    oscurecerElemento.appendChild(oscurece);
    oscurecerElemento.appendChild(agregarHoraOscurecer);
  }
});

//// Función para convertir timestamps UNIX a horas legibles
////timestamp es la fecha y hora especifica de la ubicacion donde uno se encuentra. y se representado en segundos
////timezone Es la dif horaria que necesita ajustar, para saber el horario de la consulta de una ciudad

const convertirTimestampAHora = (timestamp, timezone) => {
  ////los parametros se obtienen en la api con el mismo nombre
  const fecha = new Date((timestamp + timezone) * 1000); //*al resultado lo multiplico y obtengo en milisegundos para obtener una fecha
  const horas = fecha.getUTCHours(); //// obtengo la hora
  const minutos = "0" + fecha.getUTCMinutes(); ////obtengo los minutos
  return horas + ":" + minutos.substr(-2); ////agrego dos digitos a los minutos
};

//// Esta funcion hace q depende de los grados q me de la API deg yo pueda representar con las opciones del array direcciones
function convertirDireccionViento(deg) {
  const direcciones = ["N", "NE", "E", "SE", "S", "SO", "O", "NO"]; ////aca represento los puntos cardinales a utlizar
  const indice = Math.round(deg / 45) % 8; ////aca obtengo los grados, lo divido en 45, porque son las posible 8 ubicaciones q quiero saber, porque tengo un array de 8
  ////entonces
  return direcciones[indice];
}
// Se divide el ángulo (en grados) del viento entre 45 para obtener un número
// que represente cuántas veces el ángulo del viento cabe dentro de un sector de 45 grados.
// Por ejemplo, si el ángulo del viento es 90 grados, se obtendrá 2, ya que 90 grados
// caben dos veces en un sector de 45 grados.
// Luego, se redondea este resultado al entero más cercano utilizando Math.round().
// Esto se hace para determinar en qué sector de 45 grados cae el ángulo del viento.
// Después de dividir por 45 y redondear, se utiliza el operador % (módulo) 8 para
// obtener el residuo de dividir entre 8. Esto asegura que el índice resultante esté
// dentro del rango de índices válidos para el array de direcciones cardinales.
const indice = Math.round(deg / 45) % 8;
