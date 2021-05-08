import React, { useState } from 'react';
import {
	Button,
	Box,
	TextField,
	IconButton,
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
	Switch,
	DialogTitle,
	Dialog,
	DialogActions,
	DialogContent,
	TextareaAutosize,
	Typography
} from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Delete from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const TodosListItem = ({
	onChange,
	onDelete,
	onEdit,
	onChangeDescDeadL,
	onAddMedia,
	done,
	title,
	description,
	disabled,
	createdAt,
	deadlineDate,
	media
}) => {
	// Format date
	const moment = require('moment');
	const date = new Date(createdAt);
	createdAt = moment(date).format('DD.MM.YYYY,HH:MM');
	const deadLine = moment(deadlineDate).format('YYYY-MM-DDTHH:mm');

	// States open/close dialog windows
	const [ open, setOpen ] = useState(false);
	const [ openDescription, setOpenDescription ] = useState(false);
	const [ changeTitle, setChangeTitle ] = useState(title);

	// States for parametrs
	const [ changeDescription, setChangeDescription ] = useState(description);
	const [ selectDeadLine, setSelectDeadLine ] = useState(deadLine);
	const [ uploadMediaFile, setUploadMediaFile ] = useState(null);

	// Open dialog window (Edit)
	const handleClickOpen = () => {
		setOpen(true);
	};

	// Close dialog window (Edit)
	const handleClose = () => {
		setChangeTitle(title);
		setOpen(false);
	};

	// Change and save Title
	const titleChange = () => {
		onEdit(changeTitle);
		setOpen(false);
	};

	// Open dialog window (Description item)
	const itemOpen = () => {
		setOpenDescription(true);
	};

	// Close dialog window (Description item)
	const cancelItemChanging = () => {
		setChangeDescription(description);
		setOpenDescription(false);
	};

	// Change and save Description
	const itemChanging = () => {
		onChangeDescDeadL(changeDescription, selectDeadLine);
		setOpenDescription(false);
	};

	const upLoadFile = (e) => {
		const files = e.target.files;
		setUploadMediaFile(files);
	};

	// Upload media file
	const addMediaFile = (event) => {
		event.preventDefault();
		onAddMedia(uploadMediaFile);
	};

	return (
		<ListItem disabled={disabled}>
			<ListItemText primary={title} onClick={itemOpen} style={{ cursor: 'pointer' }} />
			<ListItemSecondaryAction>
				<Switch disabled={disabled} edge="end" onChange={onChange} checked={done} />

				<Tooltip title="Delete">
					<span>
						<IconButton disabled={disabled} onClick={onDelete}>
							<Delete />
						</IconButton>
					</span>
				</Tooltip>

				<Tooltip title="Edit">
					<span>
						<IconButton disabled={disabled} onClick={handleClickOpen}>
							<EditIcon />
						</IconButton>
					</span>
				</Tooltip>

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
							onChange={(e) => setChangeTitle(e.target.value)}
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
				<Dialog open={openDescription} onClose={cancelItemChanging} aria-labelledby="form-dialog-description">
					<DialogTitle id="form-dialog-description">Description</DialogTitle>
					<DialogContent>
						<Box display="flex" justifyContent="space-between">
							<Box p={2}>
								<TextareaAutosize
									id="description"
									label="Description"
									variant="outlined"
									value={changeDescription}
									onChange={(e) => setChangeDescription(e.target.value)}
									fullWidth
									style={{ height: 350, width: '100%', fontSize: '1rem' }}
									multiline
								/>
							</Box>
							<Box flexDirection="column" style={{ width: '45%' }}>
								<TextField
									value={createdAt}
									id="createdAt"
									label="Created At"
									InputLabelProps={{
										shrink: true
									}}
									fullWidth
									disabled={true}
								/>
								<TextField
									id="datetime-local"
									label="Dead line"
									type="datetime-local"
									InputLabelProps={{
										shrink: true
									}}
									value={selectDeadLine}
									onChange={(e) => setSelectDeadLine(e.target.value)}
									fullWidth
								/>
								<form onSubmit={addMediaFile}>
									<input type="file" multiple={false} onChange={upLoadFile} />
									<button>Submit</button>
								</form>
							</Box>
						</Box>
					</DialogContent>
					<DialogActions>
						<Box>
							<DialogActions display="flex" justifyContent="space-between">
								<Button onClick={itemChanging} color="primary">
									Change
								</Button>
								<Button onClick={cancelItemChanging} color="primary">
									Cancel
								</Button>
							</DialogActions>
						</Box>
					</DialogActions>
				</Dialog>
			</ListItemSecondaryAction>
		</ListItem>
	);
};

export default TodosListItem;
