import React from 'react';
import Carousel from 'infinite-react-carousel';

class Slider extends React.Component{

    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            slideIndex: props.default
        }
    }


    render() {

        let images = this.props.items.map((src, index) =>
            <div className="widget_slider__item" key={index}>
                <div className={"widget-slider__image "+(this.state.slideIndex === index ? 'active' : '')} style={{backgroundImage: 'url(' + src + ')'}}  />
            </div>
        )

        return (
            <React.Fragment>
                <div className="widget-slider">
                    <Carousel
                        slidesToShow={3}
                        wheel={true}
                        initialSlide={this.state.slideIndex}
                        centerPadding={4}
                        ref={slider => (this.slider = slider)}
                        prevArrow={<button className="widget-slider__arrow left"></button>}
                        nextArrow={<button className="widget-slider__arrow right"></button>}
                        centerMode={true}
                    >
                        {images}
                    </Carousel>
                </div>
            </React.Fragment>
        )
    }

    nextImage() {
        let index = this.state.slideIndex;
        if(index !== this.props.items.length - 1){
            this.slider.slickNext()
            return  index++;
        }
    }

    previousImage() {
        let index = this.state.slideIndex;
        if(index !== 0){
            this.slider.slickPrev()
            return index--;
        }
    }

    handleKeyDown(event) {
        if(this._isMounted && this.props.controll){
            let index = this.state.slideIndex
            if(event.keyCode === 37) index = this.previousImage()
            if(event.keyCode === 39) index = this.nextImage()

            this.setState({
                slideIndex:index
            })
        }
    }
    componentDidMount() {
        this._isMounted = true;
        document.addEventListener("keydown", this.handleKeyDown.bind(this), false);
    }

    componentWillUnmount() {
        this._isMounted = false;
        window.removeEventListener("keydown", this.handleKeyDown, false);
    }
}
export default Slider;