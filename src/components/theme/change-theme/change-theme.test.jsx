import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from "react-redux";
import store from  '../../redux/store';
import ChangeTheme from './change-theme';
 

it('renders  ChangeTheme', () => {
    const changeTheme = renderer.create(<Provider store={store}><ChangeTheme /></Provider>).toJSON();
    expect(changeTheme).toMatchSnapshot();
});