import React, { useState } from 'react';
import LoginForm from '../../components/AuthForm/LoginForm/LoginForm'; // Импортируйте компонент формы входа
import RegisterForm from '../../components/AuthForm/RegisterForm/RegisterForm'; // Импортируйте компонент формы регистрации

const AuthPage = () => {
  const [isLoginActive, setIsLoginActive] = useState(true); // Состояние для отслеживания активной формы

  return (
    <div>
      <div>
        <button onClick={() => setIsLoginActive(true)}>Login</button>
        <button onClick={() => setIsLoginActive(false)}>Register</button>
      </div>
      {isLoginActive ? <LoginForm /> : <RegisterForm />}
    </div>
  );
};

export default AuthPage;
