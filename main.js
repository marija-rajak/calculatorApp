const digitKeys = document.getElementsByClassName('digit');
const operatorKeys = document.getElementsByClassName('operator');
const calculationBtn = document.getElementById('calculateBtn');
const resetBtn = document.getElementById('resetBtn');
const deleteBtn = document.getElementById('deleteBtn');
const themeSelector = document.getElementsByName('theme');
const elements = document.querySelectorAll('*');

let display = document.getElementById('display');

let tempNumber;
let startNumber;
let nextNumber;
let result;

let operator;

let theme = 'default';

for (let i = 0; i < digitKeys.length; i++) {
	digitKeys[i].addEventListener('click', typeNumber);
}

for (let i = 0; i < operatorKeys.length; i++) {
	operatorKeys[i].addEventListener('click', function () {
		calculate();
		getOperator(this.value);
		tempNumber = undefined;

	});
}

calculationBtn.addEventListener('click', function () {
	calculate();
	operator = undefined;
});

//Reset button resets expression, display and start` number
resetBtn.addEventListener('click', function () {
	resetExpression();
	startNumber = undefined;
	display.innerText = "";
});

//
deleteBtn.addEventListener('click', resetNumber);

//
themeSelector.forEach(function (selector) {
	selector.addEventListener('click', setTheme);
});

//Collects digits user inputs and converts it into number, assign value to a proper number
function typeNumber() {
	if (!tempNumber && tempNumber !== 0) {
		display.innerText = this.value;
	} else {
		display.innerText += this.value;
	}

	tempNumber = parseFloat(display.innerText);
	console.log(tempNumber);
	getNumber();
}

function getOperator(value) {
	if (startNumber || startNumber === 0) {
		operator = value;
	}
}

//Stores temp as proper number, depending on calculation progress
function getNumber() {
	if (!operator) {
		startNumber = tempNumber;
		console.log('startNumber=' + startNumber);
	} else {
		nextNumber = tempNumber;
		console.log('nextNumber=' + nextNumber);
	}
}

//Performs calculation and assign value to result, displays result
function calculate() {
	if ((startNumber || startNumber === 0) && operator && (nextNumber || nextNumber === 0)) {
		console.log(startNumber + operator + nextNumber + "=")
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
		setNextCalculation();
	}
}

//Displays result and resets expression elements
function setNextCalculation() {
	if (Number.isFinite(result)) {
		display.innerText = result;
		startNumber = result;

	} else {
		display.innerText = "error!";
		startNumber = undefined;
	}

	resetExpression();
}

//Resets numbers (temp and next), operator and result to initial value
function resetExpression() {
	nextNumber = undefined;
	result = undefined;
	tempNumber = undefined;
	operator = undefined;
}

//Resets last set number
function resetNumber() {
	if (nextNumber || nextNumber === 0) {
		nextNumber = undefined;
	} else if (startNumber || startNumber === 0){
		startNumber = undefined;
	}
	display.innerText = '';
	console.log(123);
}

//get selected theme
function setTheme() {
	themeSelector.forEach(function (radio) {
		if (radio.checked) {
			theme = radio.value;
		}
	})

	if (theme === 'light') {
		elements.forEach(function (element) {
			element.classList.add('theme-light');
			element.classList.remove('theme-dark');
		});
	} else if (theme === 'dark') {
		elements.forEach(function (element) {
			element.classList.add('theme-dark');
			element.classList.remove('theme-light');
		});
	} else {
		elements.forEach(function (element) {
			element.classList.remove('theme-dark');
			element.classList.remove('theme-light');
		});
	}
}
