import React from "react"; 

import "./App.css";

import Calculator from "./components/calculator/calculator";
import  {ThemeProvider} from './components/theme/'

const App = ({children}) => { 
  return (<ThemeProvider>
    <Calculator />
    </ThemeProvider>);
}

export default App;
