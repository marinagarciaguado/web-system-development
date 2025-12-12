// frontend/src/pages/admin/AdminUserManagement.jsx
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { AdminCreateUserSchema } from '../../schemas/userSchemas'; 
import axios from 'axios';

// Asegúrate de que API_BASE_URL esté definido en tu entorno o en otro lugar
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

const AdminUserManagement = () => {
    const [statusMessage, setStatusMessage] = useState(null);
    const [isError, setIsError] = useState(false);

    const initialValues = {
        email: '',
        full_name: '',
        phone: '',
        nif: '',
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        setStatusMessage(null);
        setIsError(false);
        try {
            // Llama al endpoint de creación de usuarios (POST /api/users)
            const response = await axios.post(`${API_BASE_URL}/api/users`, values);
            
            // Si el backend es exitoso, mostrará un mensaje
            setStatusMessage(`Usuario ${response.data.client.email} creado con éxito. Se envió un email de activación para establecer la contraseña.`);
            resetForm();

        } catch (err) {
            // Manejo de errores desde el backend (ej: usuario ya existe, NIF inválido)
            const msg = err.response?.data?.error || err.response?.data?.message || 'Error al crear el usuario. Verifique los datos o la conexión.';
            setIsError(true);
            setStatusMessage(msg);
            
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="admin-crud-container">
            <h2>Creación y Gestión de Clientes</h2>
            
            <div className="product-form-section">
                <h3>Crear Nueva Cuenta de Cliente</h3>
                
                {/* Mensajes de Estado */}
                {statusMessage && (
                    <div className={`alert ${isError ? 'alert-error' : 'alert-success'}`}>
                        {statusMessage}
                    </div>
                )}

                <Formik
                    initialValues={initialValues}
                    validationSchema={toFormikValidationSchema(AdminCreateUserSchema)}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="form-grid">
                                
                                {/* Email */}
                                <div className="form-group">
                                    <label htmlFor="email">Correo Electrónico *</label>
                                    <Field name="email" type="email" placeholder="cliente@ejemplo.com" />
                                    <ErrorMessage name="email" component="div" className="error-message" />
                                </div>
                                
                                {/* NIF / CIF */}
                                <div className="form-group">
                                    <label htmlFor="nif">NIF / CIF *</label>
                                    <Field name="nif" type="text" placeholder="12345678X" />
                                    <ErrorMessage name="nif" component="div" className="error-message" />
                                </div>
                                
                                {/* Nombre Completo */}
                                <div className="form-group full-width">
                                    <label htmlFor="full_name">Nombre Completo</label>
                                    <Field name="full_name" type="text" placeholder="Nombre de Contacto o Empresa" />
                                    <ErrorMessage name="full_name" component="div" className="error-message" />
                                </div>

                                {/* Teléfono */}
                                <div className="form-group full-width">
                                    <label htmlFor="phone">Teléfono</label>
                                    <Field name="phone" type="tel" placeholder="600 123 456" />
                                    <ErrorMessage name="phone" component="div" className="error-message" />
                                </div>
                                
                            </div>

                            <div className="form-actions">
                                <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                    {isSubmitting ? 'Enviando invitación...' : 'Crear Usuario y Enviar Activación'}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AdminUserManagement;