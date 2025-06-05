import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostForm from '../PostForm';

describe('PostForm', () => {
  const mockProps = {
    formData: {
      titulo: 'Meu post de teste',
      autor: 'Autor Teste',
      descricao: 'Esta é uma descrição de teste para o post'
    },
    errors: {},
    enviando: false,
    onChange: jest.fn(),
    onSubmit: jest.fn()
  };

  it('deve renderizar o formulário com os valores corretos', () => {
    render(<PostForm {...mockProps} />);

    expect(screen.getByLabelText(/título:/i)).toHaveValue('Meu post de teste');
    expect(screen.getByLabelText(/autor:/i)).toHaveValue('Autor Teste');
    expect(screen.getByLabelText(/descrição:/i)).toHaveValue('Esta é uma descrição de teste para o post');
    expect(screen.getByRole('button', { name: /publicar/i })).toBeEnabled();
  });

  it('deve mostrar mensagens de erro quando presentes', () => {
    const propsWithErrors = {
      ...mockProps,
      errors: {
        titulo: 'O título é obrigatório',
        autor: 'O autor é obrigatório',
        descricao: 'A descrição é obrigatória'
      }
    };

    render(<PostForm {...propsWithErrors} />);

    expect(screen.getByText('O título é obrigatório')).toBeInTheDocument();
    expect(screen.getByText('O autor é obrigatório')).toBeInTheDocument();
    expect(screen.getByText('A descrição é obrigatória')).toBeInTheDocument();
  });

  it('deve mostrar o estado enviando quando estiver processando', () => {
    const propsEnviando = {
      ...mockProps,
      enviando: true
    };

    render(<PostForm {...propsEnviando} />);

    const botaoSubmit = screen.getByRole('button', { name: /publicando/i });
    expect(botaoSubmit).toBeInTheDocument();
    expect(botaoSubmit).toBeDisabled();
    
    expect(screen.getByLabelText(/título:/i)).toBeDisabled();
    expect(screen.getByLabelText(/autor:/i)).toBeDisabled();
    expect(screen.getByLabelText(/descrição:/i)).toBeDisabled();
  });

  it('deve chamar a função onSubmit quando o formulário for enviado', () => {
    render(<PostForm {...mockProps} />);

    fireEvent.submit(screen.getByRole('button', { name: /publicar/i }));

    expect(mockProps.onSubmit).toHaveBeenCalledTimes(1);
  });

  it('deve chamar onChange quando um input for alterado', () => {
    render(<PostForm {...mockProps} />);

    fireEvent.change(screen.getByLabelText(/título:/i), { target: { value: 'Novo título' } });
    
    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
  });
});