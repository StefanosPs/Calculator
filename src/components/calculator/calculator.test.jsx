import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from "react-redux";
import store from  '../../redux/store';
import Calculator from './calculator';
 

it('renders  Calculator', () => {
    const numberKeyFull = renderer.create(<Provider store={store}><Calculator /></Provider>).toJSON();
    expect(numberKeyFull).toMatchSnapshot();
});