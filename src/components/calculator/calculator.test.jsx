import React from 'react';
import renderer from 'react-test-renderer';
import Calculator from './calculator';
import  {ThemeProvider} from '../theme/index'

it('renders  Calculator', () => {
    const numberKeyFull = renderer.create(<ThemeProvider><Calculator /></ThemeProvider>).toJSON();
    expect(numberKeyFull).toMatchSnapshot();
});