import React from "react";
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';

const ShortenedUrlItem = (props) => {

    return (
        <>
            <ListItem divider={props.divider}>
                <ListItemText
                    primary={props.link.short_url}
                    data-cy="shortened-url-item"
                    />
                <ListItemSecondaryAction>
                    <IconButton aria-label="Delete URL" onClick={props.onDelete}>
                        <Delete />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        </>
    )
}

export default ShortenedUrlItem; 