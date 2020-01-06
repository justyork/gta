import React from 'react'
import Notify from './Notify';
import Keys from './Keys';
import Keybut from './Keybut';
import Menu from './menu/Menu';

class Test extends React.Component {
	_isMounted = false;
	constructor(props) {
		super(props);
		// Состояние хранит runtime переменные компонента
		this.state = {
			// при изменении show или text будет произведен re-render компонента
			show: false,
			// text: "Вы действительно хотите погасить досрочный кредит в размере $ 50.000 ?",
			keys: [
				{text: 'Удалить текст', key: "SPACE"},
				{text: 'Удалить текст', key: "ALT"},
				{text: 'Удалить текст', key: ["L_ARROW", "R_ARROW"]},
				{text: 'Удалить текст', key: ["U_ARROW", "D_ARROW"]},
				{text: 'Удалить текст', key: "TAB"},
				{text: 'Удалить текст', key: "ENTER"},
				{text: 'Удалить текст', key: "DEL"},
				{text: 'Удалить текст', key: "BACKSPACE"},
			],
			activeMenu: 0,
			//class_name: "animated bounceOut"
		}
		this.menu = {
			Items: [this.menuState('Большой заголовок меню на 2 строки', 0), this.menuState('Заголовок меню', 1)],
			show: true,
		};
	}

	handleClick() {
		// React не позволяет напрямую изменять state, используем специальную функцию
		this.setState({
			show: !this.state.show,
			//class_name: this.class_name = "animated bounceOut"
		})
	}

	render() {

		let menu = this.menu.Items.map((val, index) => <Menu update={this.onUpdate.bind(this)} activeMenu={this.state.activeMenu} key={index} id={index} data={val} />)
		return(
			<React.Fragment>
				{/*<div id="header">*/}
				{/*	/!* Мы просто подключаем компонент уведомления и передаем ему наши состояния *!/*/}
				{/*	<Notify*/}
				{/*		show={this.state.show}*/}
				{/*		text={this.state.text}*/}
				{/*	/>*/}
				{/*	<input id="button" type="button" value="Кликни" onClick={this.handleClick.bind(this)} />*/}
				{/*	<Keys*/}
				{/*		show={this.state.show}*/}
				{/*		keys={this.state.keys}*/}
				{/*	/>*/}
				{/*</div>*/}
				<div className="menu" >{menu}</div>
			</React.Fragment>
		)
	}

	/** полученние данных из меню
	 *
	 * @param uuid
	 * @param category
	 * @param data
	 */
	onUpdate(uuid, category, data){
		console.log('UUID: ' + uuid,
			'Category: ' + category,
			data )
	}

	/**
	 * 1 - прогрессбар
	 * 2 - слайдер
	 * 3 - переключатель
	 */
	menuState(title, side){

		return {
			UUID: '123',
			Title: title,
			Position: side, // 0 - left side
			Active: 1, // активный элемент
			Items: [
				{
					Title: "Заголовок категории",
					Text: "Описание прогресбара",
					Bottom: 1, // 1 - прогрессбар
					Data: {
						value: 5,
						min: 0,
						max: 10,
						step: 1,
					}
				},
				{
					Title: "Заголовок категории 2",
					Text: "Описание слайдера",
					Bottom: 2, // 2 - слайдер
					Data: {
						value: 1,
						images: ["/images/1.jpg", "/images/2.jpg", "/images/3.jpg", "/images/2.jpg", ]
					}
				},
				{
					Title: "Заголовок категории 3",
					Text: "Описание переключателя",
					Bottom: 3, // 3 - radio button
					Data: {
						value: false,
						items: ['Вкл', 'Выкл']
					}
				},
				{Title: "Заголовок категории 4",Text: "В разработке",},
				{Title: "Заголовок категории 5",Text: "В разработке",},
				{Title: "Заголовок категории 6",Text: "В разработке",},
				{Title: "Заголовок категории 6",Text: "В разработке",},
				{Title: "Заголовок категории 6",Text: "В разработке",},
				{Title: "Заголовок категории 6",Text: "В разработке",},
				{Title: "Заголовок категории 6",Text: "В разработке",},
				{Title: "Заголовок категории 6",Text: "В разработке",},
				{Title: "Заголовок категории 6",Text: "В разработке",},
				{Title: "Заголовок категории 6",Text: "В разработке",},
				{Title: "Заголовок категории 6",Text: "В разработке",},
				{Title: "Заголовок категории 6",Text: "В разработке",},
				{Title: "Заголовок категории 6",Text: "В разработке",},
				{Title: "Заголовок категории 6",Text: "В разработке",},
				{Title: "Заголовок категории 6",Text: "В разработке",},
				{Title: "Заголовок категории 6",Text: "В разработке",},
				{Title: "Заголовок категории 6",Text: "В разработке",},
				{Title: "Заголовок категории 6",Text: "В разработке",},
				{Title: "Заголовок категории 6",Text: "В разработке",},
				{Title: "Заголовок категории 6",Text: "В разработке",},
				{Title: "Заголовок категории 6",Text: "В разработке",},
				{Title: "Заголовок категории 6",Text: "В разработке",},
			]
		};
	}

	handleKeyDown(event) {
		if(this._isMounted && this.props.id === this.props.activeMenu){
			 if(event.keyCode === 9){
			 	this.setState({
					activeMenu: this.state.activeMenu === 0 ? 1 : 0
				})

				 return event.preventDefault();
			 }

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
export default Test