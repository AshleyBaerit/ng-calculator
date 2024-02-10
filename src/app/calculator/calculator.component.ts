import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-calculator',
	templateUrl: './calculator.component.html',
	styleUrl: './calculator.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculatorComponent implements OnInit {

	private _numbers: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
	private _digits: string[] = ['/', 'X', '+', '-'];
	private _first: string = '';
	private _second: string = '';
	private _sign: string = '';
	private _answer: boolean = false;
	public outValue: string = '0';

	ngOnInit(): void {
		// this._logicJavaScript();
	}

	public clearAll(): void {
		this._first = '';
		this._second = '';
		this._sign = '';
		this._answer = false;
		this.outValue = '';
	}

	public clickButtons(event: MouseEvent): void {
		const target = event.target as HTMLElement;
		if (!target.classList.contains('btn')) return;
		if (target.classList.contains('ac')) return;
		this.outValue = '';
		const key = target.textContent;

		if (key === null) return;

		if (this._numbers.includes(key)) {
			if (this._second === '' && this._sign === '') {
				this._first = this._first + key;
				this.outValue = this._first;
			}
			else if (this._first !== '' && this._second !== '' && this._answer) {
				this._second = key;
				this._answer = false;
				this.outValue = this._second;
			}
			else {
				this._second = this._second + key
				this.outValue = this._second;
			}
			console.log(this._first, this._second, this._sign);
			return;
		}
		if (this._digits.includes(key)) {
			this._sign = key;
			this.outValue = this._sign;
			console.log(this._first, this._second, this._sign);
			return;
		}
		if (key === '=') {
			if (this._second === '') this._second = this._first
			switch (this._sign) {
				case '+':
					this._first = String(+this._first + +this._second);
					break;
				case '-':
					this._first = String(+this._first - +this._second);
					break;
				case 'X':
					this._first = String(+this._first * +this._second);
					break;
				case '/':
					this._first = String(+this._first / +this._second);
					break;
			}
			this._answer = true
			this.outValue = this._first;
			console.log(this._first, this._second, this._sign);
		}
	}

	private _logicJavaScript(): void {
		const out = document.querySelector<HTMLElement>('.screen p');
		const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
		const digit = ['/', 'X', '+', '-'];
		const ac = document.querySelector<HTMLElement>('.ac');
		const buttons = document.querySelector<HTMLElement>('.buttons');

		if (buttons === null) return;
		if (ac === null) return;
		if (out === null) return;

		let first = '';
		let second = '';
		let sign = '';
		let ansver = false;

		function clearAll() {
			if (out === null) return;

			first = '';
			second = '';
			sign = '';
			ansver = false;
			out.textContent = String(0);
		}

		ac.onclick = clearAll;

		buttons.onclick = (event) => {
			const target = event.target as HTMLElement;
			if (!target.classList.contains('btn')) return;
			if (target.classList.contains('ac')) return;
			out.textContent = '';
			const key = target.textContent;

			if (key === null) return;

			if (numbers.includes(key)) {
				if (second === '' && sign === '') {
					first = first + key;
					out.textContent = first;
				}
				else if (first !== '' && second !== '' && ansver) {
					second = key;
					ansver = false;
					out.textContent = second;
				}
				else {
					second = second + key
					out.textContent = second;
				}
				console.log(first, second, sign);
				return;
			}
			if (digit.includes(key)) {
				sign = key;
				out.textContent = sign;
				console.log(first, second, sign);
				return;
			}
			if (key === '=') {
				if (second === '') second = first
				switch (sign) {
					case '+':
						first = String(+first + +second);
						break;
					case '-':
						first = String(+first - +second);
						break;
					case 'X':
						first = String(+first * +second);
						break;
					case '/':
						first = String(+first / +second);
						break;
				}
				ansver = true
				out.textContent = first;
				console.log(first, second, sign);
			}


		}
	}

}
