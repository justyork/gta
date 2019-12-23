import React from 'react';
import "animate.css";

class Notify extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // Пропы - это наши переданные состояния родительского компонента
        // мы можем их читать, но не изменять

        // Это буквально if (this.props.show == true) return "animated bounceInDown";
        // и его else вариант
        let className = this.props.show ? "animated bounceInDown" : "animated bounceOut";

        return (
            <React.Fragment>
                <div id="inner-header" className={className}>
                    <h1 id="h1" className='text'><img src="Vector.png" alt=""></img>Внимание</h1>
                    <h2 className='text'>{this.props.text}</h2>
                </div>
            </React.Fragment>
        )
    }
}
export default Notify;