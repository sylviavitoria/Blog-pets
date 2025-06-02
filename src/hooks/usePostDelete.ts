import { useState } from 'react';
import { postService } from '../service/postService';

export function usePostDelete() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const excluirPost = async (id: number) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      await postService.excluir(id);
      setSuccess(true);
      
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      
      return true;
    } catch (error: unknown) {
      console.error('Erro ao excluir post:', error);
      
      if (typeof error === 'object' && error !== null && 'message' in error) {
        setError((error as { message: string }).message);
      } else {
        setError('Ocorreu um erro ao excluir o post. Tente novamente mais tarde.');
      }
      
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    excluirPost,
    loading,
    error,
    success
  };
}