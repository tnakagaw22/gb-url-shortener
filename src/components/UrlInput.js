import React from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { post } from '../api/baseApi';

const UrlInput = (props) => {
    const [url, setUrl] = React.useState('');
    const [slug, setSlug] = React.useState('');

    const handleAddUrl = async (e) => {
        e.preventDefault();

        try {
            let response = await post('links', { url, slug });
            props.addLink({ short_url: response.data.short_url });
        }
        catch (e) {
            console.log(e);
        }
        setUrl('');
        setSlug('');
    }

    return (
        <>
            <Form onSubmit={handleAddUrl}>
                <label htmlFor="basic-url">URL</label>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="url-prepend">
                            http://bely.me/
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl id="basic-url" aria-describedby="url-prepend"
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                        data-cy="url-input"
                        autoFocus
                    />
                </InputGroup>

                <Form.Group controlId="form-slug">
                    <Form.Label>Slug</Form.Label>
                    <Form.Control
                        type="text"
                        value={slug}
                        placeholder="Enter slug"
                        onChange={e => setSlug(e.target.value)}
                        data-cy="slug-input"
                    />

                </Form.Group>
                <Button
                    onClick={handleAddUrl}
                    data-cy="add-link-button"
                >
                    Add
                    </Button>
            </Form>
        </>
    )
}

export default UrlInput; 