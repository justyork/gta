import React from 'react'
import Notify from './Notify';
import Keys from './Keys';

class Test extends React.Component {
	constructor(props) {
		super(props);
		// Состояние хранит runtime переменные компонента
		this.state = {
			// при изменении show или text будет произведен re-render компонента
			show: true,
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
			]
			//class_name: "animated bounceOut"
		}
	}

	handleClick() {
		// React не позволяет напрямую изменять state, используем специальную функцию
		this.setState({
			show: !this.state.show,
			//class_name: this.class_name = "animated bounceOut"
		})
	}

	render() {
		return(
			<React.Fragment>
				<div id="header">
					{/* Мы просто подключаем компонент уведомления и передаем ему наши состояния */}
					<Notify
						show={this.state.show}
						text={this.state.text}
					/>
					<input id="button" type="button" value="Кликни" onClick={this.handleClick.bind(this)} />
					<Keys
						show={this.state.show}
						keys={this.state.keys}
					/>

				</div>

			</React.Fragment>
		)
	}
}
export default Test