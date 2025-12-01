import { Router } from 'express';

const booksRouter = Router();

// In-memory data store (Simulated Database)
let books = [];

// Helper to generate a sequential unique ID
const generateId = () => {
  // Find the maximum existing ID and add 1
  const maxId = books.length > 0
    ? Math.max(...books.map(b => b.id))
    : 0;
  return maxId + 1;
};

// =======================================================
// === 1. GET /books - Returns the full list of books (Read) ===
// =======================================================
booksRouter.get('/', (request, response) => {
  response.json(books);
});

// =======================================================
// === 2. GET /books/:id - Returns a single book by its ID (Read) ===
// =======================================================
booksRouter.get('/:id', (request, response) => {
  const id = Number(request.params.id); 
  const book = books.find(b => b.id === id);

  if (book) {
    response.json(book);
  } else {
    // If not found, respond with 404 Not Found
    response.status(404).json({ error: 'book not found' }); 
  }
});

// =======================================================
// === 3. POST /books - Adds a new book (Create) ===
// =======================================================
booksRouter.post('/', (request, response) => {
  const body = request.body; 

  // Input validation: title and author required
  if (!body.title || !body.author) {
    // If invalid, respond with 400 Bad Request
    return response.status(400).json({ 
      error: 'title or author missing'
    });
  }

  const newBook = {
    id: generateId(), 
    title: body.title,
    author: body.author
  };

  // Update the in-memory array immutably
  books = books.concat(newBook); 

  // Respond with status 201 Created and the new resource
  response.status(201).json(newBook);
});

// =======================================================
// === 4. PUT /books/:id - Replaces a book by ID (Update) ===
// =======================================================
booksRouter.put('/:id', (request, response) => { // <-- NEW PUT ROUTE
    const id = Number(request.params.id);
    const body = request.body;

    // Validation: Title and author required for update
    if (!body.title || !body.author) {
        return response.status(400).json({ error: 'title or author missing' });
    }

    const updatedBook = {
        id: id,
        title: body.title,
        author: body.author
    };

    let found = false;
    // Use map to create a new array: replacing the matched book or keeping others
    books = books.map(book => {
        if (book.id === id) {
            found = true;
            return updatedBook; // Return the new, updated book object
        }
        return book; // Keep existing books
    });

    if (found) {
        // Send back the updated resource with 200 OK
        response.json(updatedBook);
    } else {
        // If the ID to update was not found
        response.status(404).json({ error: 'book not found' });
    }
});


// =======================================================
// === 5. DELETE /books/:id - Deletes a book by ID (Delete) ===
// =======================================================
booksRouter.delete('/:id', (request, response) => {
  const id = Number(request.params.id);

  // Filter the book out (immutable update)
  const initialLength = books.length;
  books = books.filter(book => book.id !== id);
  const newLength = books.length;
  
  if (newLength < initialLength) {
      // 204 No Content for successful deletion
      response.status(204).end();
  } else {
    // Respond with 404 if the book was not found
    response.status(404).json({ error: 'book not found' }); 
  }
});


// Export the router for use in index.js
export default booksRouter;