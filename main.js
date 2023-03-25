const digitKeys = document.getElementsByClassName('digit');

const operatorKeys = document.getElementsByClassName('operator');

const calculationBtn = document.getElementById('calculateBtn');

let display = document.getElementById('display');

let tempNumber;
let startNumber =0;
let nextNumber;
let result;

let operator;

for (let i = 0; i < digitKeys.length; i++) {
	digitKeys[i].addEventListener('click', typeNumber);
}

for (let i = 0; i < operatorKeys.length; i++) {
	operatorKeys[i].addEventListener('click', function () {
		calculate();
		getOperator(this.value);

	});
}

calculationBtn.addEventListener('click', function () {
	calculate();
	operator = undefined;
});

function typeNumber() {
	if (!tempNumber) {
		display.innerText = this.value;
	} else {
		display.innerText += this.value;
	}

	tempNumber = parseFloat(display.innerText);
	getNumber();
}

function getOperator(value) {
	operator = value;
}

function getNumber() {
	if (!operator) {
		startNumber = tempNumber;
	} else {
		nextNumber = tempNumber;
	}
	tempNumber = undefined;
}

function calculate() {
	if ((startNumber || startNumber === 0) && operator && (nextNumber || nextNumber === 0)) {
		switch (operator) {
			case '+':
				result = startNumber + nextNumber;
				break;
			case '-':
				result = startNumber - nextNumber;
				break;
			case '*':
				result = startNumber * nextNumber;
				break;
			case '/':
				result = startNumber / nextNumber;
		}
		if (Number.isFinite(result)) {
			display.innerText = result;
			startNumber = result;

		} else {
			display.innerText = "error!";
			startNumber = undefined;
			//reset();
		}
		console.log(result);
	}
}
