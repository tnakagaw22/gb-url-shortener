import React from "react";

import useFetch from "./hooks/useFetch"
import Layout from './components/Layout';
import UrlInput from './components/UrlInput'
import ShortenedUrlList from './components/ShortenedUrlList'


function App() {

  // const [links, setLinks] = React.useState([]);
  const [links, setLinks, isLoading, error] = useFetch('links');

  const addLink = (link) => {
    let newLink = { short_url: link.short_url };
    
    setLinks([...links, newLink]);
  }

  const removeLink = (index) => {
    setLinks(links.filter((link, i) => i !== index));
  }

  return (
    <Layout>
      <UrlInput
        addLink={addLink}
      />
      <ShortenedUrlList
        links={links}
        removeLink={removeLink}
      />
    </Layout>
  );
}

export default App;
