import React from "react";
import { List, Paper, Grid } from '@material-ui/core';

import ShortenedUrlItem from './ShortenedUrlItem';

const ShortenedUrlList = (props) => {

    return (
        <>{props.links && props.links.length > 0 && (
            <Paper style={{ margin: 16 }}>
                <List
                    data-cy="shortened-url-list"
                    >
                    {props.links.map((link, index) => (
                        <ShortenedUrlItem
                            key={index}
                            link={link}
                            divider={index < props.links.length - 1}
                            onDelete={() => props.removeLink(index)}
                        />
                    ))}
                </List>
            </Paper>
            )
        }
        </>
    )
}

export default ShortenedUrlList; 