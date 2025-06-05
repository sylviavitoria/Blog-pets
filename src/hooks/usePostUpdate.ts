import { useState } from 'react';
import type { FormEvent } from 'react';
import { Post, FormErrors } from '../types/post';
import { postService } from '../service/postService';

interface ApiError {
  field: string;
  defaultMessage: string;
}

interface ApiErrorResponse {
  errors?: ApiError[];
  message?: string;
}

export function usePostUpdate(id: number, initialData: Post) {
  const [formData, setFormData] = useState<Post>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [enviando, setEnviando] = useState<boolean>(false);
  const [enviado, setEnviado] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validarFormulario = (): boolean => {
    
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
    
    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validarFormulario()) {
      return;
    }
    
    setEnviando(true);
    
    try {
      const data = await postService.atualizar(id, formData);
      console.log('Post atualizado com sucesso:', data);
      setEnviado(true);
      setErrors({});
      
      setTimeout(() => {
        setEnviado(false);
      }, 3000);
    } catch (error: unknown) {
      console.error('Erro ao atualizar post:', error);
      
      const errorData = error as ApiErrorResponse;
      
      if (errorData?.errors?.length) {
        const newErrors: FormErrors = {};
        errorData.errors.forEach((error: ApiError) => {
          const field = error.field as keyof FormErrors;
          newErrors[field] = error.defaultMessage;
        });
        setErrors(prev => ({...prev, ...newErrors}));
      } else {
        setErrors(prev => ({
          ...prev,
          form: 'Erro ao processar a requisição. Por favor, tente novamente.'
        }));
      }
    } finally {
      setEnviando(false);
    }
  };

  return {
    formData,
    errors,
    enviando,
    enviado,
    handleChange,
    handleSubmit,
    setFormData
  };
}