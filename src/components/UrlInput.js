import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

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
            let newLink = { url };
            if (slug) {
                newLink.slug = slug;
            }
            let response = await post('links', newLink);
            dispatch({ type: 'ADD_LINK', payload: response.data });
            toast.success(`${response.data.short_url} is generated`);

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
                        <Form.Group controlId="form-url">
                            <Form.Label>URL</Form.Label>
                            <FormControl
                                type="text"
                                value={url}
                                name="urlInput"
                                placeholder="Enter URL (ex: http://test.com)"
                                onChange={e => setUrl(e.target.value)}
                                ref={(e) => {
                                    register(e, {
                                        required: true,
                                        pattern: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
                                    });
                                    urlInputRef.current = e;
                                }}
                                isInvalid={!!errors.urlInput}
                                data-cy="url-input"
                            />

                            <Form.Control.Feedback type="invalid">
                                {errors.urlInput && errors.urlInput.type === "required" && (
                                    <span data-cy="url-input-required">URL is required</span>
                                )}
                                {errors.urlInput && errors.urlInput.type === "pattern" && (
                                    <span data-cy="url-input-pattern">Input is not a valid URL. Needs to start with http/https</span>
                                )}
                            </Form.Control.Feedback>
                        </Form.Group>

                    </Col>
                    <Col xs={6} md={4}>
                        <Form.Group controlId="form-slug">
                            <Form.Label>Slug (optional)</Form.Label>
                            <Form.Control
                                type="text"
                                name="slugInput"
                                value={slug}
                                placeholder="Enter slug"
                                onChange={e => setSlug(e.target.value)}
                                ref={register({
                                    maxLength: 50,
                                    pattern: /^[a-zA-Z0-9-_]+$/
                                })}
                                isInvalid={!!errors.slugInput}
                                data-cy="slug-input"
                            />

                            <Form.Control.Feedback type="invalid">
                                {errors.slugInput && errors.slugInput.type === "maxLength" && (
                                    'Slug needs to be less than 50'
                                )}
                                {errors.slugInput && errors.slugInput.type === "pattern" && (
                                    'Only alphanumeric, hyphen, and undersocre are allowed'
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