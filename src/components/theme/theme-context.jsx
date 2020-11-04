import {createContext} from 'react';

export const THEME =  { 
    dark:  { color: "dark", text: "text-white" }, 
    light: { color: "light", text: "text-dark" } 
};

const ThemeContext = createContext();

export default ThemeContext;