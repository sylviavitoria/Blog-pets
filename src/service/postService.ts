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

};