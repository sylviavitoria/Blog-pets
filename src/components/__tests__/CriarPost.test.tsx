import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CriarPost from '../CriarPost';
import { usePostForm } from '../../hooks/usePostForm';

jest.mock('../../hooks/usePostForm');

describe('CriarPost', () => {
  const mockUsePostForm = {
    formData: {
      titulo: 'Meu post de teste',
      autor: 'Autor Teste',
      descricao: 'Esta é uma descrição de teste para o post'
    },
    errors: {},
    enviando: false,
    enviado: false,
    handleChange: jest.fn(),
    handleSubmit: jest.fn()
  };

  beforeEach(() => {
    (usePostForm as jest.Mock).mockReturnValue(mockUsePostForm);
  });

  it('deve renderizar o componente corretamente', () => {
    render(<CriarPost />);
    
    expect(screen.getByText('Criar Post')).toBeInTheDocument();
  });

  it('não deve mostrar a mensagem de sucesso quando enviado for false', () => {
    render(<CriarPost />);
    
    expect(screen.queryByText('Post criado com sucesso!')).not.toBeInTheDocument();
  });

  it('deve mostrar a mensagem de sucesso quando enviado for true', () => {
    (usePostForm as jest.Mock).mockReturnValue({
      ...mockUsePostForm,
      enviado: true
    });

    render(<CriarPost />);
    
    expect(screen.getByText('Post criado com sucesso!')).toBeInTheDocument();
  });

  it('não deve mostrar mensagem de erro quando não houver erro no formulário', () => {
    render(<CriarPost />);
    
    expect(screen.queryByText(/erro/i)).not.toBeInTheDocument();
  });

  it('deve mostrar mensagem de erro quando houver erro no formulário', () => {
    (usePostForm as jest.Mock).mockReturnValue({
      ...mockUsePostForm,
      errors: {
        form: 'Erro ao processar a requisição. Por favor, tente novamente.'
      }
    });

    render(<CriarPost />);
    
    expect(screen.getByText('Erro ao processar a requisição. Por favor, tente novamente.')).toBeInTheDocument();
  });

  it('deve passar as props corretas para o componente PostForm', () => {
    render(<CriarPost />);
    
    expect(screen.getByLabelText(/título:/i)).toHaveValue('Meu post de teste');
    expect(screen.getByLabelText(/autor:/i)).toHaveValue('Autor Teste');
    expect(screen.getByLabelText(/descrição:/i)).toHaveValue('Esta é uma descrição de teste para o post');
    expect(screen.getByRole('button', { name: /publicar/i })).toBeInTheDocument();
  });
});