// src/App.jsx
import './App.css';
function App() {
console.log('Hello');
return <h1>Tic Tac Toe</h1>;
}
export default App;

import './App.css';
function Square() {
return <button className="square">X</button>;
}
function App() {
return (
<>
<h1>Tic Tac Toe</h1>
<Square />
</>
);
}
export default App;
