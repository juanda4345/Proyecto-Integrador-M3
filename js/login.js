"use strict";

var formularioLogin = document.querySelector("#formularioLogin");
var intentos = 0;

function iniciarSesion(evento) {
  evento.preventDefault();
  var usuario = document.querySelector("#usuario").value.trim();
  var contrasena = document.querySelector("#contrasena").value;
  var mensaje = document.querySelector("#mensajeLogin");
  var botonIngresar = formularioLogin.querySelector("button[type='submit']");

  if (intentos >= 3) {
    mensaje.textContent = "Acceso bloqueado. Se alcanzaron tres intentos.";
    botonIngresar.disabled = true;
    return;
  }

  var accesoValido = usuario.toLowerCase() === "admin" && contrasena === "1234";
  var nombreUsuario = "admin";
  var usuarios = [];
  try {
    var datosUsuarios = localStorage.getItem("esd_usuarios");
    if (datosUsuarios !== null) usuarios = JSON.parse(datosUsuarios);
  } catch (error) {
    usuarios = [];
  }

  if (!accesoValido && usuarios instanceof Array) {
    for (var i = 0; i < usuarios.length; i++) {
      var usuarioGuardado = usuarios[i].usuario || usuarios[i].username;
      var contrasenaGuardada = usuarios[i].contrasena || usuarios[i].password;
      if (usuarioGuardado && usuarioGuardado.toLowerCase() === usuario.toLowerCase() && contrasenaGuardada === contrasena) {
        accesoValido = true;
        nombreUsuario = usuarios[i].nombre || usuarios[i].name || usuarioGuardado;
        break;
      }
    }
  }

  if (accesoValido) {
    localStorage.setItem("esd_usuario", nombreUsuario);
    window.location.assign("index.html");
  } else {
    intentos++;
    if (intentos >= 3) {
      mensaje.textContent = "Acceso bloqueado. Se alcanzaron tres intentos.";
      botonIngresar.disabled = true;
    } else {
      mensaje.textContent = "Datos incorrectos. Intento " + intentos + " de 3.";
    }
  }
}

formularioLogin.addEventListener("submit", iniciarSesion);
