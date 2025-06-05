import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Header from '../Header';

describe('Header Component', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );
    });

    it('deve renderizar o logo corretamente', () => {
        expect(screen.getByText('Mundo')).toBeInTheDocument();
        expect(screen.getByText('Pet')).toBeInTheDocument();
    });

    it('deve renderizar os links de navegação', () => {
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Sobre')).toBeInTheDocument();
        expect(screen.getByText('Criar post')).toBeInTheDocument();
    });

    it('deve ter os links apontando para as rotas corretas', () => {
        const homeLink = screen.getByText('Home').closest('a');
        const sobreLink = screen.getByText('Sobre').closest('a');
        const criarPostLink = screen.getByText('Criar post').closest('a');

        expect(homeLink).toHaveAttribute('href', '/');
        expect(sobreLink).toHaveAttribute('href', '/sobre');
        expect(criarPostLink).toHaveAttribute('href', '/criar-post');
    });
});