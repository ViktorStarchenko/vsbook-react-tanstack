import {useEffect, useState} from 'react';
import classes from './SlideShow.module.css'
import SlideShowItem from "./SlideShowItem";
import {Link} from "react-router-dom";
import SlideShowButtonPrev from "./SlideShowButtonPrev";
import SlideShowButtonNext from "./SlideShowButtonNext";

export default function SlideShow({data}) {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlideIndex((prevIndex) =>
                prevIndex < data.items.length - 1 ? prevIndex + 1 : 0
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    function handlePrev() {
        setCurrentSlideIndex((currentSlideIndex - 1) < 0 ? data.items.length - 1 : currentSlideIndex - 1);
    }

    function handleNext() {
        setCurrentSlideIndex((currentSlideIndex + 1) > data.items.length - 1 ? 0 : currentSlideIndex + 1);
    }

    return (
        <>
            <div className="slideshow-wrapper mb-1rem">
                <SlideShowButtonPrev buttonHandler={handlePrev}/>
                <div className="slideshow">

                    {data.items.map((item, index) => (
                        <div key={index} index={index} className={index === currentSlideIndex ? 'active' : ''}>
                            <SlideShowItem>
                                <div className="hero-banner">
                                    {item.image && (
                                        <div className="hero-banner-image">
                                            {item.enable_overlay && <div className="overlay"></div>}
                                            <img src={item.image.url} alt={item.image.title}/>
                                        </div>
                                    )}
                                    <div className="hero-banner-content">
                                        {item.title && <div className="h2" dangerouslySetInnerHTML={{__html: item.title}}></div>}
                                        {item.description && <div className="hero-banner-description" dangerouslySetInnerHTML={{__html: item.description}}></div>}
                                        {item.button && <div><Link className="btn" to={item.button.url} target={item.button.target}>{item.button.title}</Link></div>}
                                    </div>
                                </div>
                            </SlideShowItem>
                        </div>
                    ))}
                </div>
                <SlideShowButtonNext buttonHandler={handleNext}/>
            </div>
        </>



    );
}