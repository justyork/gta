import React from 'react';

class Progress extends React.Component{

    _isMounted = false;
    constructor(props) {
        super(props);

        this.state = {
            value: props.value
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

    /** Нажатие на кнопку
     *
     * @param index
     */
    handleClick(index){
        let isActive = index === 0
        this.setState({
            value: isActive
        }, () => {
            this.update(this)
        })
    }

    setActiveClass(index){
        if(this.state.value && index === 0)
            return 'active'
        else if(!this.state.value && index === 1)
            return 'active'
        return  ''
    }

    /** Переключение нажатием на клавиши
     *
     * @param event
     */
    handleKeyDown(event) {
        if(this._isMounted && this.props.controll && [39, 37].includes(event.keyCode)){
            let isActive = this.state.value
            if(event.keyCode === 39) isActive = false;
            if(event.keyCode === 37) isActive = true;
            this.setState({
                value: isActive
            }, () => {
                this.update(this)
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
    update() {
        this.props.update(this.state)
    }

}
export default Progress;