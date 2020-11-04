import React from 'react';
import renderer from 'react-test-renderer'; 
import ChangeTheme from './change-theme';
import  ThemeProvider from '../theme-provider'

it('renders  ChangeTheme', () => {
    const changeTheme = renderer.create(<ThemeProvider><ChangeTheme /></ThemeProvider>).toJSON();
    expect(changeTheme).toMatchSnapshot();
});