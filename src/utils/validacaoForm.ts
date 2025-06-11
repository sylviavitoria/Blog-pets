import { Post, FormErrors } from '../types/post';

export function validarFormulario(formData: Post): FormErrors {
  const novosErros: FormErrors = {};
  const { titulo, autor, descricao } = formData;
  
  if (!titulo.trim()) {
    novosErros.titulo = 'O título é obrigatório';
  } else if (titulo.trim().length < 5) {
    novosErros.titulo = 'O título deve ter pelo menos 5 caracteres';
  } else if (titulo.trim().length > 100) {
    novosErros.titulo = 'O título deve ter no máximo 100 caracteres';
  }
  
  if (!autor.trim()) {
    novosErros.autor = 'O autor é obrigatório';
  } else if (autor.trim().length < 3) {
    novosErros.autor = 'O nome do autor deve ter pelo menos 3 caracteres';
  }
  
  if (!descricao.trim()) {
    novosErros.descricao = 'A descrição é obrigatória';
  } else if (descricao.trim().length < 10) {
    novosErros.descricao = 'A descrição deve ter pelo menos 10 caracteres';
  }
  
  return novosErros;
}

export function isFormularioValido(formData: Post): boolean {
  const erros = validarFormulario(formData);
  return Object.keys(erros).length === 0;
}