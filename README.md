# ESD — Proyecto Integrador FrontEnd, Momento 3

ESD es una aplicación académica para gestionar calificaciones de estudiantes. Incluye inicio, registro e inicio de sesión, un resumen de notas y operaciones para registrar, consultar, buscar, editar y eliminar calificaciones.

## Requisitos

- Git para clonar el repositorio.
- Python 3 para iniciar un servidor local, o Visual Studio Code con la extensión Live Server.
- Un navegador moderno.

No se requiere `npm install`, base de datos ni servidor backend. La aplicación usa HTML, CSS y JavaScript sin dependencias externas.

## Clonar y ejecutar

Clona el repositorio y entra a la carpeta:

```bash
git clone https://github.com/juanda4345/Proyecto-Integrador-M3.git
cd Proyecto-Integrador-M3
```

Inicia un servidor web local desde la raíz del proyecto. En Windows, usa:

```powershell
py -m http.server 8000
```

En macOS o Linux, usa:

```bash
python3 -m http.server 8000
```

Deja esa terminal abierta y visita [http://localhost:8000/login.html](http://localhost:8000/login.html). Para detener el servidor, vuelve a la terminal y presiona `Ctrl+C`.

También puedes abrir la carpeta clonada en Visual Studio Code, iniciar Live Server desde `login.html` y usar la dirección local que muestre la extensión. No abras las páginas con `file://`: el navegador puede bloquear la solicitud `fetch()` que carga los datos.

## Cuenta de demostración

- Usuario: `admin`
- Contraseña: `1234`

También puedes crear una cuenta desde la página de registro.

## Datos y funcionamiento

- `notas.json` contiene los ocho registros de calificaciones iniciales.
- Al entrar a la aplicación, `js/app.js` carga ese archivo con `fetch()` y muestra las notas, el promedio y el resumen en la página.
- Los cambios hechos con el CRUD se guardan en `localStorage` del navegador. Cuando existe una lista guardada, esta se usa en lugar de volver a importar los datos iniciales.
- Las cuentas también se guardan en `localStorage`. Los datos no se comparten entre navegadores ni dispositivos y se pueden borrar al limpiar los datos del sitio.
- Para volver a cargar las notas originales durante el desarrollo, borra la clave `esd_notas` del almacenamiento local del sitio y recarga la página.

Esta aplicación es una demostración FrontEnd, no un sistema de autenticación seguro. No uses contraseñas ni información personal real.

## Estructura del proyecto

```text
Proyecto-Integrador-M3/
├── index.html       # Inicio, resumen, notas y contacto
├── login.html       # Inicio de sesión
├── registro.html    # Registro de cuenta
├── notas.json       # Datos iniciales para fetch()
├── css/
│   └── styles.css   # Estilos compartidos
├── img/
│   └── logo-esd.png # Logo de la aplicación
└── js/
    ├── app.js       # Navegación y CRUD de notas
    ├── login.js     # Validación del inicio de sesión
    └── registro.js  # Registro de cuentas
```
