import React from 'react';
import Slider from "rc-slider/lib/Slider";
import 'rc-slider/assets/index.css';

class Progress extends React.Component{

    _isMounted = false;
    constructor(props) {
        super(props);

        this.state = {
            value: props.value
        }
    }

    render() {
        return (
            <React.Fragment>
                <Slider
                    min={this.props.min}
                    max={this.props.max}
                    step={this.props.step}
                    value={this.state.value}
                    onChange={this.setValue.bind(this)}
                    onAfterChange={this.update.bind(this)}
                />
            </React.Fragment>
        )
    }

    setValue(e) {
        this.setState({ value: e },  () => {
            this.update(this)
        })
    }
    update() {
        this.props.update(this.state)
    }
    handleKeyDown(event) {
        if(this._isMounted && this.props.controll && [39, 37].includes(event.keyCode)){
            let val = this.state.value
            if(event.keyCode === 37) val = this.decreaseValue()
            if(event.keyCode === 39) val = this.increaseValue()
            this.setValue(val)
        }
    }

    increaseValue(){
        let val = this.state.value
        if(val === this.props.max) return val;
        return val += this.props.step;
    }

    decreaseValue(){
        let val = this.state.value
        if(val === 0) return val;
        return val -= this.props.step;
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
export default Progress;