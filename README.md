# ESD — Proyecto Integrador FrontEnd, Momento 3

## Descripción

ESD (Espacio de Estudio Digital) es una aplicación académica para registrar y consultar las calificaciones de estudiantes. Este repositorio contiene la interfaz web del proyecto.

## Funciones

- Crear una cuenta e iniciar sesión.
- Registrar, consultar, buscar, editar y eliminar notas.
- Calcular el promedio de tres notas y mostrar si el estudiante aprobó.
- Consultar el total de registros, el promedio general y los estudiantes aprobados.
- Guardar cuentas y notas en el navegador mediante `localStorage`.

Las notas deben estar entre 1.0 y 5.0. Se aprueba con promedio igual o superior a 3.0.

## Tecnologías

- HTML y CSS para la estructura y presentación.
- JavaScript para eventos, validaciones y manipulación del DOM.
- Variables, funciones tradicionales, arreglos, objetos, condicionales y ciclos `for`.
- `localStorage` para conservar datos en el navegador.

## Estructura

```text
Proyecto-M2/
├── index.html       # Inicio, notas y contacto
├── login.html       # Inicio de sesión
├── registro.html    # Registro de cuenta
├── css/styles.css   # Estilos compartidos
├── img/             # Recursos gráficos
└── js/
    ├── app.js       # Navegación y gestión de notas
    ├── login.js     # Inicio de sesión
    └── registro.js  # Registro de cuenta
```

## Ejecución

Abre la carpeta en Visual Studio Code, inicia Live Server y visita `login.html`. También puedes ingresar con la cuenta de demostración:

- Usuario: `admin`
- Contraseña: `1234`

## Alcance de los datos

Esta versión es una demostración de FrontEnd: no tiene servidor conectado y los datos solo se guardan en el navegador utilizado. No ingreses información personal real.

