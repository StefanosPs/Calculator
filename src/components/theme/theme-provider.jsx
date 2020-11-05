import React, { useContext, useState } from 'react';
import ThemeContext, { THEME } from './theme-context';

export function useTheme() {
	return useContext(ThemeContext);
}

export default function ThemeProvider({ children, ...props }) {
	const urlParams = new URLSearchParams(window.location.search);
	const temp = urlParams.get('theme').toLocaleLowerCase();
	const defaultTheme = temp === 'dark' || temp === 'light' ? THEME[temp] : THEME.light;

	const values = useProviderTheme(defaultTheme);
	return <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>;
}

function useProviderTheme(defaultTheme) {
	const [currentTheme, setCurrentTheme] = useState(defaultTheme);

	const toggleTheme = () => {
		setCurrentTheme(prev => (prev === THEME.dark ? THEME.light : THEME.dark));
	};

	return {
		currentTheme,
		toggleTheme
	};
}
