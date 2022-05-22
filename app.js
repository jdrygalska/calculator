const numbers = document.querySelectorAll('.number')
const operator = document.querySelectorAll('.operator')
const clear = document.querySelector('.clear')
const del = document.querySelector('.del')
const equal = document.querySelector('.equal')
const lastResult = document.querySelector('.last-result')
const currentResult = document.querySelector('.current-result')

let actualResult = ''
let previousResult = ''
let operate = undefined

const calculate = () => {
	let action
	if (!previousResult || !actualResult) {
		return
	}
	const last = parseFloat(previousResult)
	const actual = parseFloat(actualResult)

	if (isNaN(last) || isNaN(actual)) {
		return
	}

	switch (operate) {
		case '+':
			action = last + actual
			break

		case '-':
			action = last - actual
			break

		case '*':
			action = last * actual
			break

		case '/':
			if (actual === 0) {
				clearResult()
				alert('Do not divide by 0')
				return
			}
			action = last / actual
			break

		case '√':
			action = Math.pow(last, 1 / actual)
			break

		case '%':
			action = (last / 100) * actual
			break

		case '^':
			action = Math.pow(last, actual)
			break

		case 'log':
			action = Math.log(last) / Math.log(actual)
			break

		default:
			return
	}

	actualResult = action
	operate = undefined
	previousResult = ''
}

const chooseOperate = operator => {
	if (actualResult === '') {
		return
	}
	if (previousResult !== '') {
		calculate()
	}
	operate = operator
	previousResult = actualResult
	actualResult = ''
}

const newResult = () => {
	currentResult.innerText = actualResult
	if (operate != null) {
		lastResult.innerText = previousResult + operate
	} else {
		lastResult.innerText = ''
	}
}

const plusNumber = number => {
	if (number === '•') {
		if (actualResult.includes('.')) {
			return
		}
		number = '.'
	}

	actualResult = actualResult.toString() + number.toString()
}

const delNumber = () => {
	actualResult = actualResult.toString().slice(0, -1)
}

numbers.forEach(number => {
	number.addEventListener('click', () => {
		plusNumber(number.innerText)
		newResult()
	})
})

del.addEventListener('click', () => {
	delNumber()
	newResult()
})

const clearResult = () => {
	actualResult = ''
	previousResult = ''
	operate = undefined
}

operator.forEach(operator => {
	operator.addEventListener('click', () => {
		chooseOperate(operator.innerText)
		newResult()
	})
})

equal.addEventListener('click', () => {
	calculate()
	newResult()
})

clear.addEventListener('click', () => {
	clearResult()
	newResult()
})
