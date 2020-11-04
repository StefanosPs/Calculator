import React from "react";
import {useTheme} from "../theme-provider"
import ButtonSwitch from "../../utilities/button/button-switch/button-switch";

function ChangeTheme() {
  const {toggleTheme} = useTheme();

  return (
    <ButtonSwitch
      floatPosition="right"
      onClick={toggleTheme}
    >
      Change Theme
    </ButtonSwitch>
  );
}


export default ChangeTheme;
