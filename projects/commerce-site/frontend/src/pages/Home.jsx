// src/pages/Home.jsx
import React from 'react';
import IngredientVisualMap from '../components/IngredientVisualMap'; 
import spanishPatioImage from '../assets/spanish_patio.png'; 
import freshIngredientsImage from '../assets/fresh_ingredients.png';


const Home = () => {
  return (
    <div className="home-container">
    
      <section className="home-section freshness-banner initial-wood-section">
        <h2 className="hero-title">EL MAS FRESCO DE LOS FRESCOS</h2>
        <p className="hero-subtitle">
          Garantizamos la pureza en cada gota. Nuestro producto se elabora diariamente sin aditivos, quimicos ni conservantes. Mantenemos la excelencia con un proceso 100% natural, garantizando frescura y sabor autenticos.
        </p>
      </section>

      <div className="scrolling-content-wrapper">
          
          <section className="home-section brand-history two-column-layout">
            <div className="history-text content-block">
              <h3>NUESTRA MARCA, NUESTRA HISTORIA</h3>
              <p>
                Capon de Galera fue creada en 2019 por dos jovenes emprendedores sevillanos. Nuestra mision es buscar la excelencia en el sabor y respetar la receta original del gazpacho y el salmorejo.
                Nuestros valores residen en el producto fiel a la receta original, la agricultura de proximidad (KM0), y un sabor inigualable. El gazpacho y el salmorejo son el maximo exponente de la agricultura ecologica y producto sostenible.
              </p>
            </div>
            <div className="history-image content-block">
                <img src={spanishPatioImage} alt="Patio andaluz, nuestra inspiracion" />
            </div>
          </section>
          
          <hr className="section-divider" />

          <section className="home-section ingredients-section two-column-layout reverse-columns">
            <div className="history-image content-block">
                <img src={freshIngredientsImage} alt="Verduras frescas de proximidad" />
            </div>
            
            <div className="history-text content-block">
                <h3>LA ESENCIA DEL SABOR ANDALUZ</h3>
                <p className="subtitle">
                    Descubre la pureza en nuestra gama de productos. Cada botella es un tributo a la frescura, desde nuestros pilares, el Gazpacho y Salmorejo, hasta nuestras exclusivas Cremas Frescas (Zanahoria con Manzana, Calabacin, Vichyssoise).
                </p>
                <br></br>
                <p>
                    Nuestros valores nutricionales: Productos veganos, sin gluten, sin azucares añadidos, y 100% naturales.
                </p>
                <br></br>
                <IngredientVisualMap /> 
            </div>
          </section>
          
          <hr className="section-divider" />

          <section className="home-section sustainability-section two-column-layout">
              <div className="history-text content-block">
                <h3>PRODUCCION SOSTENIBLE Y TRAZABILIDAD</h3>
                <p>
                  Contamos con una moderna planta de produccion desde 2020, dotada de la mejor tecnologia disponible para el procesado y envasado de alimentos 100% vegetales.
                </p>
                <p>
                  Reducimos nuestra huella de carbono en un 30% gracias a acciones como el cambio de packaging. Como accion innovadora, pondremos a disposicion de los clientes un codigo QR para ver la procedencia y fotografias de las verduras que estan consumiendo. Nuestro mejor argumento de venta es dejar que las verduras hablen por nosotros.
                </p>
              </div>
          </section>
          <div style={{ paddingBottom: '80px' }}></div> 
      </div>
    </div>
  );
};

export default Home;