import React from 'react';
import { Box, Button, Grid, Container, Divider, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './store/features/counter';

function App() {
  const dispatch = useDispatch();
  const state = useSelector(state => state.counter);

  console.log(state);

  return (
    <Box minHeight="100vh">
      <Container maxWidth="sm">
        <Box py={5}>
          <Typography variant="h1">Todos</Typography>
          <Divider />

          <Box py={2}>
            <Typography variant="h3">Counter: {state.value}</Typography>
          </Box>

          <Box pt={2}>
            <Grid container spacing={2}>
              <Grid item>
                <Button variant="contained" color="primary" onClick={() => dispatch(increment())}>
                  Add
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" onClick={() => dispatch(decrement())}>
                  Remove
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
