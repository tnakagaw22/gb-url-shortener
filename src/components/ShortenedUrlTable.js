import React from "react";
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

import { Context } from '../context/Store'
import ShortenedUrlItem from './ShortenedUrlItem';

const ShortenedUrlTable = (props) => {
    const [state, dispatch] = React.useContext(Context);

    if (state.isLinkLoading) {
        return (
            <div className='text-center' data-cy="shortened-url-table-loading">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        )
    }
    else if (state.linkLoadError) {
        return (
            <Alert
                variant='danger'
                className='text-center'
                data-cy="shortened-url-list-error">
                {state.linkLoadError}
            </Alert>
        )
    }
    else {
        return (
            <>
                {state.links.length > 0 &&
                    <Table striped hover
                        data-cy="shortened-url-list"
                    >
                        <thead>
                            <tr>
                                <th>URL</th>
                                <th>Slug</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.links.map((link, index) => (
                                <ShortenedUrlItem
                                    index={index}
                                    link={link}
                                />
                            ))}
                        </tbody>
                    </Table>
                }
            </>
        )
    }
}

export default ShortenedUrlTable; 