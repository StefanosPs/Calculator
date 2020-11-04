
import React, { useContext, useState } from 'react';  
import ThemeContext, {THEME} from './theme-context';

export function useTheme() {
    return  useContext(ThemeContext);
}

export default function ThemeProvider({children}) {
  const values = useProviderTheme();
  return <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>;
}

function useProviderTheme() {
    const [currentTheme, setCurrentTheme] = useState(THEME.dark);

    const toggleTheme = () =>{
        setCurrentTheme((prev) => 
            prev===THEME.dark?
            THEME.light:
            THEME.dark
        )
    }

    return {
        currentTheme,
        toggleTheme
    }
}