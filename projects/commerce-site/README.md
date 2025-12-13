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
```bash
git clone [URL_DE_TU_REPOSITORIO]
cd web-system-development

2. Arrancar la Base de Datos (Docker)Abre una terminal y ejecuta:Bashdocker run --name capon-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=capon_db -p 5432:5432 -d postgres
3. Configuración del BackendBashcd backend
npm install
Crea un archivo .env en la carpeta backend con este contenido exacto:Fragmento de códigoPORT=3001
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=capon_db
JWT_SECRET=secreto_capon_de_galera_2024
FRONTEND_URL=http://localhost:5173
Iniciar servidor e inicializar tablas:Bashnpm run dev
4. Configuración del FrontendAbre una nueva terminal:Bashcd frontend
npm install
Iniciar cliente web:Bashnpm run dev
Accede a la aplicación en: http://localhost:5173🗄️ Esquema de Base de DatosEl sistema utiliza un esquema relacional normalizado:users: Administradores del sistema.id (PK), email, password_hash, role.products: Catálogo de Capón de Galera.id (PK), name (ej: "Salmorejo Fresco" 3), category (Gazpachos/Cremas), format (1000ml / 500ml 4), price, stock.(La relación es gestionada a nivel de aplicación: solo los usuarios autenticados pueden modificar la tabla products).📡 Documentación de la APIEndpoints principales disponibles en http://localhost:3001/api:AutenticaciónMétodoEndpointDescripciónPOST/auth/registerRegistro de nuevo administradorPOST/auth/loginAcceso y obtención de Token JWTGestión de Productos (Requiere Token)MétodoEndpointDescripciónGET/productsListar todos los gazpachos y cremasPOST/productsAñadir nuevo producto al catálogoPUT/products/:idActualizar stock o detalles del productoDELETE/products/:idEliminar un producto del sistema👥 AutorProyecto realizado para la asignatura de Desarrollo de Sistemas Web - Universidad Loyola.
***

### ⚠️ Paso Crítico Final: Tu Base de Datos

Como hemos cambiado la temática de "Tareas" a "Productos de Capón de Galera", **debes ejecutar este SQL en tu base de datos** (usando DBeaver o TablePlus) para que coincida con el README:

```sql
-- Borrar tablas viejas si existen
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

-- Crear Tabla de Usuarios
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Crear Tabla de Productos (Adaptada al PDF)
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,    -- Ej: "Salmorejo Sin Pan"
    category VARCHAR(100),         -- Ej: "Sopas Frías" o "Cremas"
    format VARCHAR(50),            -- Ej: "1L" o "0.5L"
    description TEXT               -- Ej: "Con aceite de oliva virgen extra"
);
