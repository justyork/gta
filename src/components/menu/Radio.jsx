
import React from 'react';

class Progress extends React.Component{

    _isMounted = false;
    constructor(props) {
        super(props);

        this.state = {
            isActive: props.active
        }
    }

    render() {

        let buttons = this.props.items.map((button, index) =>
            <a key={index} className={this.setActiveClass(index)} onClick={this.handleClick.bind(this, index)}>{button}</a>
        )
        return (
            <React.Fragment>
                <div className="widget-radio">
                    {buttons}
                </div>
            </React.Fragment>
        )
    }

    handleClick(index){
        this.setState({
            isActive: index === 0
        })
    }

    setActiveClass(index){
        if(this.state.isActive && index === 0)
            return 'active'
        else if(!this.state.isActive && index === 1)
            return 'active'
        return  ''
    }


    handleKeyDown(event) {
        if(this._isMounted && this.props.controll){
            let isActive = this.state.isActive
            if(event.keyCode === 39) isActive = false;
            if(event.keyCode === 37) isActive = true;
            this.setState({
                isActive: isActive
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
export default Progress;