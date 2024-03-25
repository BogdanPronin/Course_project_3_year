import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom'; // Используем useNavigate
import { Link } from 'react-router-dom';
import '../AuthForm.css';

interface FormData {
  email: string;
  password: string;
}

function LoginForm() {
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Используем useNavigate для навигации

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        
        localStorage.setItem('token', data.token);
        
        navigate('/home'); // Используем navigate для перенаправления
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Ошибка авторизации');
      }
    } catch (error) {
      setError('Ошибка сервера');
    }
  };

  return (
    <div className='login'>
      <h4>Авторизация</h4>
      <form onSubmit={handleSubmit}>
        <div className='text_area'>
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className='text_area'>
          <input type="password" name="password" placeholder="Пароль" value={formData.password} onChange={handleChange} required />
        </div>
        {error && <div className="error_message">{error}</div>}
        <button className="submit_button" type="submit">Авторизоваться</button>
      </form>
      <Link to="/register" className="link">Зарегистрироваться</Link>
    </div>
  );
}

export default LoginForm;
