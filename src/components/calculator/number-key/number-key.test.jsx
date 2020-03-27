import React from 'react';
import renderer from 'react-test-renderer';

import {
    numbersKeysArray
  } from "../../../classes/calculator/calculatorClass";

import NumberKey from './number-key';

it('renders NumberKey when there are no props', () => {
  const tree = renderer.create(<NumberKey />).toJSON();
  expect(tree).toMatchSnapshot(); 
});

it('renders NumberKey when there are props', () => {
    const numberKeyFull = renderer.create(<NumberKey numbersKeysArray={numbersKeysArray} />).toJSON();
    expect(numberKeyFull).toMatchSnapshot();
});