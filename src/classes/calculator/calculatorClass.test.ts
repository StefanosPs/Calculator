import React from 'react';
import { render } from '@testing-library/react';
import { calculator } from './calculatorClass.ts';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// }); 
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
        expect(calculator.pushItem("(")).toBe(true)
        expect(calculator.pushItem("-")).toBe(true)
        expect(calculator.pushItem("14")).toBe(true)
        expect(calculator.pushItem(")")).toBe(true)
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
describe('basic_add_overflow', () => {
    //TODO Change it
    test('987654321^789456 +123456789', () => {
        expect(calculator.pushItem("987654321")).toBe(true)
        expect(calculator.pushItem("squared")).toBe(true)
        expect(calculator.pushItem("789456")).toBe(true)
        expect(calculator.pushItem("plus")).toBe(true)
        expect(calculator.pushItem("123456789")).toBe(true)
        expect(() => { calculator.calculate(); }).toThrow();
        // expect(calculator.calculate()).toEqual("Infinity")
        calculator.reset();
    });
}); 
describe('basic_divide', () => {
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
describe('When Calculator throws an error', () => {
    it('Throw Error', () => {

        expect(calculator.pushItem(".")).toBe(true)
        expect(() => { calculator.pushItem("."); }).toThrow();
        calculator.reset();
    });
 
});


// console.log(calculator);