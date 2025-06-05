import { useState, useEffect, useCallback } from 'react';
import { postService } from '../service/postService';
import { PostResponse, PageResponse } from '../types/post';

export function usePostList(initialPage = 0, initialSize = 10, initialSort?: string) {
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [pageData, setPageData] = useState<PageResponse<PostResponse> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(initialPage);
  const [size, setSize] = useState<number>(initialSize);
  const [sort, setSort] = useState<string | undefined>(initialSort);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await postService.listarTodos(page, size, sort);
      
      const safePageData = {
        ...data,
        totalPages: data.totalPages || 1,
        totalElements: data.totalElements || data.content.length
      };
      
      setPosts(data.content);
      setPageData(safePageData);
      
    } catch (error: unknown) {
      console.error('Erro ao listar posts:', error);
      
      if (typeof error === 'object' && error !== null && 'message' in error) {
        setError((error as { message: string }).message);
      } else {
        setError('Ocorreu um erro ao listar os posts. Tente novamente mais tarde.');
      }
      
    } finally {
      setLoading(false);
    }
  }, [page, size, sort]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const changePage = (newPage: number) => {
    if (newPage < 0) return;
    if (pageData && pageData.totalPages > 0 && newPage >= pageData.totalPages) return;
    
    setPage(newPage);
  };

  const changeSize = (newSize: number) => {
    setSize(newSize);
    setPage(0); 
  };

  const changeSort = (newSort?: string) => {
    setSort(newSort);
    setPage(0); 
  };

  return {
    posts,
    pageData,
    loading,
    error,
    page,
    size,
    sort,
    changePage,
    changeSize,
    changeSort,
    refresh: fetchPosts 
  };
}