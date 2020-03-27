export enum OperationType {
	mathOperation, 
	mathCallFn,
	calcCallFn 
}

interface mathOperationInt {
	type: OperationType,
	icon: string,
	title: string,
	desc: string,
	variant: string,
	keyDown: string[],
	mathExp: string,
	mathExpStr: string
}
interface mathFunctionInt {
	type: OperationType,
	icon: string,
	title: string,
	desc: string,
	variant: string,
	keyDown: string[],
	onClick: string
}

type mathOperationType = {
	[key: string]: mathOperationInt | mathFunctionInt
}

export const numbersKeysArray = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ".", ""]

export const mathOperationObj: mathOperationType = {
	divide: {
		type: OperationType.mathOperation,
		icon: "",
		title: "/",
		mathExp: "/",
		mathExpStr: "/",
		keyDown: ["/"],
		desc: "Divide",
		variant: `outline-{theme.color}`
	},
	multiplication: {
		type: OperationType.mathOperation,
		icon: "",
		title: "X",
		mathExp: "*",
		mathExpStr: "*",
		keyDown: ["*"],
		desc: "Μultiplication",
		variant: `outline-{theme.color}`
	},
	minus: {
		type: OperationType.mathOperation,
		icon: "",
		title: "-",
		mathExp: "-",
		mathExpStr: "-",
		keyDown: ["-"],
		desc: "Minus,",
		variant: `outline-{theme.color}`
	},

	plus: {
		type: OperationType.mathOperation,
		icon: "",
		title: "\u002B",
		mathExp: "+",
		mathExpStr: "+",
		keyDown: ["+"],
		desc: "Add",
		variant: `outline-{theme.color}`
	},
	openParenthesis: {
		type: OperationType.mathCallFn,
		icon: "",
		title: "(",
		mathExp: "(",
		mathExpStr: "(",
		keyDown: ["("],
		desc: "Open Parenthesis",
		variant: `outline-{theme.color}`
	},
	closeParenthesis: {
		type: OperationType.mathCallFn,
		icon: "",
		title: ")",
		mathExp: ")",
		mathExpStr: ")",
		keyDown: [")"],
		desc: "Close Parenthesis",
		variant: `outline-{theme.color}`
	},
	squared: {
		type: OperationType.mathCallFn,
		icon: "",
		title: "x\u00B2",
		mathExp: "**2",
		mathExpStr: "²",
		desc: "Squared",
		keyDown: [""],
		variant: `outline-{theme.color}`
	},
	squareRoot: {
		type: OperationType.mathCallFn,
		icon: "",
		title: "\u221Ax",
		mathExp: "Math.sqrt",
		mathExpStr: "\u221A",
		desc: "Square Root",
		keyDown: [""],
		variant: `outline-{theme.color}`
	},
	undo: {
		type: OperationType.calcCallFn,
		icon: "",
		title: "\u21B6",
		desc: "Undo",
		keyDown: ["Backspace"],
		variant: `outline-{theme.color}`,
		onClick: 'undo'
	},
	clearDisplay: {
		type: OperationType.calcCallFn,
		icon: "",
		title: "C",
		desc: "Clear Display",
		keyDown: ["Delete"],
		variant: `outline-{theme.color}`,
		onClick: 'reset'
	},
	result: {
		type: OperationType.calcCallFn,
		icon: "",
		title: "\u003D",
		desc: "Calculate",
		variant: `primary`,
		keyDown: ["=", "Enter"],
		onClick: 'calculate'
	}
};