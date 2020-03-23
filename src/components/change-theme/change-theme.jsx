import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { toggleTheme } from "../../redux/theme/theme.actions";
import { selectCurrentTheme } from "../../redux/theme/theme.selector";

import ButtonSwitch from "../utilities/button/button-switch/button-switch";

function ChangeTheme({ currentTheme, toggleTheme }) {
  return (
    <ButtonSwitch
      floatPosition="right"
      onClick={() => {
        let nextTheme = currentTheme.color === "light" ? "dark" : "light";
        toggleTheme(nextTheme);
      }}
    >
      Change Theme
    </ButtonSwitch>
  );
}

const mapStatetoProps = createStructuredSelector({
  currentTheme: selectCurrentTheme
});
const mapDispatchToProps = dispatch => ({
  toggleTheme: theme => dispatch(toggleTheme(theme))
});

export default connect(mapStatetoProps, mapDispatchToProps)(ChangeTheme);
