interface mathOperationInt {
	icon: string,
	title: string,
	mathExp: string,
	mathExpStr: string,
	desc: string,
	keyDown: string[],
	variant: string
}
interface mathFunctionInt {
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
		icon: "",
		title: "/",
		mathExp: "/",
		mathExpStr: "/",
		keyDown: ["/"],
		desc: "Divide",
		variant: `outline-{theme.color}`
	},
	undo: {
		icon: "",
		title: "\u21B6",
		desc: "Undo",
		keyDown: ["Backspace"],
		variant: `outline-{theme.color}`,
		onClick: 'undo'
	},
	clearDisplay: {
		icon: "",
		title: "C",
		desc: "Clear Display",
		keyDown: ["Delete"],
		variant: `outline-{theme.color}`,
		onClick: 'reset'
	},
	multiplication: {
		icon: "",
		title: "X",
		mathExp: "*",
		mathExpStr: "*",
		keyDown: ["*"],
		desc: "Μultiplication",
		variant: `outline-{theme.color}`
	},
	openParenthesis: {
		icon: "",
		title: "(",
		mathExp: "(",
		mathExpStr: "(",
		keyDown: ["("],
		desc: "Open Parenthesis",
		variant: `outline-{theme.color}`
	},
	closeParenthesis: {
		icon: "",
		title: ")",
		mathExp: ")",
		mathExpStr: ")",
		keyDown: [")"],
		desc: "Close Parenthesis",
		variant: `outline-{theme.color}`
	},
	minus: {
		icon: "",
		title: "-",
		mathExp: "-",
		mathExpStr: "-",
		keyDown: ["-"],
		desc: "Minus,",
		variant: `outline-{theme.color}`
	},
	squared: {
		icon: "",
		title: "x\u00B2",
		mathExp: "**2",
		mathExpStr: "²",
		desc: "Squared",
		keyDown: [""],
		variant: `outline-{theme.color}`
	},
	squareRoot: {
		icon: "",
		title: "\u221Ax",
		mathExp: "Math.sqrt",
		mathExpStr: "\u221A",
		desc: "Square Root",
		keyDown: [""],
		variant: `outline-{theme.color}`
	},
	plus: {
		icon: "",
		title: "\u002B",
		mathExp: "+",
		mathExpStr: "+",
		keyDown: ["+"],
		desc: "Add",
		variant: `outline-{theme.color}`
	},
	result: {
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

	constructor() {
		this.history = [];
		this.mathExp = [];
	}

	/**
	 * getAlgebraicExpression
	 */
	public getAlgebraicExpression() {
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
	 * pushPathExp
	 */
	public pushItem(item: string) {
		//TODO Add validation with push
		let addItem = false;
		let appendItem = false; 

		let isItemNumFlag : boolean = false;
		let isMathOperation  : boolean = false;

	

		if( mathOperationObj[item] ) {

			isMathOperation = true;
		}else{
			isItemNumFlag = true; 			
		}

		

		if(this.mathExp.length === 0){
			//the first cal can be square, open parenthesis number
			if( isItemNumFlag ){
				addItem = true;
			}else if( item === "squareRoot" || item === "openParenthesis" || item === "minus"  ){
				addItem = true;
			}else{
				throw new Error(`The first char can be Number or Square Root or Open Parenthesis `); 
			}
		}else{
			let lastItem = this.mathExp[ ( this.mathExp.length - 1 ) ];

			let isLastItemNumFlag : boolean = false;
			let isLastMathOperation  : boolean = false; 
			if( mathOperationObj[lastItem] ) {

				isLastMathOperation = true;
			}else{
				isLastItemNumFlag = true; 			
			}

			if(isItemNumFlag && isLastItemNumFlag ){
				//number before number 
				if(item === "." ){ 
					if(lastItem.indexOf(".")===-1){
						appendItem = true;
					}else{
						throw new Error(`'.' already exists`);
					} 
				}else{
					appendItem = true;
				}
			}else if( isMathOperation && isLastItemNumFlag ){
				//number before Operation
				if(
					 item === "plus" || 
					 item === "squared" ||
					 item === "minus" ||
					 item === "closeParenthesis" ||
					 item === "multiplication" ||
					 item === "divide" 
					   ){
					//TODO Add close parenthesis to an else if with check
					addItem = true;
				}else{
					throw new Error(`Can not add operation ${ mathOperationObj[item]['title']}`);
				}
				     
			}else if( isMathOperation && isLastMathOperation ){
				//Operation before Operation
				if(item ==='openParenthesis'){
					addItem = true;
				}

			}else if(isItemNumFlag  && isLastMathOperation ){
				//Operation before number
				addItem = true;
			} 
		}
		

		if(addItem){
			this.updateHistory();
			this.mathExp.push(item);
			return true;
		}else if(appendItem){
			this.updateHistory();
			this.mathExp[ ( this.mathExp.length - 1 ) ] += item; 
			return true;
		}else{
			if(mathOperationObj[item]){
				throw new Error(`Failed to Push '${mathOperationObj[item]['title']}'`);
			}else{
				throw new Error(`Failed to Push ${item}`);
			}

		}
	}

	public reset() {
		this.updateHistory();
		this.mathExp = [];
	}

	public undo() {
		if (this.history.length > 0) {
			this.mathExp = this.history.pop()!;
		}else if(this.history.length === 0){
			this.mathExp = [];
		}
	}

	public calculate() {


		let mathFn = '';
		this.mathExp.forEach(element => {
			if (mathOperationObj[element]) {
				let tmp = mathOperationObj[element] as mathOperationInt;
				if (tmp['mathExp'] === 'Math.sqrt') {

				} else {
					mathFn += tmp['mathExp'];
				}
			} else {
				mathFn += element;
			}
		});

		let result = 0;
		try { 
			result = eval(mathFn);
			this.updateHistory();
			this.mathExp = [result.toString()];
		} catch (error) {
			console.error(error);
			return '0';
		}
		if(Infinity === result){
			throw new Error("Too large number");
		}else{
			return result.toString();
		}

		// return '0';

	}
	/**
	 * updateHistory
	 */
	private updateHistory() {
		if (this.mathExp.length > 0) {
			this.history.push([...this.mathExp]);
		}
	}
}


export const calculator = new Calculator(); 