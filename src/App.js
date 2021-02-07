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
    let newLink = { short_url: link.short_url };

    setLinks([...links, newLink]);
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

        <hr class="mt-3 mb-3"/>
        
        <ShortenedUrlTable
          links={links}
          removeLink={removeLink}
        />
      </Container>
    </>
  );
}

export default App;
