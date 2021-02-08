import React from "react";
import useFetch from "./hooks/useFetch"

import { remove } from './api/baseApi';
// import Layout from './components/Layout';
import UrlInput from './components/UrlInput'
import ShortenedUrlTable from './components/ShortenedUrlTable'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import Navigation from './components/Navigation';

function App() {

  // const [links, setLinks] = React.useState([]);
  const [links, setLinks, isLoading, error] = useFetch('links');

  const addLink = (link) => {
    setLinks([...links, link]);
  }

  const removeLink = async (index) => {
    try {
      let removingLink = links[index];
      await remove(`links/${removingLink.slug}`);

      setLinks(links.filter((link, i) => i !== index));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navigation />
      <Container>
        <UrlInput addLink={addLink} />
        
        <ShortenedUrlTable
          links={links}
          removeLink={removeLink}
        />
      </Container>
    </>
  );
}

export default App;
