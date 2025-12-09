# 🛒 Catálogo de Comercio - Full Stack App

Este proyecto es una aplicación web completa para la gestión y visualización de un catálogo de productos comercial. Permite a los clientes ver productos y a los administradores gestionar el inventario (CRUD) mediante una interfaz segura.

## 🚀 Tecnologías Utilizadas

* **Frontend:** React, Vite, CSS3 (Diseño Responsive).
* **Backend:** Node.js, Express.
* **Base de Datos:** PostgreSQL (vía Docker).
* **Seguridad:** Validaciones de entrada, CORS, Variables de entorno.

---

## 📋 Prerrequisitos

Antes de empezar, asegúrate de tener instalado lo siguiente en tu ordenador:

1.  **Node.js** (v18 o superior): [Descargar aquí](https://nodejs.org/)
2.  **Docker Desktop** (Para la base de datos): [Descargar aquí](https://www.docker.com/products/docker-desktop/)
    * *Nota: Asegúrate de que Docker esté abierto y corriendo antes de empezar.*

---

## 🛠️ Guía de Instalación Paso a Paso

Sigue estos pasos en orden para arrancar el proyecto.

### Paso 1: Clonar el repositorio
Abre tu terminal y descarga el código:

```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DE_LA_CARPETA>
Paso 2: Preparar la Base de Datos (PostgreSQL)
Abre tu terminal en la raíz del proyecto.

Ejecuta el siguiente comando para descargar y encender el contenedor de la base de datos:

Bash

docker run --name mi-catalogo-db -e POSTGRES_PASSWORD=tu_contraseña_secreta -p 5432:5432 -d postgres
Paso 3: Configurar el Backend (Servidor)
Entra en la carpeta del backend e instala las librerías:

Bash

cd backend
npm install
IMPORTANTE: Crea un archivo llamado .env dentro de la carpeta backend/ y pega el siguiente contenido exacto:

Fragmento de código

PORT=3000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=tu_contraseña_secreta
DB_NAME=postgres
DB_PORT=5432
Inicializa las tablas y datos de prueba ejecutando este comando:

Bash

npm run seed
(Deberías ver el mensaje: "Tablas creadas y datos insertados").

Paso 4: Configurar el Frontend (Cliente)
Abre una nueva terminal.

Entra en la carpeta del frontend e instala las librerías:

Bash

cd frontend
npm install
▶️ Ejecución del Proyecto
Necesitarás mantener dos terminales abiertas.

Terminal 1 (Backend): Dentro de la carpeta backend, ejecuta:

Bash

npm run dev
Debe decir: 🚀 Servidor corriendo en http://localhost:3000

Terminal 2 (Frontend): Dentro de la carpeta frontend, ejecuta:

Bash

npm run dev
Debe mostrar una URL local, por ejemplo: http://localhost:5173

🧪 Cómo probar la aplicación
Abre tu navegador y ve a la URL del Frontend (ej. http://localhost:5173).

Ver Catálogo: En la página de inicio verás los productos cargados desde la base de datos.

Gestión (CRUD):

Haz clic en "Login" en el menú.

Introduce cualquier email y contraseña para entrar (Simulación).

Serás redirigido al Panel de Administración.

Prueba a Añadir un producto nuevo (aparecerá al instante).

Prueba a Eliminar un producto existente.

🆘 Solución de Problemas Comunes
Error: connect ECONNREFUSED 127.0.0.1:5432

Solución: Docker no está corriendo o el contenedor está apagado. Abre Docker Desktop y asegúrate de que el contenedor mi-catalogo-db tiene el estado "Running".

Error: password authentication failed

Solución: La contraseña en el archivo backend/.env no coincide con la que usaste en el comando docker run. Asegúrate de que ambas sean tu_contraseña_secreta.

La web se ve vacía o da "Network Error"

Solución: Asegúrate de que el Backend (Terminal 1) sigue ejecutándose y no se ha cerrado.


---

### ¿Por qué este README es bueno para tu profesor?
1.  **Instalación a prueba de fallos:** Le da el comando exacto de Docker y el contenido exacto del `.env`. No tiene que adivinar nada.
2.  **Orden lógico:** Primero base de datos, luego servidor, luego cliente.
3.  **Solución de problemas:** Si algo falla, tiene una sección rápida para arreglarlo sin tener que preguntarte.

¡Con esto y el código que hemos hecho, tu proyecto está impecable!