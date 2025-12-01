// src/components/OptionsMenu.jsx

import React, { useState } from 'react';

const OptionsMenu = ({ book, onEditClick, onDeleteClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleEdit = () => {
        onEditClick(book);
        setIsOpen(false);
    };

    const handleDelete = () => {
        onDeleteClick(book);
        setIsOpen(false);
    };

    // Style for the three vertical dots (⋮)
    const buttonStyle = {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1.5em', // Make the dots visible
        padding: '0 5px',
        color: '#555',
        lineHeight: '1em',
        position: 'relative'
    };

    const menuStyle = {
        position: 'absolute',
        top: '100%',
        right: '0',
        zIndex: 10,
        background: 'white',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        minWidth: '120px',
        textAlign: 'left'
    };

    const menuItemStyle = {
        padding: '8px 12px',
        cursor: 'pointer',
        color: '#333'
    };

    return (
        <div style={{ position: 'relative' }}>
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                style={buttonStyle}
            >
                {'\u22EE'} {/* Vertical Ellipsis Unicode Character (⋮) */}
            </button>
            
            {isOpen && (
                <div style={menuStyle}>
                    <div 
                        onClick={handleEdit} 
                        style={menuItemStyle}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                        onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
                    >
                        Edit Book
                    </div>
                    <div 
                        onClick={handleDelete} 
                        style={menuItemStyle}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                        onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
                    >
                        Delete Book
                    </div>
                </div>
            )}
        </div>
    );
};

export default OptionsMenu;