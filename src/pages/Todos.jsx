import React, { useState, useEffect } from 'react';
import {
	Box,
	Button,
	Container,
	Card,
	CardContent,
	TextField,
	Typography,
	List,
	CircularProgress
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { createItem, deleteItem, fetchTodos, toggleDone, editItem } from '../store/features/todos';
import TodosListItem from '../shared/components/todosListItem';
import { request } from '../shared/utils/request';
import { logout } from '../store/features/auth';

function Todos() {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.todos);
	const [ title, setTitle ] = useState('');
	const [ user, setUser ] = useState(null);

	useEffect(() => {
		dispatch(fetchTodos());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		request('/users/me').then(setUser);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleCreate = () => {
		const data = {
			title,
			done: false
		};
		dispatch(createItem(data));
		setTitle('');
	};

	const handleLogOut = (e) => {
		e.preventDefault();
		dispatch(logout());
	};

	return (
		<Box minHeight="100vh">
			<Container maxWidth="sm">
				<Box display="flex" justifyContent="space-between">
					{user != null ? (
						<Card>
							<CardContent>
								<Typography color="textSecondary" gutterBottom>
									<Typography variant="h5" component="h2">
										{user.username}
									</Typography>
									{user.email}
								</Typography>
							</CardContent>
						</Card>
					) : (
						<Box>
							<CircularProgress color="secondary" />
						</Box>
					)}
					<Button variant="contained" color="primary" onClick={handleLogOut}>
						LogOut
					</Button>
				</Box>

				<Box py={10}>
					{state.data && !state.error ? (
						<Box>
							<Box display="flex" alignItems="center" justifyContent="space-between">
								<TextField
									size="small"
									variant="outlined"
									label="Input new todo"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									fullWidth
								/>
								<Box ml={3}>
									{title === '' ? (
										<Button variant="contained" color="primary" disabled={true}>
											Create
										</Button>
									) : (
										<Button variant="contained" color="primary" onClick={handleCreate}>
											Create
										</Button>
									)}
								</Box>
							</Box>
							<List>
								{state.data.map((item) => (
									<TodosListItem
										key={item.id}
										done={item.done}
										title={item.title}
										disabled={state.data && state.isLoading}
										onChange={() => dispatch(toggleDone(item.id, !item.done))}
										onDelete={() => dispatch(deleteItem(item.id))}
										onEdit={(changeTitle) => dispatch(editItem(item.id, changeTitle))}
									/>
								))}
							</List>
						</Box>
					) : (
						<Box display="flex" width="100%" justify-content="center">
							<CircularProgress />
						</Box>
					)}
				</Box>
			</Container>
		</Box>
	);
}

export default Todos;
