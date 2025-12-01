import React, { useState, useEffect } from 'react';
import bookService from './services/bookService'; 
import './App.css'; 

const App = () => {
    // 1. State for data storage: manages the list of books
    const [books, setBooks] = useState([]); 
    // States for form inputs (controlled components)
    const [newTitle, setNewTitle] = useState('');
    const [newAuthor, setNewAuthor] = useState('');

    // === Fetch Data on Component Mount (READ Operation) ===
    useEffect(() => {
        // This effect runs only once when the component appears (due to empty dependency array [])
        bookService
            .getAll()
            .then(initialBooks => {
                setBooks(initialBooks); // Set the retrieved books into state
            })
            .catch(error => {
                // Alert user if the backend connection fails
                console.error('Error fetching initial books:', error);
                alert('Could not connect to the backend API on port 3000. Please ensure it is running.');
            });
    }, []); 

    // === Handle POST (CREATE Operation) ===
    const handleAddBook = (event) => {
        event.preventDefault(); // Prevents default page reload behavior

        // Basic client-side validation
        if (!newTitle || !newAuthor) {
            alert('Title and Author fields must not be empty.'); 
            return;
        }

        const bookObject = {
            title: newTitle, 
            author: newAuthor
        };

        bookService
            .create(bookObject)
            .then(returnedBook => {
                // Update component state immutably (never mutate state directly in React!) [cite: 6205, 6688]
                setBooks(books.concat(returnedBook)); 
                // Reset inputs using the setter functions
                setNewTitle('');
                setNewAuthor('');
            })
            .catch(error => {
                console.error('Error creating book:', error);
                alert('Error adding book.');
            });
    };

    // === Handle DELETE (DELETE Operation) ===
    const handleDeleteBook = (id, title) => {
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            bookService
                .remove(id)
                .then(() => {
                    // Update state immutably by filtering out the deleted item
                    setBooks(books.filter(book => book.id !== id)); 
                })
                .catch(error => {
                    console.error('Error deleting book:', error);
                    alert(`The book "${title}" was already deleted from the server. Removing from view.`);
                    // Clean up client state if resource is confirmed deleted
                    setBooks(books.filter(book => book.id !== id)); 
                });
        }
    };

    // Handlers for controlled input components (updating state on change)
    const handleTitleChange = (event) => {
        setNewTitle(event.target.value);
    };

    const handleAuthorChange = (event) => {
        setNewAuthor(event.target.value);
    };

    // === Rendering the UI using JSX ===
    return (
        <div className="app-container">
            <h1>📚 Book Inventory Management</h1>

            {/* --- Add Book Form --- */}
            <form onSubmit={handleAddBook} className="add-form">
                <h2>Add New Book (POST)</h2>
                {/* Inputs are controlled components */}
                <input
                    type="text"
                    value={newTitle}
                    onChange={handleTitleChange} // Binds input changes to state
                    placeholder="Book Title"
                    required
                />
                <input
                    type="text"
                    value={newAuthor}
                    onChange={handleAuthorChange}
                    placeholder="Author Name"
                    required
                />
                <button type="submit" className="add-button">
                    Add Book
                </button>
            </form>

            {/* --- Book List --- */}
            <h2>Current Inventory (GET)</h2>
            <ul className="book-list">
                {/* Render a list using the map array method, using key prop */}
                {books.map(book => (
                    <li key={book.id} className="book-item">
                        <span>
                            <strong>{book.title}</strong> by {book.author} (ID: {book.id})
                        </span>
                        <button 
                            onClick={() => handleDeleteBook(book.id, book.title)}
                            className="delete-button"
                        >
                            Delete (DELETE)
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
