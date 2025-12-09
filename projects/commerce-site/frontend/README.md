# Frontend - Catálogo de Comercio

Interfaz de usuario para la visualización y gestión de productos del comercio familiar. Desarrollada con React y Vite.

## 🚀 Tecnologías

* **Framework:** React 18
* **Build Tool:** Vite
* **Routing:** React Router Dom
* **Estilos:** CSS3 (Grid/Flexbox)
* **Linting:** ESLint

## 🛠️ Configuración Local

1.  Asegúrate de tener **Node.js** instalado.
2.  Entra en la carpeta `frontend`:
    ```bash
    cd frontend
    ```
3.  Instala las dependencias:
    ```bash
    npm install
    ```
4.  Crea un archivo `.env` en la raíz de `frontend` (opcional si el backend corre en el puerto por defecto, pero recomendado):
    ```env
    VITE_API_URL=http://localhost:3000/api
    ```
5.  Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    ```
6.  Abre el navegador en `http://localhost:5173`.

## 📦 Estructura de Carpetas

* `src/components`: Componentes reutilizables (Navbar, Cards).
* `src/pages`: Vistas principales (Home, Admin, Login).
* `src/services`: Lógica de conexión con la API (fetch).

## 🔑 Funcionalidades

* Visualización pública del catálogo.
* Panel de administración protegido (simulación).
* Gestión de productos (Crear y Eliminar).