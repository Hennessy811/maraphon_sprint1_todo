import React, { useState } from 'react';
import {
	Button,
	TextField,
	IconButton,
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
	Switch,
	DialogTitle,
	Dialog,
	DialogActions,
	DialogContent
} from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const TodosListItem = ({ onChange, onDelete, onEdit, done, title, disabled }) => {
	const [ open, setOpen ] = useState(false);
	const [ changeTitle, setChangeTitle ] = useState(title)

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setChangeTitle(title)
		setOpen(false);
	};

	const titleChange = () => {
		onEdit(changeTitle)
		setOpen(false)
	}

	return (
		<ListItem disabled={disabled}>
			<ListItemText primary={title} />
			<ListItemSecondaryAction>
				<Switch disabled={disabled} edge="end" onChange={onChange} checked={done} />

				<IconButton disabled={disabled} onClick={onDelete}>
					<Delete />
				</IconButton>

				<IconButton disabled={disabled} onClick={handleClickOpen}>
					<EditIcon />
				</IconButton>

				<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">Change title</DialogTitle>
					<DialogContent>
						<TextField 
							autoFocus 
							margin="dense" 
							value={changeTitle} 
							id="titleName" 
							label="Title" 
							fullWidth
							onChange={e => setChangeTitle(e.target.value)}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
						<Button onClick={titleChange} color="primary">
							Change
						</Button>
					</DialogActions>
				</Dialog>
			</ListItemSecondaryAction>
		</ListItem>
	);
};

export default TodosListItem;
