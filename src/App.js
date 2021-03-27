import React, { useState } from 'react';
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
import { add, remove } from './store/features/todos';

function App() {

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
	const handleCheckChange = (event) => {
		console.log(event.target.id);
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
										id={index.toString()}
										color="primary"
										inputProps={{ 'aria-label': 'primary checkbox' }}
										onChange={handleCheckChange}
									/>

									<Grid container>
										<Typography variant="h5" spacing={5}>
											<ListItem>
												{todo}
											</ListItem>
										</Typography>
										<Button 
                      variant="contained" 
                      color="secondary"
                      value={todo}
                      onClick={() => dispatch(remove({ todo }))}
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
