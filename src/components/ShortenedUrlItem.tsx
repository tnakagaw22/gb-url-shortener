import React from "react";
import { Trash } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';

import { Link } from '../models/Link';
import { Context } from '../context/Store'
import { remove } from '../api/baseApi';

type Props = {
    index: number,
    link: Link

}

const ShortenedUrlItem = ({ index, link }: Props) => {
    const {state, dispatch} = React.useContext(Context);
    const deleteLink = async () => {
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
            <tr key={index}
                data-cy="shortened-url-item"
            >
                <td>
                    {link.url}
                </td>
                <td>
                    {link.short_url}
                </td>
                <td>
                    <Trash
                        onClick={deleteLink}
                        data-cy="delete-url-icon"
                    />
                </td>
            </tr>

        </>
    )
}

export default ShortenedUrlItem; 