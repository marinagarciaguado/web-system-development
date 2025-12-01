import React from 'react';

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
    textAlign: 'center'
};

const ConfirmModal = ({ book, onConfirm, onCancel }) => {
    return (
        <div style={ModalStyle}>
            <div style={ContentStyle}>
                <h3>Confirm Deletion</h3>
                <p>Are you sure you want to delete:</p>
                <p><strong>{book.title}</strong> by {book.author}</p>
                
                <div style={{ marginTop: '20px' }}>
                    <button 
                        onClick={() => onConfirm(book.id, book.title)}
                        style={{ padding: '10px 15px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}
                    >
                        Yes, I am sure
                    </button>
                    <button 
                        onClick={onCancel}
                        style={{ padding: '10px 15px', backgroundColor: '#ccc', color: '#333', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        No, go back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;