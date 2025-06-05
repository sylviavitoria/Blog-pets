import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import Footer from '../Footer';

describe('Footer Component', () => {
  it('deve renderizar o texto corretamente', () => {
    render(<Footer />);
    expect(screen.getByText(/Criado por Sylvia/i)).toBeInTheDocument();
  });
});