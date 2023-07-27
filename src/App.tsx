import React from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ProductsPage from "./pages/ProductsPage"
import UsersPage from "./pages/UsersPage";
import CreateUserPage from "./pages/CreateUserPage";
import UserPage from "./pages/UserPage";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { ColorModeContext } from "./context"
import { setupTheme } from "./setupTheme";

function App() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      setupTheme(mode),
    [mode],
  );
  console.log(theme)
  return (
    <ColorModeContext.Provider value={{ colorMode, setMode }}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/user/:id" element={<UserPage />} />
            <Route path="/create" element={<CreateUserPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
