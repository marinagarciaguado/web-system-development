import React, { useState, useEffect } from 'react';
import bookService from './services/bookService'; 
import OptionsMenu from './components/OptionsMenu'; 
import EditModal from './components/EditModal';    
import ConfirmModal from './components/ConfirmModal'; 
import './App.css'; 

const App = () => {
    const [books, setBooks] = useState([]); 
    const [newTitle, setNewTitle] = useState('');
    const [newAuthor, setNewAuthor] = useState('');
  
    const [bookToEdit, setBookToEdit] = useState(null);      
    const [bookToDelete, setBookToDelete] = useState(null);   
    
    useEffect(() => {
        bookService
            .getAll()
            .then(initialBooks => {
                setBooks(initialBooks); 
            })
            .catch(error => {
                console.error('Error fetching initial books:', error);
            });
    }, []); 


    const openEditModal = (book) => setBookToEdit(book);
    const closeEditModal = () => setBookToEdit(null);

    const openDeleteConfirm = (book) => setBookToDelete(book);
    const closeDeleteConfirm = () => setBookToDelete(null);

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
    
    const handleUpdateBook = (id, updatedBook) => {
        bookService
            .update(id, updatedBook)
            .then(returnedBook => {
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

    const handleTitleChange = (event) => setNewTitle(event.target.value);
    const handleAuthorChange = (event) => setNewAuthor(event.target.value);

    return (
        <div className="app-container">
            <h1>Book Inventory Management</h1>

            <form onSubmit={handleAddBook} className="add-form">
                <h2>Add New Book</h2>
                <input type="text" value={newTitle} onChange={handleTitleChange} placeholder="Book Title" required/>
                <input type="text" value={newAuthor} onChange={handleAuthorChange} placeholder="Author Name" required/>
                <button type="submit" className="add-button">Add Book</button>
            </form>

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

                            <OptionsMenu 
                                book={book}
                                onEditClick={openEditModal}
                                onDeleteClick={openDeleteConfirm}
                            />
                        </li>
                    );
                })}
            </ul>

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