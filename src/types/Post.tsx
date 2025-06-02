export interface Post {
  titulo: string;
  autor: string;
  descricao: string;
}

export interface FormErrors {
  titulo?: string;
  autor?: string;
  descricao?: string;
  form?: string;
}