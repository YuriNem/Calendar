import React from 'react';

import './style.scss';

export default class DateRange extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			date: props.date,
			updateTime: new Date(),
		}
	}

	onChange = event => {
		const newDate = new Date(event.target.value);
		const { date } = this.state;

		if (+newDate !== +date) {
			this.setState({
				date: newDate,
				updateTime: new Date(),
			});
		}
	}

	onFocus = event => (event.target.style.backgroundColor = '#ffdb4d');

	onBlur = event => (event.target.style.backgroundColor = '#fff');

	createPeriod(date) {
		const yearDate = new Date(date);
		yearDate.setFullYear(yearDate.getFullYear() + 1);

		return {
			start: date,
			end: yearDate,
		};
	}

	createItem(date) {
		const dayHours = {
			'2': 24,
			'3': 48,
			'4': 72,
			'5': 96,
			'6': 120,
			'0': 144,
		};

		const day = date.getDay();
		const date1 = new Date(date);
		const date2 = new Date(date);
		if (day === 1) {
			return `${
				date1
				.toLocaleDateString()
			} - ${
				new Date(date2
				.setHours(144))
				.toLocaleDateString()
			}`;
		}
		return `${
			new Date(date1
			.setHours(-dayHours[day]))
			.toLocaleDateString()
		} - ${
			new Date(date2
			.setHours(144 - dayHours[day]))
			.toLocaleDateString()
		}`;
	}

	createItems(period) {
		const periods = [];
		for (let i = +period.start; i < +period.end; i += 3600000 * 168) {
			periods.push(this.createItem(new Date(i)));
		}

		return periods.slice().sort();
	}

	renderItems(items) {
		return (
			<div className="date-range__list">
				{items.map((value, index) => <div
					className="date-range__item"
					key={index}
				>{value}</div>)}
			</div>
		);
	}

	render() {
		const { date, updateTime } = this.state;
		const updateDate = updateTime.getDate();
		const updateMonth = updateTime.getMonth();

		return (
			<div className="date-range">
				<input
					className="date-range__input"
					type="date"
					onChange={this.onChange}
					onFocus={this.onFocus}
					onBlur={this.onBlur}
				/>
				<div className="date-range__text">
					{`Последнее изменение: ${updateDate}.${
						updateMonth < 10 ?
						`0${updateMonth}`
						:
						updateMonth
					}`}
				</div>
				{this.renderItems(this.createItems(this.createPeriod(date)))}
			</div>
		);
	}
}
