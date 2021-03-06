import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Progress from "./Progress";
import Radio from "./Radio";
import Slider from "./Slider";

class Menu extends React.Component{

    activeRef = null
    _isMounted = false;

    constructor(props) {
        super(props);

        let activeData = props.data.Active ? props.data.Items[props.data.Active] : null

        this._nodes = new Map();
        this.state = {
            activeButton: props.data.Active,
            activeData: activeData
        }
    }

    render() {
        const data = this.props.data

        const button_list = data.Items.map((item, key) =>
            this.listButton(item, key)
        )
        return (
            <React.Fragment>
                <div className={"menu__item menu__"+ (this.props.data.Position === 0 ? 'left' : 'right')}>
                    <h3>{data.Title}</h3>
                    <hr/>
                    <div className="menu-list" ref={ (ref) => this.activeRef = ref }>
                        {button_list}
                    </div>
                    <hr/>
                    <div className="menu__item-bottom">
                        {this.buttonAction()}
                        <div className="menu-bottom-description">
                            {this.state.activeData.Text}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }


    /**
     * Вывод нижней части рендер виджетов
     * @returns {string|*}
     */
    buttonAction(){
        let data = this.state.activeData;
        if(!data) return  '';
        let ret;

        let canControll = this.props.id === this.props.activeMenu;
        switch (data.Bottom) {
            case 1:
                ret = <Progress
                    min={data.Data.min}
                    max={data.Data.max}
                    step={data.Data.step}
                    value={data.Data.value}
                    controll={canControll}
                    update={this.handleChange.bind(this)}
                />
                break;
            case 2:
                ret = <Slider
                    items={data.Data.images}
                    value={data.Data.value}
                    controll={canControll}
                    update={this.handleChange.bind(this)}
                />
                break;
            case 3:
                ret = <Radio
                    value={data.Data.value}
                    items={data.Data.items} controll={canControll}
                    update={this.handleChange.bind(this)}
                />
                break;
            default:
                return '';
        }


        return (<div className="menu-bottom-widget">{ret}</div>)
    }

    /** Отслеживание переключений внутри виджетов и сохранение
     *
     * @param data
     */
    handleChange(data){
        const elem = this.props.data

        let newActiveData = this.state.activeData
        newActiveData.Data.value = data.value
        this.setState({
            activeData: newActiveData
        }, () => {
            this.props.update(elem.UUID, this.state.activeButton, this.state.activeData)
        })

    }

    /**
     * Генерация кнопок меню
     * @param item
     * @param key
     * @returns {*}
     */
    listButton(item, key){
        return (
            <div key={key}
                ref={(element) => this._nodes.set(key, element)}
                className={"menu-list__item "+(this.state.activeButton === key ? 'active' : '')}
                onClick={this.setActiveItem.bind(this, key)}
            >{item.Title}</div>
        )
    }

    /** Назначить активный элемент менб
     *
     * @param id
     */
    setActiveItem(id){
        this.setState({
            activeButton: id,
            activeData: this.props.data.Items[id]
        })
    }

    getNextId(){
        if(this.state.activeButton === this.props.data.Items.length - 1)
            return this.state.activeButton;
        else
            return  this.state.activeButton + 1;
    }

    getPrevId(){
        if(this.state.activeButton === 0)
            return this.state.activeButton;
        else
            return  this.state.activeButton - 1;
    }

    /** Отслеживание нажатий кнопок
     *
     * @param event
     * @returns {*}
     */
    handleKeyDown(event) {
        if(this._isMounted && this.props.id === this.props.activeMenu){
            if(event.keyCode === 38){
                let id = this.getPrevId()
                this.setActiveItem(id)
                this.scrollToMyRef(id)
                return event.preventDefault
            }
            if(event.keyCode === 40){
                let id = this.getNextId()
                this.setActiveItem(id)
                this.scrollToMyRef(id)
                return event.preventDefault
            }

        }
    }

    /** Проскролить окно до нужного элемента меню
     *
     * @param i
     */
    scrollToMyRef(i) {
        const node = this._nodes.get(i);
        const loc_list = this.activeRef.getBoundingClientRect();
        const loc_node = node.getBoundingClientRect();

        if (node) {
            let x = false;
            if(loc_node.bottom > loc_list.bottom) x = (i-4) * 48
            else if(loc_node.top < loc_list.top) x = i * 48

            if(x !== false)
                ReactDOM.findDOMNode(this.activeRef).scrollTo(0, x);
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

export default Menu;