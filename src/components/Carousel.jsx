// Carousel.js
import { useEffect, useRef, useState } from 'react';
import '../css/Carousel.css';
import image1 from '/images/image1.jpeg';
import image2 from '/images/image2.jpeg';
import image3 from '/images/image3.jpeg';
import image4 from '/images/image4.jpeg';
import image5 from '/images/image5.jpeg';
import image6 from '/images/image6.jpeg';

const Carousel = () => {
    const carouselSlidesRef = useRef(null);
    const [index, setIndex] = useState(0);
    const totalSlides = 6; // Total number of slides

    // Function to show the specific slide
    const showSlide = (i) => {
        let newIndex = i;
        if (i >= totalSlides) {
            newIndex = 0;
        } else if (i < 0) {
            newIndex = totalSlides - 1;
        }
        setIndex(newIndex);
        if (carouselSlidesRef.current) {
            carouselSlidesRef.current.style.transform = `translateX(-${newIndex * 100}%)`;
        }
    };

    // Set up interval for auto slide
    useEffect(() => {
        const slideInterval = setInterval(() => {
            showSlide(index + 1);
        }, 2000);

        // Cleanup interval on component unmount
        return () => clearInterval(slideInterval);
    }, [index]);

    // Button click handlers
    const handlePrev = () => {
        showSlide(index - 1);
    };

    const handleNext = () => {
        showSlide(index + 1);
    };

    return (
        
        <div className="carousel">
            <button className="carousel-button prev" onClick={handlePrev}>❮</button>
            <button className="carousel-button next" onClick={handleNext}>❯</button>
            <div className="carousel-slides" ref={carouselSlidesRef}>
                <div className="carousel-slide">
                    <img src={image1} alt="Image 1" />
                </div>
                <div className="carousel-slide">
                    <img src={image2} alt="Image 2" />
                </div>
                <div className="carousel-slide">
                    <img src={image3} alt="Image 3" />
                </div>
                <div className="carousel-slide">
                    <img src={image4} alt="Image 4" />
                </div>
                <div className="carousel-slide">
                    <img src={image5} alt="Image 5" />
                </div>
                <div className="carousel-slide">
                    <img src={image6} alt="Image 6" />
                </div>
            </div>
        </div>
    );
};

export default Carousel;
