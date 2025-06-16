import { useState, useEffect } from 'react';
import { PostResponse } from '../types/post';
import { postService } from '../service/postService';

export function usePostDetail(id: string | undefined) {
  const [post, setPost] = useState<PostResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      
      if (!id || id === 'undefined' || isNaN(parseInt(id))) {
        setError('ID de post inválido');
        setLoading(false);
        return;
      }

      try {
        const postData = await postService.buscarPorId(parseInt(id));
        setPost(postData);
      } catch (error) {
        console.error('Erro ao buscar post:', error);
        
        if (typeof error === 'object' && error !== null && 'message' in error) {
          setError((error as { message: string }).message);
        } else {
          setError('Erro ao carregar o post. Tente novamente mais tarde.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  return { post, loading, error };
}