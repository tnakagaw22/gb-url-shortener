import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from "react-hook-form";

import ErrorSave from './ErrorSave';

import { Context } from '../context/Store'
import { post } from '../api/baseApi';

const UrlInput = (props) => {
    const [state, dispatch] = React.useContext(Context);
    const urlInputRef = React.useRef(null);
    const { register, errors, handleSubmit } = useForm();

    const [url, setUrl] = React.useState('');
    const [slug, setSlug] = React.useState('');
    const [saving, setSaving] = React.useState(false);
    const [serverErrors, setServerErrors] = React.useState('');

    React.useEffect(() => {
        urlInputRef.current.focus();
    }, [urlInputRef]);

    const handleAddUrl = async () => {

        setSaving(true);
        setServerErrors('');

        try {
            let response = await post('links', { url: encodeURIComponent(url), slug });
            dispatch({ type: 'ADD_LINK', payload: response.data });

            setUrl('');
            setSlug('');
            urlInputRef.current.focus();
        }
        catch (err) {
            setServerErrors(err.response.data.errors);
        }

        setSaving(false);
    }

    return (
        <>
            <Form onSubmit={handleSubmit(handleAddUrl)}>
                <Row>
                    <Col xs={12} md={8}>
                        <label htmlFor="url-input">URL</label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="url-prepend">
                                    http://bely.me/
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl 
                                id="url-input" aria-describedby="url-prepend"
                                value={url}
                                name="urlInput"
                                onChange={e => setUrl(e.target.value)}
                                ref={(e) => {
                                    register(e, { required: true });
                                    urlInputRef.current = e;
                                }}
                                isInvalid={!!errors.urlInput}
                                data-cy="url-input"
                            />

                            <Form.Control.Feedback type="invalid">
                                {errors.urlInput && errors.urlInput.type === "required" && (
                                    'URL is required'
                                )}
                            </Form.Control.Feedback>
                        </InputGroup>

                    </Col>
                    <Col xs={6} md={4}>
                        <Form.Group controlId="form-slug">
                            <Form.Label>Slug</Form.Label>
                            <Form.Control
                                type="text"
                                name="slugInput"
                                value={slug}
                                placeholder="Enter slug"
                                onChange={e => setSlug(e.target.value)}
                                ref={register({ maxLength: 100 })}
                                isInvalid={!!errors.slugInput}
                                data-cy="slug-input"
                            />

                            <Form.Control.Feedback type="invalid">
                                {errors.slugInput && errors.slugInput.type === "maxLength" && (
                                    'Slug needs to be less than 100'
                                )}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <ErrorSave errors={serverErrors} />

                <Row className='my-3 justify-content-md-center'>
                    <Col md={4}>
                        <Button
                            block
                            type="submit"
                            onClick={!saving ? handleSubmit(handleAddUrl) : null}
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