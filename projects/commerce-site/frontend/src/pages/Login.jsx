// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { LoginSchema } from '../schemas/authSchemas'; // Make sure this path is correct

const Login = () => { // **Ensure the component name is 'Login'**
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

      // Redirect based on role
      if (user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'customer') {
        navigate('/products');
      } 
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Check credentials and try again.';
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Inicia Sesión (Login)</h2>
      
      {error && <div className="alert alert-error">{error}</div>}

      <Formik
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(LoginSchema)} 
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <Field type="password" name="password" className="form-control" />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>

            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
              {isSubmitting ? 'Cargando...' : 'Iniciar Sesión'}
            </button>
          </Form>
        )}
      </Formik>

      <p className="forgot-password-link">
        ¿Olvidaste tu contraseña? (B2B clients contact admin)
      </p>
    </div>
  );
};

export default Login;