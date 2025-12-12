import React, { useState } from 'react';
import './ProductCatalogPage.css';

import imgGazpacho from '../assets/products/gazpacho.png';      
import imgSalmorejo from '../assets/products/salmorejo.png';    
import imgCalabaza from '../assets/products/crema-calabaza.jpeg'; 
import imgCalabacin from '../assets/products/crema-calabacin.jpeg'; 

const ProductCatalogPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      id: 1,
      name: "Gazpacho Fresco",
      subtitle: "Sin Pan - Receta Original",
      description: "El sabor más puro elaborado con Tomate de Los Palacios y Aceite de Oliva Virgen Extra. Sin aditivos.",
      features: ["Sin Pan", "Tomate Los Palacios", "Vegano"],
      image: imgGazpacho, 
      bgColor: "#ff6b6b",
      details: {
        ingredientes: "Tomate, Pimiento, Pepino, AOVE, Vinagre, Sal y Ajo.",
        nutricion: "Producto fresco. Conservar en frío.",
        formato: "Botellas PET de 1L, 500ml y 250ml."
      }
    },
    {
      id: 2,
      name: "Salmorejo Fresco",
      subtitle: "Con Aceite de Oliva Virgen Extra",
      description: "Textura cremosa y sabor intenso. Elaborado con pan artesano y tomates seleccionados.",
      features: ["Textura Cremosa", "Rico en Fibra", "AOVE (14%)"],
      image: imgSalmorejo,
      bgColor: "#ff9f43",
      details: {
        ingredientes: "Tomate, AOVE (14%), pan, vinagre, sal y ajo.",
        nutricion: "174 kcal / 100ml.",
        formato: "Botella 1000 ml."
      }
    },
    {
      id: 3,
      name: "Crema de Calabaza",
      subtitle: "100% Natural",
      description: "Suave y ligera (34 kcal). Ideal para cuidarse sin renunciar al sabor.",
      features: ["34 kcal/100g", "Sin Lactosa", "Sin Gluten"],
      image: imgCalabaza,
      bgColor: "#feca57",
      details: {
        ingredientes: "Calabaza, verduras, agua, aceite y especias.",
        nutricion: "34 kcal / 100g.",
        formato: "Sin alérgenos."
      }
    },
    {
      id: 4,
      name: "Crema de Calabacín",
      subtitle: "Receta Casera",
      description: "Elaborada con calabacines frescos. Cena ligera y saludable.",
      features: ["56 kcal/100g", "Vitamina C", "Sin Alérgenos"],
      image: imgCalabacin,
      bgColor: "#1dd1a1",
      details: {
        ingredientes: "Calabacín, patata, cebolla, aceite, agua y sal.",
        nutricion: "56 kcal / 100g.",
        formato: "Vegano."
      }
    }
  ];

  return (
    <div className="catalog-container">
      <div className="catalog-header">
        <h1>Nuestros Productos</h1>
        <p>Sabor fresco y natural del campo a tu mesa.</p>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-wrapper">
              <div className="img-placeholder" style={{ backgroundColor: product.bgColor }}>
                {product.image ? (
                  <img src={product.image} alt={product.name} />
                ) : (
                  <span>{product.name}</span>
                )}
              </div>
            </div>

            <div className="product-content">
              <div className="product-tags">
                {product.features.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
              
              <h2>{product.name}</h2>
              <h3 className="product-subtitle">{product.subtitle}</h3>
              <p className="product-description">{product.description}</p>
              
              <button 
                className="btn-details"
                onClick={() => setSelectedProduct(product)}
              >
                Ver Ficha Técnica
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL / VENTANA EMERGENTE */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedProduct(null)}>×</button>
            
            <h2 style={{ color: 'var(--primary-color, #f7a31b)' }}>{selectedProduct.name}</h2>
            <hr style={{ margin: '10px 0', border: '0', borderTop: '1px solid #eee' }} />
            
            <div className="modal-body">
              <p><strong>Ingredientes:</strong><br/> {selectedProduct.details.ingredientes}</p>
              <p><strong>Nutrición:</strong><br/> {selectedProduct.details.nutricion}</p>
              <p><strong>Formato:</strong><br/> {selectedProduct.details.formato}</p>
            </div>

            <button className="btn-details" onClick={() => setSelectedProduct(null)} style={{marginTop: '20px'}}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCatalogPage;