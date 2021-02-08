import React from "react";
import { Trash } from 'react-bootstrap-icons';

const ShortenedUrlItem = (props) => {

    return (
        <>
            <tr key={props.index} 
                    data-cy="shortened-url-item"
                    >
                <td>
                    {props.link.url}
                </td>
                <td>
                    {props.link.slug}
                </td>
                <td>
                    <Trash onClick={props.onDelete} />
                </td>
            </tr>
           
        </>
    )
}

export default ShortenedUrlItem; 