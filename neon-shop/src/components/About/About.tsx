import React from 'react';
import "./About.css";
import { FaInstagram, FaTelegram, FaUser, FaWhatsapp } from 'react-icons/fa';

const About = () => {
    return (
        <>
            <div id='contacts' className="about_container_wrapper">
                <div className="about_container">
                    <div className='about_block_text'>
                        <p className="about_heading">
                            +7 925 228 15 03
                        </p>
                        <p className="about_heading">
                            neon.chameleon.ru@gmail.com
                        </p>
                        <p className="about_adress">
                            г.Москва, Электродная 1
                        </p>
                        <div className="social_icons">
                            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                                <FaWhatsapp color='black' />
                            </a>
                            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                                <FaInstagram color='black' />
                            </a>
                            <a href="https://www.twitter.com/" target="_blank" rel="noreferrer">
                                <FaTelegram color='black' />
                            </a>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default About;