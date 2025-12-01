import express from 'express';
import cors from 'cors';
import booksRouter from './books.js'; 

const app = express();
// Use port 3000 as a default if the environment variable PORT is not set
const PORT = process.env.PORT || 3000; 

// --- Application-Level Middleware ---

// 1. JSON Parser Middleware: Transforms incoming JSON strings into JS objects (req.body)
app.use(express.json());

// 2. Custom Logger Middleware: Logs details about incoming requests
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method);
    console.log('Path:', request.path);
    console.log('Body:', request.body);
    console.log('---');
    next(); // Pass control to the next middleware/route handler
};
app.use(requestLogger);

// --- Routes (To be completed in the next step) ---

// Serve a static HTML file at / as a welcome page
app.get('/', (request, response) => {
    response.send('<h1>📚 Welcome to the Books API!</h1><p>The REST API endpoints are available under <code>/books</code>.</p>');
});

// // 3. Link the Books API Router (Uncomment this later in step 4)
app.use('/books', booksRouter); 

// --- Error Handling Middleware ---

// 4. Unknown Endpoint Middleware: Catches requests to non-existent routes
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};
// Place this at the very end, after all valid routes
app.use(unknownEndpoint);

// --- Start Server ---

app.listen(PORT, () => {
    // The console.log statement is correctly inside the callback function
    console.log(`Server running on port ${PORT}`); 
});