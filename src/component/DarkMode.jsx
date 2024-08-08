import { IconButton } from '@mui/material';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import { createContext, useContext, useMemo, useState } from "react";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const DarkModeContext = createContext({
    mode: "light",
    toggle: () => { }
});

export function useDarkMode() {
    const context = useContext(DarkModeContext);
    if (context === undefined)
        throw new Error("useDarkMode must be used within an CustomThemeProvider");
    return context;
}

export function DarkModeProvider(props) {
    const { children } = props;
    const [mode, setMode] = useState("light");

    const theme = useMemo(() => createTheme({
        palette: { mode: mode }
    }), [mode]);

    const toggle = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    }

    return (
        <DarkModeContext.Provider value={{ mode, toggle }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </DarkModeContext.Provider>
    )
}


export function DarkModeButton(props) {
    const { text } = props;
    const darkmode = useDarkMode();

    return (
        <IconButton onClick={darkmode.toggle} color="inherit">
            {darkmode.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            {text}
        </IconButton>
    )
}