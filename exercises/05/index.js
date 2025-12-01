import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import booksRouter from './books.js'; 

const app = express();
const PORT = process.env.PORT || 3000; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method);
    console.log('Path:', request.path);
    console.log('Body:', request.body);
    console.log('---');
    next();
};
app.use(requestLogger);

app.use('/books', booksRouter); 

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); 
});