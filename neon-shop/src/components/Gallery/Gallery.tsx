import React from 'react';
import './Gallery.css';


const Gallery = () => {
    return (
        <div id='gallery' className="gallery_row_outer">
            <div className="gallery_container">
                <div className="gallery_heading">
                    <h1>Наши работы</h1>
                </div>
                <div className='gallery_text'>
                    <p>Мы вдохновляемся идеями наших клиентов и с удовольствием реализуем даже самые сложные и смелые проекты для Вас
                    </p>
                    </div>
                

                <div className="gallery_grid">
                    <div className="gallery_item gallery_item1"></div>
                    <div className="gallery_item gallery_item2"></div>
                    <div className="gallery_item gallery_item3"></div>
                    <div className="gallery_item gallery_item4"></div>
                    <div className="gallery_item gallery_item5"></div>
                    
                </div>
            </div>
        </div>
    );
};

export default Gallery;