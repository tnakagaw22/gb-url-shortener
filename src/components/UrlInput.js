import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import ErrorSave from './ErrorSave';

import { Context } from '../context/Store'
import { post } from '../api/baseApi';

const UrlInput = (props) => {
    const [state, dispatch] = React.useContext(Context);
    const urlInputRef = React.useRef(null);
    const [url, setUrl] = React.useState('');
    const [slug, setSlug] = React.useState('');
    const [saving, setSaving] = React.useState(false);
    const [errors, setErrors] = React.useState('');

    React.useEffect(() => {
        urlInputRef.current.focus();
    }, [urlInputRef]);

    const handleAddUrl = async (e) => {
        e.preventDefault();

        setSaving(true);
        setErrors('');

        try {
            let response = await post('links', { url, slug });
            dispatch({ type: 'ADD_LINK', payload: response.data });

            setUrl('');
            setSlug('');
            urlInputRef.current.focus();
        }
        catch (err) {
            setErrors(err.response.data.errors);
        }

        setSaving(false);
    }

    return (
        <>
            <Form onSubmit={handleAddUrl}>
                <Row>
                    <Col xs={12} md={8}>
                        <label htmlFor="url-input">URL</label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="url-prepend">
                                    http://bely.me/
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl id="url-input" aria-describedby="url-prepend"
                                value={url}
                                onChange={e => setUrl(e.target.value)}
                                ref={urlInputRef}
                                data-cy="url-input"
                                required
                            />
                        </InputGroup>
                    </Col>
                    <Col xs={6} md={4}>
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
                    </Col>
                </Row>

                <ErrorSave errors={errors} />

                <Row className='my-3 justify-content-md-center'>
                    <Col md={4}>
                        <Button
                            block
                            onClick={!saving ? handleAddUrl : null}
                            disabled={saving}
                            data-cy="add-link-button"
                        >
                            {saving ? 'Loading…' : 'Add'}
                        </Button>
                    </Col>
                </Row>

            </Form>
        </>
    )
}

export default UrlInput; 