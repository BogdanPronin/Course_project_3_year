import React, { useState } from 'react';
import '../AuthForm.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Добавляем состояние для сообщения об успехе

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage(''); // Очищаем ошибки перед отправкой формы
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setSuccessMessage('Registration successful!'); // Устанавливаем сообщение об успехе
      console.log(data)
      // Очищаем форму или перенаправляем пользователя на другую страницу
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unexpected error occurred');
      }
    }
  };

  return (
    <div className='login'>
      <h4>Регистрация</h4>
      <form onSubmit={handleSubmit}>
        <div className='text_area'>
          <input
            type="text"
            name="username"
            placeholder="Имя"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className='text_area'>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='text_area'>
          <input
            type="text"
            name="phone"
            placeholder="Телефон"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className='text_area'>
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {errorMessage && <div className='error_form_message'>{errorMessage}</div>}
        {successMessage && <div className='success_form_message'>{successMessage}</div>}

        <button className="submit_button" type="submit">Зарегистрироваться</button>
        
      </form>
      <div className='submit_login_link'><a className="link" href="/login">Войти</a></div>
    </div>
  );
}

export default RegisterForm;
