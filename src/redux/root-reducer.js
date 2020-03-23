import { combineReducers } from 'redux';

import themeReducer from  './theme/theme.reduxer';


export default combineReducers({
    theme: themeReducer 
});