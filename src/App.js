import Layout from './components/Layout';
import UrlInput from './components/UrlInput'
import ShortenedUrlList from './components/ShortenedUrlList'


function App() {
  return (
    <Layout>
        <UrlInput />
        <ShortenedUrlList />
    </Layout>
  );
}

export default App;
