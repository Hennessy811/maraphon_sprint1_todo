import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Container, TextField, Typography } from '@material-ui/core';
import { signUp } from '../store/features/auth';

const Login = () => {
  const dispatch = useDispatch();
  // const { loggedIn } = useSelector(state => state.auth);

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  const sendingLogPass = () => {
    const data = {
      email,
      password,
      username,
    };
    dispatch(signUp(data));
    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <Box minHeight="100vh">
      <Container maxWidth="sm">
        <Typography variant="h1" component="h2" gutterBottom>
          Todo auth
        </Typography>
        <Box py={10} border={1}>
          <Box mx="auto" bgcolor="background.paper" p={1}>
            <TextField
              size="small"
              variant="outlined"
              label="username"
              fullWidth
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            &nbsp;
            <TextField size="small" variant="outlined" label="Email" value={email} fullWidth onChange={e => setEmail(e.target.value)} />
            &nbsp;
            <TextField
              size="small"
              type="password"
              variant="outlined"
              label="Password"
              value={password}
              fullWidth
              onChange={e => setPassword(e.target.value)}
            />
          </Box>
          {(password && email) === '' ? (
            <Box display="flex" justifyContent="center">
              <Button variant="outlined" disabled={true}>
                Login
              </Button>
            </Box>
          ) : (
            <Box display="flex" justifyContent="center">
              <Button variant="outlined" onClick={sendingLogPass}>
                Login
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
