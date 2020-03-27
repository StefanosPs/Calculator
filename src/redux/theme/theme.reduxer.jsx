import { ThemesActionTypes } from "./theme.types";
// import { THEMES } from "../../data/theme";

const THEMES = process.env.REACT_APP_BOOTSTRAP_THEMES;
const INITIAL_THEME = {
  currentTheme: THEMES.dark 
};

const themeReducer = (state = INITIAL_THEME, action) => { 
  switch (action.type) {
    case ThemesActionTypes.TOOGLE_THEME:
      switch (action.payload) {
        case "dark":
          return { currentTheme: THEMES.dark };
        case "light":
          return { currentTheme:  THEMES.light };
        default:
          return INITIAL_THEME;

      }
    default:
      return state;
  }
};

export default themeReducer;
