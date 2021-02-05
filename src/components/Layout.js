import { Paper, AppBar, Toolbar, Typography} from '@material-ui/core';

function Layout(props) {
    return (
        <Paper
            elevation={0}
            style={{ padding: 0, margin: 0, backgroundColor: '#fafafa' }}
            >

            <AppBar color="primary" position="static" style={{ height: 64 }}>
                <Toolbar style={{ height: 64 }}>
                    <Typography color="inherit">URL Shortener</Typography>
                </Toolbar>
            </AppBar>

            {props.children}

        </Paper>
    )
}

export default Layout 