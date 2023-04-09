# Frontend Mentor - Calculator app solution

This is my solution to the [Calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/calculator-app-9lteq5N29).

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)


## Overview

### The challenge

Users should be able to:

- See the size of the elements adjust based on their device's screen size
- Perform mathmatical operations like addition, subtraction, multiplication, and division
- Adjust the color theme based on their preference

### Screenshot

![mobile-default theme](./screenshots/calculator%20app%20challenge-mobile-default%20theme.png)
![mobile-light theme](./screenshots/calculator%20app%20challenge-mobile-light%20theme.png)
![mobile-dark theme](./screenshots/calculator%20app%20challenge-mobile-dark%20theme.png)

![large screen-default theme](./screenshots/calculator%20app%20challenge-large%20screen-default%20theme.png)
![large screen-light theme](./screenshots/calculator%20app%20challenge-large%20screen-light%20theme.png)
![large screen-dark theme](./screenshots/calculator%20app%20challenge-large%20screen-dark%20theme.png)


### Links

- Solution URL: [GitHub pages](https://marija-rajak.github.io/calculatorApp/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- CSS Grid
- SASS
- JavaScript


### What I learned

- Changing themes by adding/removing classes and using variables

```css
#display {
	background-color: var(--screen-background);
	color: var(--light-text);

	&.theme-dark,
	&.theme-light {
		color: var(--dark-text);
	}
}
```
```js
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
	...
}
```
- Using media query with JS

```js
mediaQuery.addEventListener('change', function () {
	if (mediaQuery.matches) {
		wideScreen = true;
	} else {
		wideScreen = false;
	}
});
```

### Continued development

Dealing with large numbers-exponential notation

### Useful resources

- [W3 schools-isFinite method](https://www.w3schools.com/jsref/jsref_isfinite.asp#:~:text=isFinite()%20returns%20true%20if,a%20number%20before%20testing%20it.) and [Stack overflow](https://stackoverflow.com/questions/4724555/how-do-i-check-if-a-number-evaluates-to-infinity) - This helped me to find out the way to deal with dividing by 0-to test if result is NaN, or Infinity
- [CSS Tricks-Working with JavaScript Media Queries](https://css-tricks.com/working-with-javascript-media-queries/) - very simple and clear explanation of using media queries with JS-metchMedia() method, .matches property of MediaQueryList and binding to an event to provide responsivity.


## Author


- Frontend Mentor - [@marija-rajak](https://www.frontendmentor.io/profile/marija-rajak)
