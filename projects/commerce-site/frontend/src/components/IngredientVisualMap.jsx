// src/components/IngredientVisualMap.jsx
import React from 'react';
// 1. Import the image file (Vite handles the path conversion)
import ingredientVisualImage from '../assets/ingredient_visual.png'; 

const IngredientVisualMap = () => {
    return (
        <div className="ingredient-map-container">
            <h3>INGREDIENTES SOSTENIBLES</h3>
            <p className="subtitle">Visualización detallada de los ingredientes clave de Gazpacho y Salmorejo.</p>
            
            {/* 2. Use the imported variable as the source (src) */}
            <img 
                src={ingredientVisualImage} 
                alt="Mapa visual de ingredientes del gazpacho y salmorejo" 
                className="visual-ingredient-map"
                // Add basic inline style for initial display
                style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '20px auto' }}
            />
        </div>
    );
};

export default IngredientVisualMap;