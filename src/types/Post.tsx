export interface Post {
  titulo: string;
  autor: string;
  descricao: string;
}

export interface PostResponse {
  id: number;
  titulo: string;
  autor: string;
  descricao: string;
  dataCriacao?: string;
}

export interface FormErrors {
  titulo?: string;
  autor?: string;
  descricao?: string;
  form?: string;
}

export interface PageResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  empty: boolean;
  size: number;
  number: number;
}