import React from "react";
import { Trash } from 'react-bootstrap-icons';

import { Context } from '../context/Store'
import { remove } from '../api/baseApi';

const ShortenedUrlItem = (props) => {
    const [state, dispatch] = React.useContext(Context);
    const deleteLink = async (index) => {
        try {
            let removingLink = state.links[index];
            await remove(`links/${removingLink.slug}`);

            dispatch({ type: 'REMOVE_LINK', payload: index });
        } catch (error) {
            console.log(error);
        }
    }


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
                    <Trash
                        onClick={() => deleteLink(props.index)}
                        data-cy="delete-url-icon"
                    />
                </td>
            </tr>

        </>
    )
}

export default ShortenedUrlItem; 