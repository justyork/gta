import React from 'react';

class Keys extends React.Component{



    getIcon(key){
        return <div className={'key-list__icon ' + key.toLowerCase()}>{key.toLowerCase()}</div>;
    }


    render() {
        const list = this.props.keys.map((item) =>
            <li key={item.key instanceof Array ? (item.key.map((val) => val )) : item.key}>
                <div className="key-list__text">{item.text}</div>
                {item.key instanceof Array ? (item.key.map((val) => this.getIcon(val))) :  this.getIcon(item.key)}
            </li>
        );

        return (
            <React.Fragment>
                <ul className="key-list ">
                    {list}
                </ul>
            </React.Fragment>
        );
    }

}

export default Keys;
