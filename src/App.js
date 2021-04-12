import React from 'react';
import { Box } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Todos from './pages/Todos';
import AuthRoute from './shared/components/AuthRoute';

function App() {
  return (
    <Box>
      <Router>
        <Switch>
          <Route exact path="/auth">
            <AuthRoute>
              <Login />
            </AuthRoute>
          </Route>
          <Route path="/" exact>
            <AuthRoute>
              <Todos />
            </AuthRoute>
          </Route>
        </Switch>
      </Router>
    </Box>
  );
}

export default App;
