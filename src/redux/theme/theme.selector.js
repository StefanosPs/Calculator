import {createSelector} from 'reselect';

const selectTheme = state => state.theme;

export const selectCurrentTheme = createSelector(
    [selectTheme],
    (theme) => theme.currentTheme
)