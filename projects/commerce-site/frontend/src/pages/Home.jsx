// src/pages/Home.jsx
import React from 'react';
import IngredientVisualMap from '../components/IngredientVisualMap'; 
// Import image placeholders for the new staggered layout
import freshIngredientsImage from '../assets/fresh_ingredients.png';
import modernFactoryImage from '../assets/modern_factory.png';


const Home = () => {
  return (
    <div className="home-container">
      {/* -------------------- SECTION 1: HERO - FRESHNESS & WOOD BACKGROUND -------------------- */}
      <section className="home-section freshness-banner initial-wood-section">
          <h2 className="hero-title">EL MÁS FRESCO DE LOS FRESCOS</h2>
          <p className="hero-subtitle"> {/* ADDED CLASS HERE */}
              Tenemos el producto más fresco del mercado, sin aditivos ni químicos. 
              No realizamos ningún proceso químico en la elaboración y/o en el envasado. 
              Garantizamos un producto fresco con 15 días de caducidad, manteniendo la cadena de frío.
          </p>
      </section>

      {/* -------------------- SECTION 2: LIGHT GREY BACKGROUND WRAPPER -------------------- */}
      <div className="scrolling-content-wrapper">
          
          {/* -------------------- BLOCK A: BRAND HISTORY & PATIO VISUAL (Text Left, Image Right) -------------------- */}
          <section className="home-section brand-history two-column-layout">
            <div className="history-text content-block">
              <h3>NUESTRA MARCA, NUESTRA HISTORIA</h3>
              <p>
                Capón de Galera fue creada en 2019 por dos jóvenes emprendedores sevillanos. Nuestra misión es buscar la excelencia en el sabor y respetar la receta original del gazpacho y el salmorejo.
                Nuestros valores residen en el producto fiel a la receta original, la agricultura de proximidad (KM0), y un sabor inigualable.
              </p>
              <br></br>
              <p>
                Compromiso: El gazpacho y el salmorejo son el máximo exponente de la agricultura ecológica y producto sostenible.
              </p>
            </div>
            {/* Placeholder for the Patio Image (right column) */}
            <div className="history-image content-block">
                <img src={modernFactoryImage} alt="Patio Interior" style={{maxWidth: '100%', borderRadius: '0px'}} />
            </div>
          </section>
          
          <hr className="section-divider" />

          {/* -------------------- BLOCK B: INGREDIENTS & PRODUCT VISUAL (Image Left, Text Right) -------------------- */}
          <section className="home-section ingredients-section two-column-layout reverse-columns">
            {/* Image Placeholder for Fresh Ingredients */}
            <div className="history-image content-block">
                {/* Image Placeholder - Fresh Vegetables */}
                <img src={freshIngredientsImage} alt="Verduras frescas para gazpacho" style={{maxWidth: '100%', borderRadius: '0px'}} />
            </div>
            
            <div className="history-text content-block">
                <h3>LA ESENCIA DEL SABOR ANDALUZ</h3>
                <p className="subtitle">
                    Descubre la pureza de nuestra gama de productos. Utilizamos ingredientes 100% naturales, frescos y de proximidad, garantizando la trazabilidad.
                </p>
                <p>
                    Nuestros pilares: Gazpacho y Salmorejo (sin pan en la versión de Gazpacho), y nuestras Cremas Frescas Veganas, Sin Gluten, y Sin Azúcares Añadidos (Zanahoria con Manzana, Calabacín, Vichyssoise, etc.).
                </p>
                <br></br>
                {/* Visual Ingredient Map Component */}
                <IngredientVisualMap /> 
            </div>
          </section>
          
          <hr className="section-divider" />

          {/* -------------------- BLOCK C: PRODUCTION & SUSTAINABILITY (Text Left, Image Right) -------------------- */}
          <section className="home-section sustainability-section two-column-layout">
             <div className="history-text content-block">
                <h3>PRODUCCIÓN SOSTENIBLE Y TRAZABILIDAD</h3>
                <p>
                    Contamos con una moderna planta de producción desde 2020, dotada de la mejor tecnología para el procesado y envasado de alimentos 100% vegetales.
                </p>
                <p>
                    Reducimos nuestra huella de carbono en un 30% gracias a acciones llevadas a cabo (como el cambio de packaging). Como acción innovadora, pondremos a disposición de los clientes un código QR para ver la procedencia y fotografías de las verduras que están consumiendo.
                </p>
            </div>
            
          </section>
          
          {/* Ensures there is space between the last content block and the footer */}
          <div style={{ paddingBottom: '80px' }}></div> 
      </div>
    </div>
  );
};

export default Home;