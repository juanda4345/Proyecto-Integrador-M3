"use strict";

var formularioRegistro = document.querySelector("#formularioRegistro");

function cargarUsuarios() {
  try {
    var datosUsuarios = localStorage.getItem("esd_usuarios");
    if (datosUsuarios === null) return [];
    var usuariosGuardados = JSON.parse(datosUsuarios);
    if (usuariosGuardados instanceof Array) return usuariosGuardados;
  } catch (error) {
    return [];
  }
  return [];
}

function registrarUsuario(evento) {
  evento.preventDefault();
  var nombre = document.querySelector("#nombre").value.trim();
  var usuario = document.querySelector("#usuarioRegistro").value.trim();
  var contrasena = document.querySelector("#contrasenaRegistro").value;
  var confirmarContrasena = document.querySelector("#confirmarContrasena").value;
  var mensaje = document.querySelector("#mensajeRegistro");
  mensaje.textContent = "";

  if (!nombre || !usuario || !contrasena || !confirmarContrasena) {
    mensaje.textContent = "Completa todos los campos.";
    return;
  }
  if (usuario.toLowerCase() === "admin") {
    mensaje.textContent = "Ese nombre de usuario está reservado.";
    return;
  }
  if (contrasena !== confirmarContrasena) {
    mensaje.textContent = "Las contraseñas no coinciden.";
    return;
  }

  var usuarios = cargarUsuarios();
  for (var i = 0; i < usuarios.length; i++) {
    var usuarioGuardado = usuarios[i].usuario || usuarios[i].username;
    if (usuarioGuardado && usuarioGuardado.toLowerCase() === usuario.toLowerCase()) {
      mensaje.textContent = "Ese usuario ya está registrado.";
      return;
    }
  }

  usuarios.push({ nombre: nombre, usuario: usuario, contrasena: contrasena });
  try {
    localStorage.setItem("esd_usuarios", JSON.stringify(usuarios));
    window.location.assign("login.html");
  } catch (error) {
    mensaje.textContent = "No fue posible guardar la cuenta en este navegador.";
  }
}

formularioRegistro.addEventListener("submit", registrarUsuario);
