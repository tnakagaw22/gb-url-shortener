import React from "react";
import Table from 'react-bootstrap/Table';

import ShortenedUrlItem from './ShortenedUrlItem';

const ShortenedUrlTable = (props) => {

    return (
        <>
            {props.links.length > 0 &&
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
                        {props.links.map((link, index) => (
                            <ShortenedUrlItem
                                index={index}
                                link={link}
                                onDelete={() => props.removeLink(index)}
                            />
                        ))}
                    </tbody>
                </Table>
            }
        </>
    )
}

export default ShortenedUrlTable; 