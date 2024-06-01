import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "pages/Home/Home";

import LoginForm from 'components/AuthForm/LoginForm/LoginForm';
import RegisterForm from 'components/AuthForm/RegisterForm/RegisterForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/register" element={<RegisterForm/>} />
      </Routes>
    </Router>
  );
};

export default App;
