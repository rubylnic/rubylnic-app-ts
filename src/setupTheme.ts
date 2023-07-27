
import { amber, deepOrange, grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
const getDesignTokens = (mode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // palette values for light mode
                primary: amber,
                divider: amber[200],
                text: {
                    primary: grey[900],
                    secondary: grey[800],
                },
            }
            : {
                // palette values for dark mode
                primary: deepOrange,
                divider: deepOrange[700],

                text: {
                    primary: '#fff',
                    secondary: grey[500],
                },

            }),
    },
});

export const setupTheme = (mode) =>
    createTheme(getDesignTokens(mode));