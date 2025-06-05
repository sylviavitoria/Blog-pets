import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CriarPost from './components/CriarPost';
import Sobre from './components/Sobre';
import PostDetail from './components/PostDetail';  
import EditPost from './components/EditPost';      

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/criar-post" element={<CriarPost />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/edit-post/:id" element={<EditPost />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;