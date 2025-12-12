// src/pages/ContactPage.jsx
import React, { useState } from 'react';
import './ContactPage.css';

const IconMap = () => (
 <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
);
const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
);
const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
);
const IconFacebook = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
);
const IconInstagram = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);
const IconTwitter = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
);

const ContactPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
    alert('Gracias! Nos pondremos en contacto contigo pronto.');
    setFormData({ nombre: '', email: '', mensaje: '' });
  };

  return (
    <div className="contact-container">
      <h1>Contactanos</h1>
      <p className="contact-subtitle">Estamos aqui para ayudarte. Envianos un mensaje o visitanos.</p>
      
      <div className="contact-grid">
        <form onSubmit={handleSubmit} className="contact-form-card">
          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej. Juan Perez"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo Electronico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="juan@ejemplo.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="mensaje">Mensaje</label>
            <textarea
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              rows="5"
              placeholder="Escribe tu consulta aqui..."
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">Enviar Mensaje</button>
        </form>

        <div className="contact-info-card">
          <h2>Informacion</h2>
          
          <div className="info-list">
            <div className="info-item">
              <div className="icon-box"><IconMap /></div>
              <div>
                <h4>Nuestra Oficina</h4>
                <p>Avenida de las Universidades 2, Sevilla, España</p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon-box"><IconPhone /></div>
              <div>
                <h4>Telefono</h4>
                <p><a href="tel:+34912345678">+34 912 345 678</a></p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon-box"><IconMail /></div>
              <div>
                <h4>Email</h4>
                <p><a href="mailto:ayuda@capondegalera.com">ayuda@capondegalera.com</a></p>
              </div>
            </div>
          </div>

          <div className="social-section">
            <h3>Siguenos</h3>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><IconFacebook /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><IconInstagram /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><IconTwitter /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;