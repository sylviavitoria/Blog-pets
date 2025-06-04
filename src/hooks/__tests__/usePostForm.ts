import { renderHook, act } from '@testing-library/react';
import { usePostForm } from '../usePostForm';
import { postService } from '../../service/postService';

jest.mock('../../service/postService', () => ({
  postService: {
    criarPost: jest.fn()
  }
}));

describe('usePostForm', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve inicializar com valores padrão', () => {
    const { result } = renderHook(() => usePostForm());
    
    expect(result.current.formData).toEqual({
      titulo: '',
      autor: '',
      descricao: ''
    });
    expect(result.current.errors).toEqual({});
    expect(result.current.enviando).toBe(false);
    expect(result.current.enviado).toBe(false);
  });

  it('deve atualizar o formData quando handleChange é chamado', () => {
    const { result } = renderHook(() => usePostForm());
    
    act(() => {
      result.current.handleChange({
        target: { name: 'titulo', value: 'Meu título de teste' }
      } as React.ChangeEvent<HTMLInputElement>);
    });
    
    expect(result.current.formData.titulo).toBe('Meu título de teste');
  });

  it('deve validar o formulário e mostrar erros quando campos estão vazios', () => {
    const { result } = renderHook(() => usePostForm());
    
    act(() => {
      result.current.handleSubmit({
        preventDefault: jest.fn()
      } as unknown as React.FormEvent<HTMLFormElement>);
    });
    
    expect(result.current.errors.titulo).toBeDefined();
    expect(result.current.errors.autor).toBeDefined();
    expect(result.current.errors.descricao).toBeDefined();
    expect(postService.criarPost).not.toHaveBeenCalled();
  });

  it('deve validar o formulário e mostrar erros quando campos têm valores inválidos', () => {
    const { result } = renderHook(() => usePostForm());
    
    act(() => {
      result.current.handleChange({
        target: { name: 'titulo', value: 'Olá' }  
      } as React.ChangeEvent<HTMLInputElement>);
      
      result.current.handleChange({
        target: { name: 'autor', value: 'AB' }  
      } as React.ChangeEvent<HTMLInputElement>);
      
      result.current.handleChange({
        target: { name: 'descricao', value: 'Curta' }  
      } as React.ChangeEvent<HTMLTextAreaElement>);
    });
    
    act(() => {
      result.current.handleSubmit({
        preventDefault: jest.fn()
      } as unknown as React.FormEvent<HTMLFormElement>);
    });
    
    expect(result.current.errors.titulo).toBeDefined();
    expect(result.current.errors.autor).toBeDefined();
    expect(result.current.errors.descricao).toBeDefined();
    expect(postService.criarPost).not.toHaveBeenCalled();
  });

  it('deve enviar o formulário quando os dados são válidos', async () => {
    const mockPostResponse = {
      id: 1,
      titulo: 'Meu Post de Teste',
      autor: 'Autor Teste',
      descricao: 'Descrição de teste com tamanho válido',
      dataCriacao: '2025-06-04T12:00:00Z'
    };
    
    (postService.criarPost as jest.Mock).mockResolvedValue(mockPostResponse);
    
    const { result } = renderHook(() => usePostForm());
    
    act(() => {
      result.current.handleChange({
        target: { name: 'titulo', value: 'Meu Post de Teste' }
      } as React.ChangeEvent<HTMLInputElement>);
      
      result.current.handleChange({
        target: { name: 'autor', value: 'Autor Teste' }
      } as React.ChangeEvent<HTMLInputElement>);
      
      result.current.handleChange({
        target: { name: 'descricao', value: 'Descrição de teste com tamanho válido' }
      } as React.ChangeEvent<HTMLTextAreaElement>);
    });
    
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: jest.fn()
      } as unknown as React.FormEvent<HTMLFormElement>);
    });
    
    expect(postService.criarPost).toHaveBeenCalledWith({
      titulo: 'Meu Post de Teste',
      autor: 'Autor Teste',
      descricao: 'Descrição de teste com tamanho válido'
    });
 
    expect(result.current.enviado).toBe(true);
    expect(result.current.errors).toEqual({});
    expect(result.current.formData).toEqual({
      titulo: '',
      autor: '',
      descricao: ''
    });
  });

  it('deve tratar erros de validação da API', async () => {
    const apiError = {
      errors: [
        { field: 'titulo', defaultMessage: 'Título já existe' }
      ]
    };
    
    (postService.criarPost as jest.Mock).mockRejectedValue(apiError);
    
    const { result } = renderHook(() => usePostForm());
    
    act(() => {
      result.current.handleChange({
        target: { name: 'titulo', value: 'Meu Post de Teste' }
      } as React.ChangeEvent<HTMLInputElement>);
      
      result.current.handleChange({
        target: { name: 'autor', value: 'Autor Teste' }
      } as React.ChangeEvent<HTMLInputElement>);
      
      result.current.handleChange({
        target: { name: 'descricao', value: 'Descrição de teste com tamanho válido' }
      } as React.ChangeEvent<HTMLTextAreaElement>);
    });
    
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: jest.fn()
      } as unknown as React.FormEvent<HTMLFormElement>);
    });
    
    expect(result.current.errors.titulo).toBe('Título já existe');
    expect(result.current.enviado).toBe(false);
  });

  it('deve tratar erros genéricos da API', async () => {
    (postService.criarPost as jest.Mock).mockRejectedValue({ message: 'Erro de conexão' });
    
    const { result } = renderHook(() => usePostForm());
    
    act(() => {
      result.current.handleChange({
        target: { name: 'titulo', value: 'Meu Post de Teste' }
      } as React.ChangeEvent<HTMLInputElement>);
      
      result.current.handleChange({
        target: { name: 'autor', value: 'Autor Teste' }
      } as React.ChangeEvent<HTMLInputElement>);
      
      result.current.handleChange({
        target: { name: 'descricao', value: 'Descrição de teste com tamanho válido' }
      } as React.ChangeEvent<HTMLTextAreaElement>);
    });
    
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: jest.fn()
      } as unknown as React.FormEvent<HTMLFormElement>);
    });
    
    expect(result.current.errors.form).toBeDefined();
    expect(result.current.enviado).toBe(false);
  });
});