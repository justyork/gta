import React from 'react';
import Carousel from 'infinite-react-carousel';

class Slider extends React.Component{

    _isMounted = false;
    handleKeyActived = false;

    constructor(props) {
        super(props);

        this.state = {
            value: props.value
        }
    }


    render() {

        let images = this.props.items.map((src, index) =>
            <div className="widget_slider__item" key={index}  onClick={this.handleClick.bind(this, index)}>
                <div className={"widget-slider__image "+(this.state.value === index ? 'active' : '')} style={{backgroundImage: 'url(' + src + ')'}}  />
            </div>
        )

        return (
            <React.Fragment>
                <div className="widget-slider">
                    <Carousel
                        slidesToShow={3}
                        wheel={true}
                        initialSlide={this.state.value}
                        centerPadding={4}
                        ref={slider => (this.slider = slider)}
                        prevArrow={<button className="widget-slider__arrow left"></button>}
                        nextArrow={<button className="widget-slider__arrow right"></button>}
                        afterChange={() => this.afterChange()}
                        beforeChange={(oldIndex, newIndex) => this.handleArrow(oldIndex, newIndex)}
                        centerMode={true}
                    >
                        {images}
                    </Carousel>
                </div>
            </React.Fragment>
        )
    }

    /** Переключить изображение и отправить ID
     *
     * @returns {number}
     */
    nextImage() {
        this.slider.slickNext()
        return this.getNextImageId()
    }

    /** Переключить изображение и отправить ID
     *
     * @returns {number}
     */
    previousImage() {
        this.slider.slickPrev()
        return this.getPrevImageId()
    }

    /** Получить id следующего элемента
     *
     * @returns {number|*}
     */
    getNextImageId(){
        let index = this.state.value;
        if(index === this.props.items.length - 1){
            return  0;
        }
        return index + 1
    }

    /** Получить id предыдущего элменета
     *
     * @returns {number}
     */
    getPrevImageId(){
        let index = this.state.value;
        if(index === 0){
            return this.props.items.length - 1
        }
        return index - 1;
    }

    /** Переключение стрелками
     *
     * @param oldIndex
     * @param newIndex
     */
    handleArrow(oldIndex, newIndex){
        if(Number.isInteger(oldIndex) && Number.isInteger(newIndex) && !this.handleKeyActived){
            this.setState({
                value:newIndex
            }, () => {this.update()})
        }
    }

    /** Переключение мышкой на картинку
     *
     * @param index
     */
    handleClick(index){
        this.slider.slickGoTo(index)
        this.setState({
            value:index
        }, () => {this.update()})
    }

    /** Переключение клавишами
     *
     * @param event
     */
    handleKeyDown(event) {
        if(this._isMounted && this.props.controll && [39, 37].includes(event.keyCode)){
            this.handleKeyActived = true
            let index = this.state.value
            if(event.keyCode === 37) index = this.previousImage()
            if(event.keyCode === 39) index = this.nextImage()

            this.setState({
                value:index
            }, () => {this.update()})
        }
    }

    /**
     * Обнулить переменную отслеживающую начало изменений при нажатии клавиатуры
     */
    afterChange(){
        this.handleKeyActived = false
    }

    componentDidMount() {
        this._isMounted = true;
        document.addEventListener("keydown", this.handleKeyDown.bind(this), false);
    }

    componentWillUnmount() {
        this._isMounted = false;
        window.removeEventListener("keydown", this.handleKeyDown, false);
    }

    /**
     * Отправить родителю
     */
    update() {
        this.props.update(this.state)
    }
}
export default Slider;