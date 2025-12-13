# 🍅 Capón de Galera - Sistema de Gestión Web

## 📋 Descripción del Proyecto
Aplicación web Full Stack desarrollada para la gestión digital de **Capón de Galera**, una empresa sevillana dedicada a la producción de gazpachos, salmorejos y cremas de verduras frescas.

El sistema permite a los administradores gestionar el catálogo de productos sostenibles y de Km0, controlando el inventario de las referencias actuales como el Gazpacho Sin Pan, Salmorejo con AOVE y las nuevas cremas de verduras.

### Características Principales
* **Autenticación Corporativa:** Acceso seguro mediante JWT para empleados/administradores.
* **Dashboard de Productos (CRUD):**
    * Alta de nuevos productos (ej: Crema de Calabaza, Vichyssoise).
    * Edición de información nutricional e ingredientes.
    * Eliminación de referencias descatalogadas.
* **Catálogo Digital:** Visualización de los formatos disponibles (1L y 0,5L).
* **Base de Datos Relacional:** Gestión estructurada de usuarios y catálogo en PostgreSQL.

---

## 🛠️ Technology Stack

El proyecto cumple con los requisitos técnicos del curso utilizando:

**Frontend**:
* **Vite + React:** Para una interfaz de usuario rápida y reactiva.
* **CSS Modules:** Estilizado fiel a la marca (colores corporativos y diseño limpio).
* **React Router:** Navegación fluida entre el login y el panel de control.

**Backend**:
* **Node.js & Express:** API RESTful robusta.
* **Cors & Helmet:** Seguridad y gestión de cabeceras.
* **Dotenv:** Configuración de variables de entorno.

**Base de Datos**:
* **PostgreSQL:** Persistencia de datos relacional.
* **Docker:** Contenerización de la base de datos para despliegue local.

---

## ⚙️ Instrucciones de Instalación Local

### Prerrequisitos
* Node.js (v18 o superior)
* Docker (para la base de datos PostgreSQL)
* Git

### 1. Clonar el repositorio

git clone [URL_DE_TU_REPOSITORIO]
cd web-system-development

### 2. Arrancar la Base de Datos (Docker)
Abre una terminal y ejecuta:

docker run --name capon-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=capon_db -p 5432:5432 -d postgres
