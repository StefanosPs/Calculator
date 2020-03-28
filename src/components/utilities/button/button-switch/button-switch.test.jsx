import React from 'react';
import renderer from 'react-test-renderer';

import ButtonSwitch from './button-switch';
 

it('renders  ButtonSwitch', () => {
    const buttonSwitch = renderer.create(<ButtonSwitch />).toJSON();
    expect(buttonSwitch).toMatchSnapshot();
});