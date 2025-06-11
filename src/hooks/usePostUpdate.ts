import { useState } from 'react';
import type { FormEvent } from 'react';
import { Post, FormErrors } from '../types/post';
import { postService } from '../service/postService';
import { validarFormulario } from '../utils/validacaoForm';

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

  const validarESetarErros = (): boolean => {
    const novosErros = validarFormulario(formData);
    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validarESetarErros()) {
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