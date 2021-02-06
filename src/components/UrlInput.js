import React from "react";
import { TextField, Paper, Button, Grid } from '@material-ui/core';

import { post } from '../api/baseApi';

const UrlInput = (props) => {
    const [url, setUrl] = React.useState('');

    const handleAddUrl = async (e) => {
        e.preventDefault();

        try {
            await post('links', { url });
        }
        catch (e) {
            console.log(e);
        }
        props.addLink({ short_url: url });
        setUrl('');
    }

    return (
        <>
            <Paper style={{ margin: 16, padding: 16 }}>
                <form onSubmit={handleAddUrl}>
                    <Grid container>
                        <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
                            <TextField
                                placeholder="URL"
                                value={url}
                                onChange={e => setUrl(e.target.value)}
                                fullWidth
                                autoFocus
                            />
                        </Grid>
                        <Grid xs={2} md={1} item>
                            <Button
                                fullWidth
                                color="secondary"
                                variant="outlined"
                                onClick={handleAddUrl}
                            >
                                Add
                        </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </>
    )
}

export default UrlInput; 