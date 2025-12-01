// src/components/EditModal.jsx

import React, { useState, useEffect } from 'react';

// Reusing modal styles defined in ConfirmModal.jsx (simplified inline here)
const ModalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100
};

const ContentStyle = {
    padding: '25px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    maxWidth: '400px',
    width: '100%',
    color: '#333',
    textAlign: 'left'
};

const EditModal = ({ book, onSave, onCancel }) => {
    const [title, setTitle] = useState(book.title);
    const [author, setAuthor] = useState(book.author);

    const handleSubmit = (event) => {
        event.preventDefault();
        onSave(book.id, { ...book, title, author });
    };

    return (
        <div style={ModalStyle}>
            <form onSubmit={handleSubmit} style={ContentStyle}>
                <h3>Edit Book (ID: {book.id})</h3>
                
                {/* ID Field (Read-only) */}
                <label style={{ display: 'block', margin: '10px 0 5px 0' }}>Book ID:</label>
                <input 
                    type="text" 
                    value={book.id} 
                    readOnly 
                    disabled // Cannot be changed
                    style={{ background: '#eee', padding: '8px', border: '1px solid #ccc', width: '95%' }} 
                />

                {/* Title Field (Editable) */}
                <label style={{ display: 'block', margin: '10px 0 5px 0' }}>Title:</label>
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                    style={{ padding: '8px', border: '1px solid #ccc', width: '95%' }} 
                />

                {/* Author Field (Editable) */}
                <label style={{ display: 'block', margin: '10px 0 5px 0' }}>Author:</label>
                <input 
                    type="text" 
                    value={author} 
                    onChange={(e) => setAuthor(e.target.value)} 
                    required 
                    style={{ padding: '8px', border: '1px solid #ccc', width: '95%' }} 
                />
                
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <button 
                        type="submit"
                        style={{ padding: '10px 15px', backgroundColor: '#5995DA', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}
                    >
                        Save Changes
                    </button>
                    <button 
                        type="button" 
                        onClick={onCancel}
                        style={{ padding: '10px 15px', backgroundColor: '#ccc', color: '#333', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditModal;