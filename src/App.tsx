import React from "react";
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';

import { get } from './api/baseApi';
import { Context } from './context/Store'
import UrlInput from './components/UrlInput'
import ShortenedUrlTable from './components/ShortenedUrlTable'

import Navigation from './components/Navigation';

function App() {
  const { state, dispatch } = React.useContext(Context);

  const getLinks = async () => {
    try {
      const response = await get('links');
      dispatch({ type: 'SET_LINKS', payload: response.data });
      console.log(response.data)
    } catch (error) {
      console.log(error);
      dispatch({ type: 'SET_LINKS_LOAD_ERROR', payload: 'Failed to load links' });
    }
  };

  React.useEffect(() => {

    dispatch({ type: 'SET_LINKS_LOADING', payload: true });

    getLinks();

    dispatch({ type: 'SET_LINKS_LOADING', payload: false });
  }, []);

  return (
    <>
      <Navigation />
      <Container>
        <UrlInput />
        <ShortenedUrlTable />
      </Container>
      <ToastContainer />
    </>
  );
}

export default App;
