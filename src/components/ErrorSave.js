import ListGroup from 'react-bootstrap/ListGroup';

const ErrorSave = (props) => {

    const errors = [];

    if (props.errors && props.errors.url) {
        props.errors.url.map(err => errors.push(`url ${err}`));
    }

    if (props.errors && props.errors.slug) {
        props.errors.slug.map(err => errors.push(`slug ${err}`));
    }

    return (
            <ListGroup variant="flush">
                {errors.map((error, index) => (
                    <ListGroup.Item 
                    key={`error-${index}`} 
                    variant="danger"
                    data-cy="error-save-item"
                    >
                        {error}
                    </ListGroup.Item>

                    
                ))}
            </ListGroup>
    );
};

export default ErrorSave;