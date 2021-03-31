import React, { useState, useEffect } from 'react';
import {
	Box,
	Button,
	Checkbox,
	Grid,
	Container,
	Divider,
	Typography,
	TextField,
	List,
	ListItem
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { add, remove, store } from './store/features/todos';
import axios from 'axios';

function App() {
	//Request
	const [ data, setData ] = useState([]);

	useEffect(() => {
		(async () => {
			const response = await axios.get('http://167.172.176.146/todos');
			dispatch(store(response.data));
			setData(response);
		})();
	}, []);

	//Store
	const dispatch = useDispatch();
	const state = useSelector((state) => state.todos);

	//useState
	const [ items, setItems ] = useState('');

	//Submit
	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch(add({ items }));
		setItems('');
	};

	//Checkbox
	const handleCheckChange = (e, todo) => {
		let attr = document.getElementById('checkbox' + e.target.id);
		if (todo === true) {
			attr.style.textDecoration = 'line-through';
		} else {
			attr.style.textDecoration = '';
		}
	};

	return (
		<Box minHeight="100vh">
			<Container maxWidth="sm">
				<Box py={5}>
					<Typography variant="h1">Todos</Typography>
					<Divider />

					<form onSubmit={handleSubmit}>
						<Box pt={2}>
							<Grid container spacing={2}>
								<TextField spacing={2} value={items} onInput={(e) => setItems(e.target.value)} />
								<Grid item>
									<Button variant="contained" color="primary" type="submit">
										Add
									</Button>
								</Grid>
							</Grid>
						</Box>
					</form>

					<Box py={2}>
						<List>
							{state.value.map((todo, index) => (
								<ListItem key={index}>
									<Checkbox
										checked={todo.done}
										onChange={(e, todo) => handleCheckChange(e, todo)}
										id={index.toString()}
										color="primary"
										inputProps={{ 'aria-label': 'primary checkbox' }}
									/>

									<Grid container>
										<Typography variant="h5" spacing={5}>
											<ListItem id={'checkbox' + index}>{todo}</ListItem>
										</Typography>
										<Button
											variant="contained"
											color="secondary"
											value={todo}
											onClick={() => dispatch(remove({ todo, index }))}
										>
											<DeleteIcon variant="contained" />
										</Button>
									</Grid>
								</ListItem>
							))}
						</List>
					</Box>
				</Box>
			</Container>
		</Box>
	);
}

export default App;
