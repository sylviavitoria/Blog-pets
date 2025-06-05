import Banner from './../components/Banner';
import PostsList from './../components/PostsList';

const Home = () => {
  return (
    <>
      <Banner 
        titulo="Bem-vindo ao Blog de Pets" 
        descricao="O Blog MundoPet é dedicado a compartilhar conhecimentos sobre o mundo dos animais de estimação. Aqui você encontra dicas de cuidados, curiosidades, alimentação e tudo o que envolve o bem-estar dos seus pets."
      />
      <div className="content">
        <PostsList />
      </div>
    </>
  );
};

export default Home;