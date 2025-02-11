
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SlickSlider(
    {
        slidesToShow = 1,
        slidesToShow1024 = 3,
        slidesToShow767 = 2,
        slidesToShow600 = 1,
        slidesToScroll = 1,
        slidesToScroll1024 = 1,
        slidesToScroll767 = 1,
        slidesToScroll600 = 1,
        speed = 500,
        infinite = true,
        dots = true,
        autoplay = false,
        autoplaySpeed = 2000,
        adaptiveHeight = false,
        children
    }) {

    var settings = {
        dots: dots,
        infinite: infinite,
        speed: speed,
        slidesToShow: slidesToShow,
        slidesToScroll: slidesToScroll,
        autoplay: autoplay,
        autoplaySpeed: autoplaySpeed,
        adaptiveHeight: adaptiveHeight,
        centerMode: true,
        centerPadding: "20px",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: slidesToShow1024,
                    slidesToScroll: slidesToScroll1024,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: slidesToShow767,
                    slidesToScroll: slidesToScroll767,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: slidesToShow600,
                    slidesToScroll: slidesToScroll600
                }
            }
        ]
    };
    return (
        <div className="slick-slider-wrapper">
            <Slider {...settings}>
                {children}
            </Slider>
        </div>
    )
}