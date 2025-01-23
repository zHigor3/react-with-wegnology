import React, { useState } from 'react';
import {
  Routes,
  Route,
  PrivateRoutes,
  PublicRoutes,
  Navigate
} from './router';

import Login from './pages/Login';
import LoginLayout from './layouts/LoginLayout';
import About from './pages/About';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Logout from './pages/Logout';
import FourZeroFour from './pages/FourZeroFour';

import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/global';
import light from './styles/themes/light';
import dark from './styles/themes/dark';

const App = () => {
  const [theme, setTheme] = useState(light)

  const toggleTheme = (thm: string) => {
    setTheme(thm === 'light' ? light : dark)
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          <Route element={<PrivateRoutes toggleTheme={toggleTheme} />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />
            
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Navigate to="/home" replace={true} />} />
          </Route>
          <Route element={<PublicRoutes />}>
            <Route path="/about" element={<LoginLayout toggleTheme={toggleTheme}><About /></LoginLayout>} />
            <Route path="/login" element={<LoginLayout toggleTheme={toggleTheme}><Login /></LoginLayout>} />
          </Route>
          <Route path="*" element={<FourZeroFour />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
