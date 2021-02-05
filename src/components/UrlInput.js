import React from "react";
import { TextField, Paper, Button, Grid } from '@material-ui/core';

const UrlInput = (props) => {
    const [url, setUrl] = React.useState('');

    const handleAddUrl = (e) => {
        e.preventDefault();
        console.log(url);
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