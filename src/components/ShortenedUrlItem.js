import React from "react";
import { Trash } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';

import { Context } from '../context/Store'
import { remove } from '../api/baseApi';

const ShortenedUrlItem = (props) => {
    const [state, dispatch] = React.useContext(Context);
    const deleteLink = async (index) => {
        let removingLink = state.links[index];
        try {
            await remove(`links/${removingLink.slug}`);

            dispatch({ type: 'REMOVE_LINK', payload: index });
        } catch (error) {
            console.log(error);
            toast.error(`Failed to delete ${removingLink.slug}`);
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
                    {props.link.short_url}
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