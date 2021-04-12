import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const AuthRoute = ({ children }) => {
  const { loggedIn } = useSelector(state => state.auth);
  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      history.replace('/');
    } else {
      history.push('/auth');
    }
  }, [loggedIn, history.location.pathname]);

  return children;
};

export default AuthRoute;
