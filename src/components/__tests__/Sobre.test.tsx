import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sobre from '../Sobre';

describe('Componente Sobre', () => {
  it('deve renderizar o título corretamente', () => {
    render(<Sobre />);
    const titulo = screen.getByRole('heading', {
      name: /olá, seja bem-vindo ao mundopet!/i
    });
    expect(titulo).toBeInTheDocument();
  });

  it('deve renderizar todos os parágrafos com o conteúdo esperado', () => {
    render(<Sobre />);
    
    expect(
      screen.getByText(/o mundopet é um espaço criado com muito carinho/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/somos apaixonados por animais/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/fique à vontade para explorar/i)
    ).toBeInTheDocument();
  });

  it('deve conter o emoji 🐾 no último parágrafo', () => {
    render(<Sobre />);
    const emojiParagrafo = screen.getByText(/🐾/);
    expect(emojiParagrafo).toBeInTheDocument();
  });

  it('deve ter a classe CSS sobre-container', () => {
    render(<Sobre />);
    const container = screen.getByRole('heading').parentElement;
    expect(container).toHaveClass('sobre-container');
  });
});
