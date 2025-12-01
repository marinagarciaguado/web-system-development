import { Router } from 'express';

const booksRouter = Router();

let books = [];

const generateId = () => {
  const maxId = books.length > 0
    ? Math.max(...books.map(b => b.id))
    : 0;
  return maxId + 1;
};

booksRouter.get('/', (request, response) => {
  response.json(books);
});

booksRouter.get('/:id', (request, response) => {
  const id = Number(request.params.id); 
  const book = books.find(b => b.id === id);

  if (book) {
    response.json(book);
  } else {
    response.status(404).json({ error: 'book not found' }); 
  }
});

booksRouter.post('/', (request, response) => {
  const body = request.body; 

  if (!body.title || !body.author) {
    return response.status(400).json({ 
      error: 'title or author missing'
    });
  }

  const newBook = {
    id: generateId(), 
    title: body.title,
    author: body.author
  };

  books = books.concat(newBook); 

  response.status(201).json(newBook);
});

booksRouter.put('/:id', (request, response) => {
    const id = Number(request.params.id);
    const body = request.body;

    if (!body.title || !body.author) {
        return response.status(400).json({ error: 'title or author missing' });
    }

    const updatedBook = {
        id: id,
        title: body.title,
        author: body.author
    };

    let found = false;
    books = books.map(book => {
        if (book.id === id) {
            found = true;
            return updatedBook; 
        }
        return book;
    });

    if (found) {
        response.json(updatedBook);
    } else {
        response.status(404).json({ error: 'book not found' });
    }
});

booksRouter.delete('/:id', (request, response) => {
  const id = Number(request.params.id);

  const initialLength = books.length;
  books = books.filter(book => book.id !== id);
  const newLength = books.length;
  
  if (newLength < initialLength) {
      response.status(204).end();
  } else {
    response.status(404).json({ error: 'book not found' }); 
  }
});


export default booksRouter;