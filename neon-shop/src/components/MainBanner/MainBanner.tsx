import React from 'react';
import './MainBanner.css'; 
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

import logo from '../../images/logo.png'; 

const NeonChameleon = () => {

    const handleButtonClick = () => {

    };

    return (
        <div className="neon-chameleon-container">
            <img className="neon-logo" src={logo} alt="Logo" /> 
            <p className="neon-title">Создайте удивительную атмосферу в вашем пространстве с неоновыми вывесками</p>
            <a className="order-button" href="#about">Заказать</a>
        </div>
    );
};

export default NeonChameleon;;
