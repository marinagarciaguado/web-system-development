import express from 'express';
import cors from 'cors';
import booksRouter from './books.js'; 

const app = express();
const PORT = process.env.PORT || 3000; 

app.use(cors());

app.use(express.json());

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method);
    console.log('Path:', request.path);
    console.log('Body:', request.body);
    console.log('---');
    next();
};
app.use(requestLogger);

app.get('/', (request, response) => {
    response.send('<h1>📚 Welcome to the Books API!</h1><p>The REST API endpoints are available under <code>/books</code>.</p>');
});

app.use('/books', booksRouter); 

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); 
});