import { ThemesActionTypes } from "./theme.types";
 import { THEME } from "./theme.constants";
 
const INITIAL_THEME = {
  currentTheme: THEME.dark 
};

const themeReducer = (state = INITIAL_THEME, action) => { 
  switch (action.type) {
    case ThemesActionTypes.TOOGLE_THEME:
      switch (action.payload) {
        case "dark":
          return { currentTheme: THEME.dark };
        case "light":
          return { currentTheme:  THEME.light };
        default:
          return INITIAL_THEME;

      }
    default:
      return state;
  }
};

export default themeReducer;
