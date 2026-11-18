"use strict";

var claveNotas = "esd_notas";
var notas = [];
var formularioNota = document.querySelector("#formularioNota");

async function cargarNotasIniciales() {
  try {
    var respuesta = await fetch("notas.json");
    if (!respuesta.ok) throw new Error("No fue posible cargar notas.json");
    var datosIniciales = await respuesta.json();
    if (!(datosIniciales instanceof Array)) throw new Error("El archivo notas.json no contiene una lista de notas");

    var datosGuardados = localStorage.getItem(claveNotas);
    if (datosGuardados !== null) {
      try {
        var notasGuardadas = JSON.parse(datosGuardados);
        if (notasGuardadas instanceof Array) return notasGuardadas;
      } catch (error) {
        // Si el almacenamiento local está dañado, se usan los datos del archivo JSON.
      }
    }
    return datosIniciales;
  } catch (error) {
    document.querySelector("#mensajeNota").textContent = "No fue posible cargar las notas iniciales. Comprueba que la aplicación se ejecute desde un servidor local.";
    return [];
  }
}

function guardarNotas() {
  try {
    localStorage.setItem(claveNotas, JSON.stringify(notas));
    return true;
  } catch (error) {
    document.querySelector("#mensajeNota").textContent = "No fue posible guardar los datos en este navegador.";
    return false;
  }
}

function calcularPromedio(nota) {
  return (nota.nota1 + nota.nota2 + nota.nota3) / 3;
}

function crearCelda(fila, texto) {
  var celda = document.createElement("td");
  celda.textContent = texto;
  fila.appendChild(celda);
  return celda;
}

function crearFilaNota(nota, posicion, mostrarAcciones) {
  var fila = document.createElement("tr");
  var promedio = calcularPromedio(nota);
  if (mostrarAcciones) crearCelda(fila, posicion + 1);
  crearCelda(fila, nota.estudiante);
  crearCelda(fila, nota.materia);
  if (mostrarAcciones) {
    crearCelda(fila, nota.nota1.toFixed(1));
    crearCelda(fila, nota.nota2.toFixed(1));
    crearCelda(fila, nota.nota3.toFixed(1));
  }
  crearCelda(fila, promedio.toFixed(1));
  crearCelda(fila, promedio >= 3 ? "Aprobado" : "Reprobado");

  if (mostrarAcciones) {
    var celdaAcciones = crearCelda(fila, "");
    celdaAcciones.className = "acciones";
    var botonEditar = document.createElement("button");
    botonEditar.type = "button";
    botonEditar.className = "boton-editar";
    botonEditar.textContent = "Editar";
    botonEditar.setAttribute("data-id", nota.id);
    botonEditar.addEventListener("click", editarNota);
    var botonEliminar = document.createElement("button");
    botonEliminar.type = "button";
    botonEliminar.className = "boton-eliminar";
    botonEliminar.textContent = "Eliminar";
    botonEliminar.setAttribute("data-id", nota.id);
    botonEliminar.addEventListener("click", eliminarNota);
    celdaAcciones.appendChild(botonEditar);
    celdaAcciones.appendChild(botonEliminar);
  }
  return fila;
}

function mostrarNotas() {
  var tabla = document.querySelector("#tablaNotas");
  var busqueda = document.querySelector("#busqueda").value.toLowerCase().trim();
  var cantidad = 0;
  tabla.innerHTML = "";
  for (var i = 0; i < notas.length; i++) {
    var estudiante = notas[i].estudiante.toLowerCase();
    var materia = notas[i].materia.toLowerCase();
    if (estudiante.indexOf(busqueda) !== -1 || materia.indexOf(busqueda) !== -1) {
      tabla.appendChild(crearFilaNota(notas[i], cantidad, true));
      cantidad++;
    }
  }
  document.querySelector("#cantidadResultados").textContent = cantidad + (cantidad === 1 ? " estudiante" : " estudiantes");
  if (cantidad === 0) {
    document.querySelector("#sinResultados").classList.remove("oculto");
  } else {
    document.querySelector("#sinResultados").classList.add("oculto");
  }
}

function mostrarNotasRecientes() {
  var tabla = document.querySelector("#tablaRecientes");
  var inicio = notas.length - 4;
  if (inicio < 0) inicio = 0;
  tabla.innerHTML = "";
  for (var i = notas.length - 1; i >= inicio; i--) {
    tabla.appendChild(crearFilaNota(notas[i], 0, false));
  }
}

function actualizarResumen() {
  var sumaPromedios = 0;
  var cantidadAprobados = 0;
  for (var i = 0; i < notas.length; i++) {
    var promedio = calcularPromedio(notas[i]);
    sumaPromedios += promedio;
    if (promedio >= 3) cantidadAprobados++;
  }
  document.querySelector("#totalEstudiantes").textContent = notas.length;
  document.querySelector("#promedioGeneral").textContent = notas.length > 0 ? (sumaPromedios / notas.length).toFixed(1) : "0.0";
  document.querySelector("#totalAprobados").textContent = cantidadAprobados;
}

function actualizarPagina() {
  mostrarNotas();
  mostrarNotasRecientes();
  actualizarResumen();
}

async function iniciarAplicacion() {
  notas = await cargarNotasIniciales();
  actualizarPagina();
}

function limpiarFormulario() {
  formularioNota.reset();
  document.querySelector("#idNota").value = "";
  document.querySelector("#tituloFormulario").textContent = "Registrar nota";
  document.querySelector("#botonGuardar").textContent = "Guardar nota";
  document.querySelector("#botonCancelar").classList.add("oculto");
  document.querySelector("#mensajeNota").textContent = "";
}

function editarNota(evento) {
  var idBuscado = Number(evento.currentTarget.getAttribute("data-id"));
  for (var i = 0; i < notas.length; i++) {
    if (notas[i].id === idBuscado) {
      document.querySelector("#idNota").value = notas[i].id;
      document.querySelector("#estudiante").value = notas[i].estudiante;
      document.querySelector("#materia").value = notas[i].materia;
      document.querySelector("#nota1").value = notas[i].nota1;
      document.querySelector("#nota2").value = notas[i].nota2;
      document.querySelector("#nota3").value = notas[i].nota3;
      document.querySelector("#tituloFormulario").textContent = "Editar nota";
      document.querySelector("#botonGuardar").textContent = "Actualizar nota";
      document.querySelector("#botonCancelar").classList.remove("oculto");
      break;
    }
  }
}

function eliminarNota(evento) {
  var idBuscado = Number(evento.currentTarget.getAttribute("data-id"));
  if (!window.confirm("¿Deseas eliminar este registro?")) return;
  for (var i = 0; i < notas.length; i++) {
    if (notas[i].id === idBuscado) {
      notas.splice(i, 1);
      break;
    }
  }
  if (guardarNotas()) actualizarPagina();
}

function guardarNota(evento) {
  evento.preventDefault();
  document.querySelector("#mensajeNota").textContent = "";
  var idActual = document.querySelector("#idNota").value;
  var estudiante = document.querySelector("#estudiante").value.trim();
  var materia = document.querySelector("#materia").value.trim();
  var nota1 = Number(document.querySelector("#nota1").value);
  var nota2 = Number(document.querySelector("#nota2").value);
  var nota3 = Number(document.querySelector("#nota3").value);
  if (!estudiante || !materia || nota1 < 1 || nota1 > 5 || nota2 < 1 || nota2 > 5 || nota3 < 1 || nota3 > 5) {
    document.querySelector("#mensajeNota").textContent = "Completa los campos y verifica que cada nota esté entre 1.0 y 5.0.";
    return;
  }
  var notaNueva = {
    id: idActual === "" ? new Date().getTime() : Number(idActual),
    estudiante: estudiante,
    materia: materia,
    nota1: nota1,
    nota2: nota2,
    nota3: nota3
  };
  var encontrada = false;
  for (var i = 0; i < notas.length; i++) {
    if (notas[i].id === notaNueva.id) {
      notas[i] = notaNueva;
      encontrada = true;
      break;
    }
  }
  if (!encontrada) notas.push(notaNueva);
  if (guardarNotas()) {
    limpiarFormulario();
    actualizarPagina();
  }
}

function cambiarPagina(evento) {
  var nombrePagina = evento.currentTarget.getAttribute("data-pagina");
  var paginas = document.querySelectorAll(".pagina");
  for (var i = 0; i < paginas.length; i++) paginas[i].classList.add("oculto");
  var idPagina = "#pagina" + nombrePagina.charAt(0).toUpperCase() + nombrePagina.slice(1);
  var paginaSeleccionada = document.querySelector(idPagina);
  if (paginaSeleccionada) paginaSeleccionada.classList.remove("oculto");
  var botonesMenu = document.querySelectorAll(".boton-menu");
  for (var j = 0; j < botonesMenu.length; j++) {
    botonesMenu[j].classList.remove("activo");
    if (botonesMenu[j].getAttribute("data-pagina") === nombrePagina) botonesMenu[j].classList.add("activo");
  }
}

function cerrarSesion() {
  localStorage.removeItem("esd_usuario");
  window.location.replace("login.html");
}

formularioNota.addEventListener("submit", guardarNota);
document.querySelector("#botonCancelar").addEventListener("click", limpiarFormulario);
document.querySelector("#busqueda").addEventListener("input", mostrarNotas);
document.querySelector("#botonCerrarSesion").addEventListener("click", cerrarSesion);
var enlacesPagina = document.querySelectorAll("[data-pagina]");
for (var i = 0; i < enlacesPagina.length; i++) enlacesPagina[i].addEventListener("click", cambiarPagina);

var usuarioActual = localStorage.getItem("esd_usuario");
if (usuarioActual === null) {
  window.location.replace("login.html");
} else {
  document.querySelector("#nombreUsuario").textContent = usuarioActual;
  document.querySelector("#saludoUsuario").textContent = usuarioActual;
  iniciarAplicacion();
}
