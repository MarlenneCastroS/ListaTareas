// Definir variables y constantes
const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#lista');
const elemento = document.querySelector('#elemento');
const input = document.querySelector('#input');
const botonAgregar = document.querySelector('#botonAgregar');
const check = 'bi-check-circle-fill'; // Clase para el ícono de tarea realizada
const uncheck = 'bi-circle'; // Clase para el ícono de tarea no realizada
const tachado = 'tachado'; // Clase para el texto tachado

let LIST;
let id;

const FECHA = new Date();

fecha.innerHTML = FECHA.toLocaleDateString('es-MX', {
  weekday: 'long',
  month: 'short',
  day: 'numeric',
  year: 'numeric'
}).replace(/^./, (char) => char.toUpperCase()); //Para poner en mayúscula la primera letra

function agregarTarea(tarea, id, hecho = false, eliminar = false) {
  if (eliminar) {
    return;
  }
  const realizado = hecho ? check : uncheck;
  const LINE = hecho ? tachado : '';

  const elemento = `<li id="elemento">
  <i id="${id}" data = "hecho" class="bi ${realizado}"></i>
  <p class="tarea-lista text ${LINE}">${tarea}</p>
  <i id="${id}" data = "eliminar" class="bi bi-trash"></i>
  </li>`
  lista.insertAdjacentHTML("beforeend", elemento); 
};

function tareaRealizada(element) {
  console.log("Tarea realizada:", element);

  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector('.text').classList.toggle(tachado);
  
  LIST[element.id].realizado = LIST[element.id].realizado ? false : true;
}

function tareaEliminada(element) {
  console.log("Tarea eliminada:", element);

  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].eliminar = true;
}

botonAgregar.addEventListener("click", () => {
  const tarea = input.value;
  if (tarea) {
    agregarTarea(tarea, id, false, false)
    LIST.push({
      nombre: tarea,
      id: id,
      hecho: false,
      eliminar: false,
    });
    localStorage.setItem("TODO", JSON.stringify(LIST));
    id++;
    input.value = "";
  }
});

lista.addEventListener("click", function (event) {
  const element = event.target;
  //const elementData = element.attributes.data.value;
  const elementData = element.getAttribute('data');

  if (elementData == "hecho") {
    tareaRealizada(element);
  } else if (elementData == "eliminar") {
    tareaEliminada(element);
  }
  localStorage.setItem("TODO", JSON.stringify(LIST));
});

let data = localStorage.getItem("TODO");
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  cargarLista(LIST);
} else {
  LIST = [];
  id = 0;
}

function cargarLista(array) {
  array.forEach(function (item) {
      agregarTarea(item.nombre, item.id, item.hecho, item.eliminar);
    });
};