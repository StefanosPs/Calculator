import React from 'react';
import renderer from 'react-test-renderer';


import {
  mathOperationObj
} from "../../../classes/calculator/calculatorConstants";

import OperationKey from './operation-key';

it('renders mathOperationObj when there are no props', () => {
  const tree = renderer.create(<OperationKey />).toJSON();
  expect(tree).toMatchSnapshot(); 
});

it('renders mathOperationObj when there are props', () => {
    const numberKeyFull = renderer.create(<OperationKey mathOperationObj={mathOperationObj} />).toJSON();
    expect(numberKeyFull).toMatchSnapshot();
});