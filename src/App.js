import React from "react";
import useFetch from "./hooks/useFetch"

import { remove } from './api/baseApi';
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
