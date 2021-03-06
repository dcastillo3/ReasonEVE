import React from 'react';
import { Carousel as CarouselWidget } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Carousel = props => {

    const { items } = props;

    return (
        <div id="carousel-widget" className="carousel-widget flex-column flex-center palette-three bottom-blue">
            <div className="carousel-content flex-column flex-center narrow-content large-padding">

                <CarouselWidget
                    showStatus={false}
                    showIndicators={false}
                    showThumbs={false}
                    infiniteLoop={true}
                    // autoPlay={true}
                    interval={10000}
                    centerMode
                    emulateTouch
                >
                    {items.map((itemArr, i) => {

                        return (
                            <div key={`items-${i}`} className="carousel-items flex-row flex-center">

                                {itemArr.map((item, j) => {
                                    return (
                                        <div key={`item-${item}-${i}-${j}`} className={`carousel-item-${item}`}>{item}</div>
                                    )
                                })}

                            </div>
                        )
                    })}
                </CarouselWidget>

            </div>
        </div>
    )
}

export default Carousel;