import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { useState, useCallback } from "react";

import "./App.css";
import MainWrapper from "./mainWrapper/pages/MainWrapper";
import LogInPage from "./sections/authenticationSection/pages/LogInPage";
import SignUpPage from "./sections/authenticationSection/pages/SignUpPage";
import DashboardPage from "./sections/dashboardSection/pages/DashboardPage";
import AccountPage from "./sections/accountSection/pages/AccountPage";
import ProjectPage from "./sections/projectSection/pages/ProjectPage";
import NotificationPage from "./sections/notificationSection/pages/NotificationPage";
import NotFound from "./shared/pages/NotFound";
import { AuthContext } from "./contexts/AuthContext";

const theme = createTheme({
  palette: {
    primary: {
      light: '#800000',
      main: '#800000',
      dark: '#800000',
      contrastText: '#FFFFFF',
    },
    secondary: {
      light: '#F7CC00',
      main: '#F7CC00',
      dark: '#F7CC00',
      contrastText: '#000000',
    },
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

function App() {
  const [user, setUser] = useState(null);

  const login = useCallback(
    (user) => {
      setUser(user);
    }, []);

  const logout = useCallback(
    () => {
      setUser(null);
    }, []);

  console.log(user);
  return (
    <AuthContext.Provider value = {{user: user, login: login, logout: logout}}>
      <ThemeProvider theme={theme}>
        {!user && (
          <Router>
            <Switch>
              <Route exact path="/">
                <LogInPage setUser={setUser} />
              </Route>
              <Route exact path="/signup">
                <SignUpPage setUser={setUser} />
              </Route>
              <Route exact path="*">
                <NotFound />
              </Route>
            </Switch>
          </Router>
        )}
        {user && (
          <Router>
            <MainWrapper user={user} setUser={setUser}>
              <Switch>
                <Route exact path="/">
                  <DashboardPage user={user} />
                </Route>
                <Route exact path="/dashboard">
                  <DashboardPage user={user} />
                </Route>
                <Route exact path="/accounts">
                  <AccountPage />
                </Route>
                <Route exact path="/accounts/:id"></Route>
                <Route exact path="/projects">
                  <ProjectPage user={user} />
                </Route>
                <Route exact path="/projects/:id"></Route>
                <Route exact path="/notifications">
                  <NotificationPage user={user} />
                </Route>
                <Route exact path="/notifications/:id"></Route>
                <Route exact path="*">
                  <NotFound />
                </Route>
              </Switch>
            </MainWrapper>
          </Router>
        )}
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;
