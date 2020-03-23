import React from "react";

import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect';
import { selectCurrentTheme } from './redux/theme/theme.selector'

import "./App.css";

import Calculator from "./components/calculator/calculator";

const App = ({currentTheme}) => {
  return <Calculator currentTheme={currentTheme}></Calculator>;
}


const mapStatetoProps = createStructuredSelector({
  currentTheme: selectCurrentTheme
})

export default connect(mapStatetoProps)(App);
