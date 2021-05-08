import React, { useState, useEffect } from 'react';
import {
	AppBar,
	Box,
	Button,
	Container,
	TextField,
	Typography,
	Toolbar,
	List,
	CircularProgress
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { createItem, deleteItem, fetchTodos, toggleDone, editItem, changeItem, addMedia } from '../store/features/todos';
import TodosListItem from '../shared/components/todosListItem';
import { request } from '../shared/utils/request';
import { logout } from '../store/features/auth';
import { makeStyles } from '@material-ui/core/styles';

function Todos() {
	const useStyles = makeStyles(() => ({
		title: {
			flexGrow: 1
		}
	}));
	const styles = useStyles();

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
						<AppBar position="static">
							<Toolbar>
								<Typography variant="h6" className={styles.title}>
									{user.username}
								</Typography>
								<Button variant="contained" color="primary" onClick={handleLogOut}>
									LogOut
								</Button>
							</Toolbar>
						</AppBar>
					) : (
						<Box>
							<CircularProgress color="secondary" />
						</Box>
					)}
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
										description={item.description}
										createdAt={item.createdAt}
										deadlineDate={item.deadlineDate}
										media={item.media}
										disabled={state.data && state.isLoading}
										onChange={() => dispatch(toggleDone(item.id, !item.done))}
										onDelete={() => dispatch(deleteItem(item.id))}
										onEdit={(changeTitle) => dispatch(editItem(item.id, changeTitle))}
										onChangeDescDeadL={(changeDescription, selectDeadLine) => dispatch(changeItem(item.id, changeDescription, selectDeadLine))}
										onAddMedia={(mediaFile) => dispatch(addMedia(mediaFile))}
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
