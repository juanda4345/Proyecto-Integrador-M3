"use strict";

const formularioLogin = document.querySelector("#formularioLogin");
let intentos = 0;

function iniciarSesion(evento) {
  evento.preventDefault();
  const usuario = document.querySelector("#usuario").value.trim();
  const contrasena = document.querySelector("#contrasena").value;
  const mensaje = document.querySelector("#mensajeLogin");
  const botonIngresar = formularioLogin.querySelector("button[type='submit']");

  if (intentos >= 3) {
    mensaje.textContent = "Acceso bloqueado. Se alcanzaron tres intentos.";
    botonIngresar.disabled = true;
    return;
  }

  let accesoValido = usuario.toLowerCase() === "admin" && contrasena === "1234";
  let nombreUsuario = "admin";
  let usuarios = [];
  try {
    const datosUsuarios = localStorage.getItem("esd_usuarios");
    if (datosUsuarios !== null) usuarios = JSON.parse(datosUsuarios);
  } catch (error) {
    usuarios = [];
  }

  if (!accesoValido && usuarios instanceof Array) {
    for (let i = 0; i < usuarios.length; i++) {
      const usuarioGuardado = usuarios[i].usuario || usuarios[i].username;
      const contrasenaGuardada = usuarios[i].contrasena || usuarios[i].password;
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