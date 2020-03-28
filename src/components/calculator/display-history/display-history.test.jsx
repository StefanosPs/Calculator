import React from 'react';
import renderer from 'react-test-renderer';
 
import DisplayHistory from "./display-history";

it('renders NumberKey when there are no props', () => {
  const tree = renderer.create(<DisplayHistory />).toJSON();
  expect(tree).toMatchSnapshot(); 
});

it('renders NumberKey when there are props', () => {
    const tree = renderer.create(<DisplayHistory calculationHistory={[]}  />).toJSON();
    expect(tree).toMatchSnapshot();
});