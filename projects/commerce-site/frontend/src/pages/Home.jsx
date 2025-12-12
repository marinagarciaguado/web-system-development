// src/pages/Home.jsx
import React from 'react';
import IngredientVisualMap from '../components/IngredientVisualMap'; 
// Placeholders for images (you must find these and place them in src/assets/)
import spanishPatioImage from '../assets/spanish_patio.png'; 
import freshIngredientsImage from '../assets/fresh_ingredients.png';


const Home = () => {
  return (
    <div className="home-container">
      
      {/* -------------------- SECTION 1: HERO - FRESHNESS & WOOD BACKGROUND -------------------- */}
      <section className="home-section freshness-banner initial-wood-section">
        <h2 className="hero-title">EL MÁS FRESCO DE LOS FRESCOS</h2>
        <p className="hero-subtitle">
          Garantizamos la pureza en cada gota. Nuestro producto se elabora diariamente sin aditivos, químicos ni conservantes. Mantenemos la excelencia con un proceso 100% natural, garantizando frescura y sabor auténticos.
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
                Nuestros valores residen en el producto fiel a la receta original, la agricultura de proximidad (KM0), y un sabor inigualable. El gazpacho y el salmorejo son el máximo exponente de la agricultura ecológica y producto sostenible.
              </p>
            </div>
            {/* Placeholder for the Spanish Patio Image (right column) */}
            <div className="history-image content-block">
                <img src={spanishPatioImage} alt="Patio andaluz, nuestra inspiración" />
            </div>
          </section>
          
          <hr className="section-divider" />

          {/* -------------------- BLOCK B: INGREDIENTS & PRODUCT VISUAL (Image Left, Text Right) -------------------- */}
          <section className="home-section ingredients-section two-column-layout reverse-columns">
            {/* Image Placeholder for Fresh Ingredients (Left column in this reversed layout) */}
            <div className="history-image content-block">
                <img src={freshIngredientsImage} alt="Verduras frescas de proximidad" />
            </div>
            
            <div className="history-text content-block">
                <h3>LA ESENCIA DEL SABOR ANDALUZ</h3>
                <p className="subtitle">
                    Descubre la pureza en nuestra gama de productos. Cada botella es un tributo a la frescura, desde nuestros pilares, el Gazpacho y Salmorejo, hasta nuestras exclusivas Cremas Frescas (Zanahoria con Manzana, Calabacín, Vichyssoise).
                </p>
                <p>
                    **Nuestros valores nutricionales:** Productos veganos, sin gluten, sin azúcares añadidos, y 100% naturales.
                </p>
                
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
                    Contamos con una moderna planta de producción desde 2020, dotada de la mejor tecnología disponible para el procesado y envasado de alimentos 100% vegetales.
                </p>
                <p>
                    Reducimos nuestra huella de carbono en un 30% gracias a acciones como el cambio de packaging. Como acción innovadora, pondremos a disposición de los clientes un código QR para ver la procedencia y fotografías de las verduras que están consumiendo. Nuestro mejor argumento de venta es dejar que las verduras hablen por nosotros.
                </p>
            </div>
            {/* Placeholder for the Modern Factory Image (right column) */}
            
          </section>
          {/* Ensures there is space between the last content block and the footer */}
          <div style={{ paddingBottom: '80px' }}></div> 
      </div>
    </div>
  );
};

export default Home;