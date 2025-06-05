import axios from 'axios';
import { postService } from '../postService';
import { Post, PostResponse, PageResponse } from '../../types/post';

jest.mock('axios', () => {
  const mockAxios = {
    create: jest.fn(() => mockAxios),
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    defaults: { baseURL: '' },
    isAxiosError: jest.fn() 
  };
  return mockAxios;
});

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('postService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockPost: Post = {
    titulo: 'Título do teste',
    autor: 'Autor do teste',
    descricao: 'Descrição do teste para o serviço'
  };

  const mockPostResponse: PostResponse = {
    id: 1,
    titulo: 'Título do teste',
    autor: 'Autor do teste',
    descricao: 'Descrição do teste para o serviço',
    dataCriacao: '2025-06-04T12:00:00Z'
  };

  const mockPageResponse: PageResponse<PostResponse> = {
    content: [mockPostResponse],
    pageable: {
      pageNumber: 0,
      pageSize: 10
    },
    totalElements: 1,
    totalPages: 1,
    last: true,
    first: true,
    empty: false,
    size: 10,
    number: 0
  };

  describe('criarPost', () => {
    it('deve criar um post com sucesso', async () => {
      mockedAxios.post.mockResolvedValueOnce({ data: mockPostResponse });

      const result = await postService.criarPost(mockPost);

      expect(mockedAxios.post).toHaveBeenCalledWith('/posts', mockPost);
      expect(result).toEqual(mockPostResponse);
    });

    it('deve lidar com erro de resposta do servidor ao criar post', async () => {
      const errorResponse = { 
        message: 'Erro de validação', 
        errors: [{ field: 'titulo', defaultMessage: 'Título é obrigatório' }] 
      };
      
      const axiosError = { 
        response: { data: errorResponse },
        isAxiosError: true 
      };
      
      mockedAxios.post.mockRejectedValueOnce(axiosError);
      mockedAxios.isAxiosError.mockReturnValueOnce(true); 

      await expect(postService.criarPost(mockPost)).rejects.toEqual(errorResponse);
    });

    it('deve lidar com erro de conexão ao criar post', async () => {
      mockedAxios.post.mockRejectedValueOnce(new Error('Network Error'));
      mockedAxios.isAxiosError.mockReturnValueOnce(false); 
      await expect(postService.criarPost(mockPost)).rejects.toEqual({
        message: 'Erro ao conectar com o servidor'
      });
    });
  });

  describe('buscarPorId', () => {
    it('deve buscar um post por ID com sucesso', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockPostResponse });

      const result = await postService.buscarPorId(1);

      expect(mockedAxios.get).toHaveBeenCalledWith('/posts/1');
      expect(result).toEqual(mockPostResponse);
    });

    it('deve lidar com outros erros de resposta ao buscar post', async () => {
      const errorResponse = { message: 'Erro interno do servidor' };
      const axiosError = {
        response: { status: 500, data: errorResponse },
        isAxiosError: true
      };
      
      mockedAxios.get.mockRejectedValueOnce(axiosError);
      mockedAxios.isAxiosError.mockReturnValueOnce(true);

      await expect(postService.buscarPorId(1)).rejects.toEqual(errorResponse);
    });
  });

  describe('listarTodos', () => {
    it('deve listar posts com sucesso (parâmetros padrão)', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockPageResponse });

      const result = await postService.listarTodos();

      expect(mockedAxios.get).toHaveBeenCalledWith('/posts?page=0&size=10');
      expect(result).toEqual(mockPageResponse);
    });

    it('deve listar posts com sucesso (parâmetros personalizados)', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockPageResponse });

      const result = await postService.listarTodos(1, 5, 'titulo,asc');

      expect(mockedAxios.get).toHaveBeenCalledWith('/posts?page=1&size=5&sort=titulo,asc');
      expect(result).toEqual(mockPageResponse);
    });

    it('deve lidar com erros de resposta ao listar posts', async () => {
      const errorResponse = { message: 'Erro ao processar requisição' };
      const axiosError = {
        response: { data: errorResponse },
        isAxiosError: true
      };
      
      mockedAxios.get.mockRejectedValueOnce(axiosError);
      mockedAxios.isAxiosError.mockReturnValueOnce(true);

      await expect(postService.listarTodos()).rejects.toEqual(errorResponse);
    });
  });

  describe('atualizar', () => {
    it('deve atualizar um post com sucesso', async () => {
      mockedAxios.put.mockResolvedValueOnce({ data: mockPostResponse });

      const result = await postService.atualizar(1, mockPost);

      expect(mockedAxios.put).toHaveBeenCalledWith('/posts/1', mockPost);
      expect(result).toEqual(mockPostResponse);
    });

    it('deve lidar com erro 404 ao atualizar post', async () => {
      const axiosError = {
        response: { status: 404, data: {} },
        isAxiosError: true
      };
      
      mockedAxios.put.mockRejectedValueOnce(axiosError);
      mockedAxios.isAxiosError.mockReturnValueOnce(true);

      await expect(postService.atualizar(999, mockPost)).rejects.toEqual({
        message: 'Post não encontrado com o ID: 999'
      });
    });

    it('deve lidar com outros erros de resposta ao atualizar post', async () => {
      const errorResponse = { 
        message: 'Erro de validação',
        errors: [{ field: 'descricao', defaultMessage: 'Descrição muito curta' }]
      };
      
      const axiosError = {
        response: { status: 400, data: errorResponse },
        isAxiosError: true
      };
      
      mockedAxios.put.mockRejectedValueOnce(axiosError);
      mockedAxios.isAxiosError.mockReturnValueOnce(true);

      await expect(postService.atualizar(1, mockPost)).rejects.toEqual(errorResponse);
    });
  });

  describe('excluir', () => {
    it('deve excluir um post com sucesso', async () => {
      mockedAxios.delete.mockResolvedValueOnce({});

      await postService.excluir(1);

      expect(mockedAxios.delete).toHaveBeenCalledWith('/posts/1');
    });

    it('deve lidar com outros erros de resposta ao excluir post', async () => {
      const errorResponse = { message: 'Erro de permissão' };
      const axiosError = {
        response: { status: 403, data: errorResponse },
        isAxiosError: true
      };
      
      mockedAxios.delete.mockRejectedValueOnce(axiosError);
      mockedAxios.isAxiosError.mockReturnValueOnce(true);

      await expect(postService.excluir(1)).rejects.toEqual(errorResponse);
    });
  });
});