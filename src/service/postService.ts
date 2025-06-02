import axios from 'axios';
import { Post } from '../types/post';

const API_URL = 'http://localhost:8080/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

interface PostResponse {
  id: number;
  titulo: string;
  autor: string;
  descricao: string;
  dataCriacao?: string;
}

export const postService = {
  async criarPost(postData: Post): Promise<PostResponse> {
    try {
      const response = await api.post<PostResponse>('/posts', postData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject({ message: 'Erro ao conectar com o servidor' });
    }
  },

  async buscarPorId(id: number): Promise<PostResponse> {
    try {
      const response = await api.get<PostResponse>(`/posts/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          return Promise.reject({
            message: `Post não encontrado com o ID: ${id}`
          });
        }
        if (error.response?.data) {
          return Promise.reject(error.response.data);
        }
      }
      return Promise.reject({
        message: 'Erro ao buscar o post. Verifique sua conexão.'
      });
    }
  },

  async listarTodos(page = 0, size = 10, sort?: string): Promise<PageResponse<PostResponse>> {
    try {
      let url = `/posts?page=${page}&size=${size}`;
      if (sort) url += `&sort=${sort}`;

      const response = await api.get<PageResponse<PostResponse>>(url);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject({
        message: 'Erro ao listar posts. Verifique sua conexão.'
      });
    }
  },

  async atualizar(id: number, postData: Post): Promise<PostResponse> {
    try {
      const response = await api.put<PostResponse>(`/posts/${id}`, postData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          return Promise.reject({
            message: `Post não encontrado com o ID: ${id}`
          });
        }
        if (error.response?.data) {
          return Promise.reject(error.response.data);
        }
      }
      return Promise.reject({
        message: 'Erro ao atualizar o post. Verifique sua conexão.'
      });
    }
  },

  async excluir(id: number): Promise<void> {
    try {
      await api.delete(`/posts/${id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          return Promise.reject({
            message: `Post não encontrado com o ID: ${id}`
          });
        }
        if (error.response?.data) {
          return Promise.reject(error.response.data);
        }
      }
      return Promise.reject({
        message: 'Erro ao excluir o post. Verifique sua conexão.'
      });
    }
  }
};