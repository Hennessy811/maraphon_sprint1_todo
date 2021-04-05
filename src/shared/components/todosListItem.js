import React from 'react';
import { IconButton, ListItem, ListItemText, ListItemSecondaryAction, Switch } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';

const TodosListItem = ({ onChange, onDelete, done, title, disabled }) => {
  return (
    <ListItem disabled={disabled}>
      <ListItemText primary={title} />
      <ListItemSecondaryAction>
        <Switch disabled={disabled} edge="end" onChange={onChange} checked={done} />

        <IconButton disabled={disabled} onClick={onDelete}>
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TodosListItem;
