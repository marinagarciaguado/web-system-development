import axios from 'axios';

// The base URL for the books resource on your Express API (port 3000)
const baseUrl = 'http://localhost:3000/books';

// Fetch all books (GET /books) - Read
const getAll = () => {
    // axios.get returns a promise
    const request = axios.get(baseUrl);
    // We return a promise that resolves with the response.data (the book array)
    return request.then(response => response.data); 
};

// Create a new book entry (POST /books) - Create
const create = newObject => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data);
};

// Update a book by ID (PUT /books/:id) - Update
const update = (id, newObject) => { // <-- NEW FUNCTION
    // Sends the new object to the specific resource URL
    const request = axios.put(`${baseUrl}/${id}`, newObject); 
    return request.then(response => response.data);
};

// Delete a book by ID (DELETE /books/:id) - Delete
const remove = id => {
    // Construct the full URL using a template string
    const request = axios.delete(`${baseUrl}/${id}`); 
    // We return the promise. The status 204 typically has an empty response.data.
    return request.then(response => response.data); 
};

// Export all CRUD functions as a single default object 
export default { 
    getAll, 
    create, 
    update,
    remove 
};