import { calculator } from './calculatorClass.ts';

import {
    numbersKeysArray,
    mathOperationObj,
    OperationType
  } from "./calculatorConstants.ts";

const mathOperationArray = Object.keys(mathOperationObj).filter(el => { return (mathOperationObj[el].type !== OperationType.calcCallFn) ; } );

describe('Add', () => {
    test('2+2=4', () => {
        expect(calculator.pushItem("2")).toBe(true)
        expect(calculator.pushItem("plus")).toBe(true)
        expect(calculator.pushItem("2")).toBe(true)
        expect(calculator.calculate()).toEqual("4")
        calculator.reset();
    });



    test('123456789 + 987654321 = 1111111110', () => {
        expect(calculator.pushItem("123456789")).toBe(true)
        expect(calculator.pushItem("plus")).toBe(true)
        expect(calculator.pushItem("987654321")).toBe(true)
        expect(calculator.calculate()).toEqual("1111111110")
        calculator.reset();
    });

    calculator.reset();
    test('987654321 + 0 = 987654321', () => {
        expect(calculator.pushItem("987654321")).toBe(true)
        expect(calculator.pushItem("plus")).toBe(true)
        expect(calculator.pushItem("0")).toBe(true)
        expect(calculator.calculate()).toEqual("987654321")
        calculator.reset();
    });



    test('-987 + (-14) = -1001 ', () => {
        expect(calculator.pushItem("-987")).toBe(true)
        expect(calculator.pushItem("plus")).toBe(true)
        expect(calculator.pushItem("openParenthesis")).toBe(true)
        expect(calculator.pushItem("minus")).toBe(true)
        expect(calculator.pushItem("14")).toBe(true)
        expect(calculator.pushItem("closeParenthesis")).toBe(true)
        expect(calculator.calculate()).toEqual("-1001")
        calculator.reset();
    });

    test('-0 + 0 = 0 ', () => {
        expect(calculator.pushItem("minus")).toBe(true)
        expect(calculator.pushItem("0")).toBe(true)
        expect(calculator.pushItem("plus")).toBe(true)
        expect(calculator.pushItem("0")).toBe(true)
        expect(calculator.calculate()).toEqual("0")
        calculator.reset();
    });
});

describe('Basic Replace', () => {
    test(
        'The first char can be Number or Square Root or Open Parenthesis', () => {
            expect(() => { calculator.pushItem('divide') }).toThrow(); 
            calculator.reset();
            expect(calculator.pushItem("1")).toBe(true)
            calculator.reset();
            expect(() => { calculator.pushItem('multiplication') }).toThrow(); 
            calculator.reset();
            expect(calculator.pushItem("minus")).toBe(true)
            calculator.reset();
            expect(calculator.pushItem("plus")).toBe(true)
            calculator.reset();
            expect(calculator.pushItem("openParenthesis")).toBe(true)
            calculator.reset();

            expect(() => { calculator.pushItem('closeParenthesis') }).toThrow(); 
            calculator.reset()
            expect(() => { calculator.pushItem('squared') }).toThrow(); 
            calculator.reset()
            expect(calculator.pushItem('squareRoot') ).toBe(true);
            calculator.reset()
        }
    );

    test('Number before Number', () => {
        
        expect(calculator.pushItem(".")).toBe(true)
        expect(() => { calculator.pushItem("."); }).toThrow();
        calculator.reset();
    });
    
    
    describe('Number before Operation', () => {
        for (let i = 0; i <  mathOperationArray.length; i++) {
            let operation = mathOperationArray[i];
            if(operation === "closeParenthesis" ){
                test(`.check operation (${operation})  `, () => {
            
                    expect(calculator.pushItem("1")).toBe(true)
                    expect(() => { calculator.pushItem(operation) }).toThrow();  
                    // console.log(calculator.getAlgebraicExpression());
                    calculator.reset();
            
                });
            }else{
                test(`.check operation (${operation})  `, () => {
            
                    expect(calculator.pushItem("1")).toBe(true)
                    expect(calculator.pushItem(operation)).toBe(true)
                    // console.log(calculator.getAlgebraicExpression());
                    calculator.reset();
            
                });
            }
            
        }
    });


    describe('Operation before Operation', () => {
        for (let i = 0; i <  mathOperationArray.length; i++) {
            let element00 = mathOperationArray[i];
            for (let ii = 0; ii < mathOperationArray.length; ii++) {
                let element01 = mathOperationArray[ii];
                if(element01 === "closeParenthesis" || element00 === "closeParenthesis"){
                    if(element01 === "closeParenthesis" && element00 === "closeParenthesis"){
                        test(`.check 1 ${element00} ${element01} `, () => {
                
                            expect(calculator.pushItem("1")).toBe(true)
                            expect(() => { calculator.pushItem(element00) }).toThrow();  
                            expect(() => { calculator.pushItem(element01) }).toThrow();  
                            // console.log(calculator.getAlgebraicExpression());
                            calculator.reset();
                    
                        });
                    }else if(element01 === "closeParenthesis" && element00 === "openParenthesis"){
                        test(`.check 1 ${element00} ${element01} `, () => {
                
                            expect(calculator.pushItem("1")).toBe(true)
                            expect(calculator.pushItem(element00)).toBe(true)
                            expect(calculator.pushItem(element01)).toBe(true)
                            // console.log(calculator.getAlgebraicExpression());
                            calculator.reset();
                    
                        });
                    }

                }else if(element01 === "squared" && element00 !== "closeParenthesis") {
                    test(`.check 1 ${element00} ${element01} `, () => {
                
                        expect(calculator.pushItem("1")).toBe(true)
                        expect(calculator.pushItem(element00)).toBe(true)
                        expect(() => { calculator.pushItem(element01) }).toThrow();  
                        // console.log(calculator.getAlgebraicExpression());
                        calculator.reset();
                
                    });
                }else if(element01 === "divide" && element00 === "openParenthesis") {
                }else if(element01 === "divide" && element00 === "squareRoot") {
                }else{
                    test(`.check 1 ${element00} ${element01} `, () => {
                
                        expect(calculator.pushItem("1")).toBe(true)
                        expect(calculator.pushItem(element00)).toBe(true)
                        expect(calculator.pushItem(element01)).toBe(true)
                        // console.log(calculator.getAlgebraicExpression());
                        calculator.reset();
                
                    });
                }

            }
        }
    });
    
    describe('Operation before Number', () => {
        for (let i = 0; i <  mathOperationArray.length; i++) {
            let element00 = mathOperationArray[i];
            for (let ii = 0; ii <  numbersKeysArray.length; ii++) {
                let element01 = numbersKeysArray[ii];
                if(element00 === "closeParenthesis" ){

                }else{

                    test(`.check 1 ${element00} ${element01} `, () => {
                        expect(calculator.pushItem("1")).toBe(true)
                        expect(calculator.pushItem(element00)).toBe(true)
                        expect(calculator.pushItem(element01)).toBe(true)
                        // console.log(calculator.getAlgebraicExpression());
                        calculator.reset();
                
                    }); 
                }
            }
        }
    });

    
});

describe('Basic overflow', () => { 
    test(' 987654321987654321987654321987654321987654321^2*789456789456789456789456789456789456789456789456789456^2*789456789456789456789456789456789456789456789456789456^2*987654321987654321987654321987654321987654321^2*789456789456789456789456789456789456789456789456789456^2*789456789456789456789456789456789456789456789456789456^2', () => {
        expect(calculator.pushItem("987654321987654321987654321987654321987654321")).toBe(true)
        expect(calculator.pushItem("squared")).toBe(true)
        expect(calculator.pushItem("789456789456789456789456789456789456789456789456789456")).toBe(true)
        expect(calculator.pushItem("squared")).toBe(true) 
        expect(calculator.pushItem("789456789456789456789456789456789456789456789456789456")).toBe(true)
        expect(calculator.pushItem("squared")).toBe(true)
        expect(calculator.pushItem("987654321987654321987654321987654321987654321")).toBe(true)
        expect(calculator.pushItem("squared")).toBe(true)
        expect(calculator.pushItem("789456789456789456789456789456789456789456789456789456")).toBe(true)
        expect(calculator.pushItem("squared")).toBe(true) 
        expect(calculator.pushItem("789456789456789456789456789456789456789456789456789456")).toBe(true)
        expect(calculator.pushItem("squared")).toBe(true) 
        expect(() => calculator.calculate() ).toThrow();  
        calculator.reset();
    });
});
describe('Basic divide', () => {
    describe.each([
        [3, 6, "0.5"],
        [20, 8, "2.5"],
        [1000000, 100000, "10"],
        [-8, 2, "-4"],
        [-9, -7, "1.285714286"],
        [3.256, 0.36, "9.044444444"],
        [-1, 1, "-1"],
        [0, 987, "0"],
        [15, 99, "0.151515152"],
    ])('.divide(%f, %f) = %s ', (a, b, expected) => {
        test(`returns ${expected}`, () => {
            expect(calculator.pushItem(a)).toBe(true)
            expect(calculator.pushItem("divide")).toBe(true)
            expect(calculator.pushItem(b)).toBe(true)
            expect(calculator.calculate()).toBe(expected);
            calculator.reset();
        });


    });
});
describe('Basic divide_by_zero', () => {
    test('5/0', () => {
        expect(calculator.pushItem("5")).toBe(true)
        expect(calculator.pushItem("divide")).toBe(true)
        expect(calculator.pushItem("0")).toBe(true)
        expect(() => { calculator.calculate(); }).toThrow();
        // expect(calculator.calculate()).toEqual("Infinity")
        calculator.reset();
    });

    test('0/0', () => {
        expect(calculator.pushItem("0.0")).toBe(true)
        expect(calculator.pushItem("divide")).toBe(true)
        expect(calculator.pushItem("0.0")).toBe(true)
        expect(() => { calculator.calculate(); }).toThrow();
        // expect(calculator.calculate()).toEqual("Infinity")
        calculator.reset();
    });
});
describe('Basic brackets', () => {
    test('6 / (3 * 2) ', () => {
        ["6", "divide", "openParenthesis", "3", "multiplication", "2", "closeParenthesis"].forEach(element => {
            expect(calculator.pushItem(element)).toBe(true)
        });
        expect(calculator.calculate()).toEqual("1");
        calculator.reset();
    });

    test('0 * ( 1 + 2 + 3 + 4)  ', () => {
        ["0", "multiplication", "openParenthesis", "1", "plus", "2", "plus", "3", "plus", "4", "closeParenthesis"].forEach(element => {
            expect(calculator.pushItem(element)).toBe(true)
        });
        expect(calculator.calculate()).toEqual("0");
        calculator.reset();
    });

    test('(((2 + 8) * (5 / 2)) - 3)  ', () => {
        [
            "openParenthesis", 
            "openParenthesis", 
            "openParenthesis", 
            "2", "plus", "8", 
            "closeParenthesis", 
            "multiplication", 
            "openParenthesis", "5", "divide", "2", "closeParenthesis", "closeParenthesis", 
            "minus", "3"].forEach(element => {
            expect(calculator.pushItem(element)).toBe(true)
        });
        expect(calculator.calculate()).toEqual("22");
        calculator.reset();
    });
}); 

// console.log(calculator);