import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Container, TextField, Typography } from '@material-ui/core';
import { sendingData } from './store/features/auth';

const Login = () => {
	const dispatch = useDispatch();
	const state = useSelector(state => state.auth.loggedIn)
	console.log(state)

	// const [ login, setLogin ] = React.useState('');
	const [ password, setPassword ] = useState('');
	const [ email, setEmail ] = useState('');

	// useEffect(() => {
	// 	dispatch();
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	const sendingLogPass = () => {
		const data = {
			email: email,
			password: password
		};
		dispatch(sendingData(data))
		setEmail('')
		setPassword('')
	};

	return (
		<Box minHeight="100vh">
			<Container maxWidth="sm">
				<Typography variant="h1" component="h2" gutterBottom>
					Todo auth
				</Typography>
				<Box py={10} border={1}>
					<Box mx="auto" bgcolor="background.paper" p={1}>
						{/* <TextField
							size="small"
							variant="outlined"
							label="Login"
							fullWidth
							onChange={(e) => setLogin(e.target.value)}
						/> */}
						&nbsp;
						<TextField
							size="small"
							variant="outlined"
							label="Email"
							value={email}
							fullWidth
							onChange={(e) => setEmail(e.target.value)}
						/>
						&nbsp;
						<TextField
							size="small"
							type="password"
							variant="outlined"
							label="Password"
							value={password}
							fullWidth
							onChange={(e) => setPassword(e.target.value)}
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
}

export default Login;
