import React from "react"; 

import "./App.css";

import Calculator from "./components/calculator/calculator";
import  {useTheme} from './components/theme/';

const App = ({currentTheme}) => { 
  const {currentTheme: theme} = useTheme();
  return (<div className={` main bg-${theme.color} ${theme.text}`}>
    <Calculator />
    </div>);
}

export default App;
