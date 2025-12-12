import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { LoginSchema } from '../schemas/authSchemas';
import './Login.css'; // Importamos el nuevo CSS

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setError(null);
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', values);
      const { user, token } = response.data;
      
      login(user, token);

      if (user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'customer') {
        navigate('/products');
      } 
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al iniciar sesión. Revisa tus credenciales.';
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-card">
        <h1>Bienvenido de nuevo</h1>
        <p className="login-subtitle">Inicia sesión para gestionar tu cuenta o pedidos</p>
        
        {error && <div className="alert alert-error">{error}</div>}

        <Formik
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(LoginSchema)}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="login-form">
              <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <Field 
                  type="email" 
                  name="email" 
                  className="form-control" 
                  placeholder="ejemplo@correo.com"
                />
                <ErrorMessage name="email" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <Field 
                  type="password" 
                  name="password" 
                  className="form-control" 
                  placeholder="••••••••"
                />
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>

              <button type="submit" disabled={isSubmitting} className="btn-login">
                {isSubmitting ? 'Cargando...' : 'Iniciar Sesión'}
              </button>
            </Form>
          )}
        </Formik>

        <div className="login-footer">
          <p className="forgot-password-link">
            ¿Olvidaste tu contraseña? <br/>
            <span className="small-text">(Clientes B2B contactar con administración)</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;