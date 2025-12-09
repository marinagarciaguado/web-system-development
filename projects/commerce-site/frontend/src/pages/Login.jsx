import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí iría la lógica real de auth. Simulamos éxito.
    if (email) {
      alert("Welcome to the system");
      navigate('/admin');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Owner Access</h2>
        <label>Email</label>
        <input 
          type="email" 
          required 
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input type="password" required />
        <button type="submit">Enter</button>
      </form>
    </div>
  );
}

export default Login;