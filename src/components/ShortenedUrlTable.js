import React from "react";
import Table from 'react-bootstrap/Table';

import ShortenedUrlItem from './ShortenedUrlItem';

const ShortenedUrlTable = (props) => {

    return (
        <>
            <Table striped hover
                data-cy="shortened-url-list"
            >
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
        </>
    )
}

export default ShortenedUrlTable; 