// src/App.jsx

import React, { useState, useEffect } from 'react';
import bookService from './services/bookService'; 
import OptionsMenu from './components/OptionsMenu'; // <-- NEW IMPORT
import EditModal from './components/EditModal';     // <-- NEW IMPORT
import ConfirmModal from './components/ConfirmModal'; // <-- NEW IMPORT
import './App.css'; 

const App = () => {
    const [books, setBooks] = useState([]); 
    const [newTitle, setNewTitle] = useState('');
    const [newAuthor, setNewAuthor] = useState('');
    
    // State for modal visibility and data
    const [bookToEdit, setBookToEdit] = useState(null);       // Book object for editing
    const [bookToDelete, setBookToDelete] = useState(null);   // Book object for confirmation
    
    // === Fetch Data on Component Mount (READ Operation) ===
    useEffect(() => {
        bookService
            .getAll()
            .then(initialBooks => {
                setBooks(initialBooks); 
            })
            .catch(error => {
                console.error('Error fetching initial books:', error);
                // alert('Could not connect to the backend API on port 3000. Please ensure it is running.');
            });
    }, []); 

    // === Handlers for Modals ===

    const openEditModal = (book) => setBookToEdit(book);
    const closeEditModal = () => setBookToEdit(null);

    const openDeleteConfirm = (book) => setBookToDelete(book);
    const closeDeleteConfirm = () => setBookToDelete(null);

    // === Handlers for CRUD Operations ===

    // 1. CREATE (POST) - (No change to logic)
    const handleAddBook = (event) => {
        event.preventDefault(); 
        if (!newTitle || !newAuthor) {
            alert('Title and Author fields must not be empty.'); 
            return;
        }

        const bookObject = { title: newTitle, author: newAuthor };

        bookService
            .create(bookObject)
            .then(returnedBook => {
                setBooks(books.concat(returnedBook)); 
                setNewTitle('');
                setNewAuthor('');
            })
            .catch(error => {
                console.error('Error creating book:', error);
                alert('Error adding book.');
            });
    };
    
    // 2. UPDATE (PUT) - NEW LOGIC
    const handleUpdateBook = (id, updatedBook) => {
        bookService
            .update(id, updatedBook)
            .then(returnedBook => {
                // Map over the book list and replace the old version with the updated one
                setBooks(books.map(book => 
                    book.id !== id ? book : returnedBook
                ));
                closeEditModal();
            })
            .catch(error => {
                console.error('Error updating book:', error);
                alert(`Could not update book. Error: ${error.message}`);
            });
    };

    // 3. DELETE (REMOVE) - MODIFIED LOGIC (to work with modal confirmation)
    const handleConfirmDelete = (id, title) => {
        bookService
            .remove(id)
            .then(() => {
                setBooks(books.filter(book => book.id !== id)); 
                closeDeleteConfirm();
            })
            .catch(error => {
                console.error('Error deleting book:', error);
                alert(`The book "${title}" was already deleted from the server. Removing from view.`);
                setBooks(books.filter(book => book.id !== id)); 
                closeDeleteConfirm();
            });
    };

    // Handlers for controlled input components
    const handleTitleChange = (event) => setNewTitle(event.target.value);
    const handleAuthorChange = (event) => setNewAuthor(event.target.value);

    // === Rendering the UI using JSX ===
    return (
        <div className="app-container">
            <h1>Book Inventory Management</h1>

            {/* --- Add Book Form --- */}
            <form onSubmit={handleAddBook} className="add-form">
                <h2>Add New Book</h2>
                {/* ... (input fields and button) ... */}
                <input type="text" value={newTitle} onChange={handleTitleChange} placeholder="Book Title" required/>
                <input type="text" value={newAuthor} onChange={handleAuthorChange} placeholder="Author Name" required/>
                <button type="submit" className="add-button">Add Book</button>
            </form>

            {/* --- Book List --- */}
            <h2>Current Inventory</h2>
            <ul className="book-list">
                {books.map(book => {
                    const formattedId = String(book.id).padStart(4, '0');
                    return (
                        <li key={book.id} className="book-item">
                            <div className="book-info"> 
                                <span>
                                    <strong>{formattedId}</strong> 
                                    &nbsp; 
                                    <strong>{book.title}</strong> by {book.author}
                                </span>
                            </div>
                            
                            {/* NEW: Options Menu Button */}
                            <OptionsMenu 
                                book={book}
                                onEditClick={openEditModal}
                                onDeleteClick={openDeleteConfirm}
                            />
                        </li>
                    );
                })}
            </ul>

            {/* --- Modals Rendered Here (Conditionally) --- */}
            {bookToEdit && (
                <EditModal 
                    book={bookToEdit} 
                    onSave={handleUpdateBook} 
                    onCancel={closeEditModal} 
                />
            )}
            
            {bookToDelete && (
                <ConfirmModal 
                    book={bookToDelete} 
                    onConfirm={handleConfirmDelete} 
                    onCancel={closeDeleteConfirm} 
                />
            )}
        </div>
    );
};

export default App;