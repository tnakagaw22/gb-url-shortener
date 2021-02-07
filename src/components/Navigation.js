import Navbar from 'react-bootstrap/Navbar';

const Navigation = () => {

    return (
        <Navbar bg="primary" variant="dark" expand="md">
            <Navbar.Brand href='/'>URL Shortener</Navbar.Brand>
        </Navbar>
    );
};

export default Navigation;