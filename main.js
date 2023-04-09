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

//Indicate of calculation started
let processing = false;

//Add event listener to digit keys
//On click, button value (digit) is entered in display and read to assigned to number
for (let i = 0; i < digitKeys.length; i++) {
	digitKeys[i].addEventListener('click', typeNumber);
}

//Add event listener to operator keys
//On click, operation symbol is entered in display, and assigned to operator
//If previously all alements (start and next number and operator) are set,
//calculetion is performed, result set as new start number, and then symbol is assigned to operator
for (let i = 0; i < operatorKeys.length; i++) {
	operatorKeys[i].addEventListener('click', function () {
		calculate();
		getOperator(this.value);
	});
}

//Perform calculation, reset operator and terminate calculation process
calculationBtn.addEventListener('click', function () {
	calculate();
	operator = undefined;
	processing = false;
});

//Add event listener to reset key
//On click resets expression, display and start number
//process is terminated
resetBtn.addEventListener('click', function () {
	resetExpression();
	startNumber = undefined;
	processing = false;
	display.innerText = "";
	expand();
});

//Add event listener to del key
//On click resets last set number and removes it from the display
deleteBtn.addEventListener('click', resetNumber);

//Add event listener to theme selecting buttons
//Change theme according to user input
themeSelector.forEach(function (selector) {
	selector.addEventListener('click', setTheme);
});

//Collects digits user inputs and converts it into number, assign value to number
function typeNumber() {

	//start or add digits typed, depending on any digits already entered
	//after typing the first digit, start process
	if (!processing) {
		display.innerText = this.value;
		processing = true;
		expand();
	} else {
		if (tempNumber.toString().length < 15) {
			display.innerText += this.value;
		}
	}

	//read currently entering number-discard previous number and operator read from display
	if (operator) {
		tempNumber = display.innerText.split(operator).at(-1);
	} else {
		tempNumber = display.innerText;
	}

	//adjust display for long input-shrink and break input after the operator
	if (display.innerText.length > 15) {
		shrink();
		if (operator && !display.innerText.includes('\n') && nextNumber) {
			display.innerText = startNumber + operator + '\n' + nextNumber;
		}
	}

	//read number from the input
	getNumber();
}

//get operator from input
//start the process, if result of the previous calculation is used as the start number
//adjust display for long numbers-shrink and break input for long numbers
function getOperator(value) {

	if (startNumber || startNumber === 0) {
		processing = true;
		operator = value;

		display.innerText += operator;

		if (display.innerText.length >= 15) {
			display.innerText += "\n"
			shrink();
		}
	}
}

//Assign value from the input to according number, depending on a calculation progress
function getNumber() {
	if (!operator) {
		startNumber = parseFloat(tempNumber);
	} else {
		nextNumber = parseFloat(tempNumber);
	}
}

//Performs calculation and assign value to result, displays result in a proper way
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

		setNextCalculation();
	}
}

//Displays result depending on the length
//Sets result as a start number for next calculation
//Resets expression elements
function setNextCalculation() {

	if (isFinite(result)) {
		if (result.toString().length > 15) {
			shrink();
		} else {
			expand();
		}
		display.innerText = result;
		startNumber = result;
	} else {
		display.innerText = "error!";
		startNumber = undefined;
	}

	resetExpression();
}

//Resets calculation elements
//Next number, operator and result are set to initial value (undifined)
function resetExpression() {
	nextNumber = undefined;
	result = undefined;
	operator = undefined;
}

//Resets last set number
//Reverts display to bigger font, if deleting last number decreased numbers of digits
function resetNumber() {

	if (nextNumber || nextNumber === 0) {
		nextNumber = undefined;
		display.innerText = startNumber + operator;
	} else if (startNumber || startNumber === 0) {
		startNumber = undefined;
		operator = undefined;
		display.innerText = '';
	}

	if (display.innerText.length <= 15) {
		expand();
	}
}

//Apply selected theme
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

//Set display to smaller and lighter font
function shrink() {
	display.style.fontSize = '0.9rem';
	display.style.fontWeight = '500';
}

//Set display to bigger and bolder font
function expand() {
	display.style.fontSize = '1.2rem';
	display.style.fontWeight = '700';
}
