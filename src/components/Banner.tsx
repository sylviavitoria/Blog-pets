import bannerImage from '../assets/pets-foto.jpg';

interface BannerProps {
  titulo: string;
  descricao: string;
}

const Banner = ({ titulo, descricao }: BannerProps) => {
  return (
    <div className="featured-image">
      <div className="image-container">
        <img src={bannerImage} alt="Banner de animais de estimação" />
        <div className="image-text">
          <h2>{titulo}</h2>
          <p>{descricao}</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;