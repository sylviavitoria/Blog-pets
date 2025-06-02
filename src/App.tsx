import { BrowserRouter,  Routes, Route} from 'react-router-dom';
import Header from 'c:/estagio/blog-pets/blog-pets/src/components/Header';
import Footer from 'c:/estagio/blog-pets/blog-pets/src/components/Footer';
import Home from 'c:/estagio/blog-pets/blog-pets/src/pages/Home';
import CriarPost from './components/CriarPost';
import Sobre from './components/Sobre';
// import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/criar-post" element={<CriarPost />} />
          <Route path="/sobre" element={<Sobre />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;