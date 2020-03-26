enum OperationType {
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


class Calculator {
	private history: Array<Array<string>>;
	private mathExp: Array<string> = [];

	private expectedCloseParenthesis: number =  0 ;

	constructor() {
		this.history = [];
		this.mathExp = [];
	}

	/**
	 * getAlgebraicExpression
	 */
	public getAlgebraicExpression() : string {
		let retStr: string = "";
		this.mathExp.forEach(element => {
			if (mathOperationObj[element]) {
				let tmp = mathOperationObj[element] as mathOperationInt;
				// mathOperationObj[element] 
				retStr += tmp.mathExpStr;
			} else
				retStr += element;
		});
		
		return retStr;
	}

	/**
	 * pushItem
	 */
	public pushItem(item: string): boolean {
		//TODO Add validation with push
		let addItem = false;
		let appendItem = false;

		let isItemNumFlag: boolean = false;
		let isMathOperation: boolean = false;

		if (mathOperationObj[item]) {
			isMathOperation = true;
		} else if (numbersKeysArray.indexOf(item) !== -1 || !(isNaN(Number(item) )) ) {
			isItemNumFlag = true;
		} else {
			throw new Error(`No valid item ${item}`);
		}

		if (this.mathExp.length === 0) {
			//the first cal can be square, open parenthesis number
			if (isItemNumFlag) {
				addItem = true;
			} else if (item === "squareRoot" || item === "openParenthesis" || item === "minus" || item === "plus") {
				addItem = true;
			} else {
				throw new Error(`The first char can be Number or Square Root or Open Parenthesis `);
			}
		} else {
			let lastItem = this.mathExp[(this.mathExp.length - 1)];

			let isLastItemNumFlag: boolean = false;
			let isLastMathOperation: boolean = false;

			if (mathOperationObj[lastItem]) {
				isLastMathOperation = true;
			} else if (numbersKeysArray.indexOf(lastItem) !== -1 || !(isNaN(Number(lastItem) )) ) {
				isLastItemNumFlag = true;
			} else {
				throw new Error(`No valid item ${item}`);
			}

			if (isItemNumFlag && isLastItemNumFlag) {
				//number before number 
				if (item === ".") {
					if (lastItem.indexOf(".") === -1) {
						appendItem = true;
					} else {
						throw new Error(`'.' already exists`);
					}
				} else {
					appendItem = true;
				}
			} else if (isMathOperation && isLastItemNumFlag) {
				//number before Operation
				if (
					mathOperationObj[item].type === OperationType.mathOperation || 
					item === "squared" ||
					item === "closeParenthesis" 
				) {
					addItem = true;
				} else if (
					item === "openParenthesis" ||
					item === "squareRoot"
				) {
					this.pushItem('multiplication');
					addItem = true;
				} else {
					throw new Error(`Can not add operation ${mathOperationObj[item]['title']}`);
				}

			} else if (isMathOperation && isLastMathOperation) { 
				//Operation before Operation
				if (item === 'openParenthesis' ||
					item === "squareRoot") {
					if(lastItem === "closeParenthesis" || lastItem === "squared"){
						this.pushItem('multiplication');
					}
					addItem = true;

				} else if(
					mathOperationObj[lastItem].type === OperationType.mathOperation &&
					mathOperationObj[item].type === OperationType.mathOperation
				){
					if('multiplication' === item && item ===lastItem  ){
						// ** to ^2 
						item = 'squared';
					}
					this._updateHistory();
					this.mathExp[(this.mathExp.length - 1)] = item;
					return true;
				}else {
					addItem = true;
				}

			} else if (isItemNumFlag && isLastMathOperation) {
				//Operation before number 
				if( ['closeParenthesis' ].indexOf(lastItem)>-1){
						this.pushItem('multiplication');
						addItem = true;

				}else{
					addItem = true;
				}
			}
		}
		


		if (addItem) {
			this._updateHistory();
			this.mathExp.push(item);
			
		} else if (appendItem) {
			this._updateHistory();
			this.mathExp[(this.mathExp.length - 1)] += item; 
		} else {
			if (mathOperationObj[item]) {
				throw new Error(`Failed to Push '${mathOperationObj[item]['title']}'`);
			} else {
				throw new Error(`Failed to Push ${item}`);
			}

		}
		if(	item === "squareRoot" ){
			this.pushItem('openParenthesis');
		} 
		
		if(item === "openParenthesis"){
			this.expectedCloseParenthesis++;
		}else if(item === "closeParenthesis"){
			this.expectedCloseParenthesis--;
		}

		return true;
	}

	public reset() : void{
		this._updateHistory();
		this.mathExp = [];
	}

	public undo() : void {
		if (this.history.length > 0) {
			this.mathExp = this.history.pop()!;
		} else if (this.history.length === 0) {
			this.mathExp = [];
		}
	}

	public calculate() : string {

		for (let index = 0; index < this.expectedCloseParenthesis; index++) {
			// retStr += `<span style="opacity: .9">)</span>`;
			this.pushItem('closeParenthesis');
		} 
		let mathFn = '';
		for (let index = 0; index < this.mathExp.length; index++) {
			const element = this.mathExp[index];
			if (mathOperationObj[element]) {
				let tmp = mathOperationObj[element] as mathOperationInt;
				mathFn += tmp['mathExp'];
			} else {
				mathFn += element;
			}
		}
		
		let result = 0;
		try {
			result = eval(mathFn);
			this._updateHistory();
			this.mathExp = [result.toString()];
		} catch (error) {
			console.log(`mathFn ${mathFn} `)
			console.error(error);
			return '0';
		}

		return this._getNum(result);

		// return '0';

	}

	private _getNum(num: number) : string{
		if (num === Infinity) {
			throw new Error("Too large number");
		}else if(isNaN(num)){
			throw new Error("Fail to exec function");
		}

		num = Number(Math.round(Number(num + 'e9')) + 'e-9');
		return num.toString();
	}
	/**
	 * updateHistory
	 */
	private _updateHistory() {
		if (this.mathExp.length > 0) {
			this.history.push([...this.mathExp]);
		}
	}
}


export const calculator = new Calculator(); 