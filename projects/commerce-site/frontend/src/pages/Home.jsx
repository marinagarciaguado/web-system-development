// src/pages/Home.jsx
import React from 'react';
import IngredientVisualMap from '../components/IngredientVisualMap'; 

const Home = () => {
  return (
    <div className="home-container">
      {/* -------------------- SECTION 1: WOOD BACKGROUND -------------------- */}
      {/* This section will sit over the body's wood background */}
      <section className="home-section freshness-banner initial-wood-section">
        <h2>EL MÁS FRESCO DE LOS FRESCOS</h2>
        <p>
          Tenemos el producto más fresco del mercado, sin aditivos ni químicos.
          No realizamos ningún proceso químico en la elaboración y/o en el envasado.
          Producimos diariamente Gazpacho y Salmorejo fresco en formatos 1L y 0,5L.
        </p>
      </section>

      {/* -------------------- SECTION 2: LIGHT GREY BACKGROUND WRAPPER -------------------- */}
      {/* This wrapper element enforces a solid, light background for all content below the fold */}
      <div className="scrolling-content-wrapper">
          
          {/* Brand History & Values */}
          <section className="home-section brand-history two-column-layout">
            <div className="history-text content-block">
              <h3>NUESTRA MARCA, NUESTRA HISTORIA</h3>
              <p>
                Capón de Galera fue creada en 2019 por dos jóvenes emprendedores sevillanos.
                La idea inicial fue la búsqueda de la excelencia en el sabor y respetar la receta original del gazpacho y el salmorejo.
                Nuestros valores son el producto fiel a la receta original, la agricultura de proximidad (KM0), y un sabor inigualable.
              </p>
            </div>
            {/* Placeholder for the Spanish Patio Image (right column) */}
            <div className="history-image content-block">
                {/* Image Placeholder */}
            </div>
          </section>
          
          <hr className="section-divider" />

          {/* Product Range / Visual Map Placeholder */}
          <section className="home-section ingredients-section">
            <h3>NUESTRA GAMA DE PRODUCTOS Y SUS INGREDIENTES</h3>
            <p className="subtitle">
              Explora los ingredientes de nuestros productos estrella: Gazpacho y Salmorejo, y nuestras Cremas Frescas (Zanahoria con Manzana, Calabacín, Vichyssoise).
            </p>
            
            <IngredientVisualMap /> 

          </section>

          {/* Sustainability and Traceability Section */}
          <section className="home-section sustainability-section">
            <h3>ACCIONES Y TRAZABILIDAD</h3>
            <p>
              Reducimos nuestra huella de carbono en un 30% gracias a acciones como el cambio de packaging.
              Como acción estratégica innovadora, pondremos a disposición de los clientes un código QR para ver la procedencia y fotografías de las verduras que están consumiendo.
              Nuestro mejor argumento de venta es dejar que las verduras hablen por nosotros.
            </p>
          </section>
          
          {/* Ensures there is space between the last content block and the footer */}
          <div style={{ paddingBottom: '80px' }}></div> 
      </div>
    </div>
  );
};

export default Home;