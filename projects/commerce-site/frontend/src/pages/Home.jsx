// src/pages/Home.jsx
import React from 'react';
import IngredientVisualMap from '../components/IngredientVisualMap'; 

const Home = () => {
  return (
    <div className="home-container">
      
      {/* -------------------- SECTION 1: WOOD BACKGROUND (Transparent) -------------------- */}
      <section className="home-section freshness-banner initial-wood-section">
        <h2>EL MÁS FRESCO DE LOS FRESCOS</h2>
        <p>
          Tenemos el producto más fresco del mercado, sin aditivos ni químicos.
          No realizamos ningún proceso químico en la elaboración y/o en el envasado.
          Producimos diariamente Gazpacho y Salmorejo fresco en formatos 1L y 0,5L.
        </p>
      </section>

      {/* -------------------- SECTION 2: LIGHT GREY BACKGROUND WRAPPER -------------------- */}
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

          {/* Product Range / Visual Map Placeholder (ELEGANT CONTENT) */}
          <section className="home-section ingredients-section">
            <h3>LA ESENCIA DEL SABOR ANDALUZ</h3>
            <p className="subtitle">
              Descubre la pureza de nuestra gama de productos. Cada botella es un tributo a la frescura, desde nuestros pilares, el Gazpacho y Salmorejo, hasta nuestras exclusivas Cremas Frescas (Zanahoria con Manzana, Calabacín, Vichyssoise).
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