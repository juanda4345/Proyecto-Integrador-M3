"use strict";

const formularioRegistro = document.querySelector("#formularioRegistro");

function cargarUsuarios() {
  try {
    const datosUsuarios = localStorage.getItem("esd_usuarios");
    if (datosUsuarios === null) return [];
    const usuariosGuardados = JSON.parse(datosUsuarios);
    if (usuariosGuardados instanceof Array) return usuariosGuardados;
  } catch (error) {
    return [];
  }
  return [];
}

function registrarUsuario(evento) {
  evento.preventDefault();
  const nombre = document.querySelector("#nombre").value.trim();
  const usuario = document.querySelector("#usuarioRegistro").value.trim();
  const contrasena = document.querySelector("#contrasenaRegistro").value;
  const confirmarContrasena = document.querySelector("#confirmarContrasena").value;
  const mensaje = document.querySelector("#mensajeRegistro");
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

  const usuarios = cargarUsuarios();
  for (let i = 0; i < usuarios.length; i++) {
    const usuarioGuardado = usuarios[i].usuario || usuarios[i].username;
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
