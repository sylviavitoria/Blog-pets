import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postService } from '../service/postService';
import { usePostUpdate } from '../hooks/usePostUpdate';
import PostForm from './form/PostForm';
import { Post } from '../types/post';

const EditPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [isPostLoaded, setIsPostLoaded] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id || id === 'undefined' || isNaN(parseInt(id))) {
        setError('ID de post inválido');
        setLoading(false);
        return;
      }
      
      try {
        const postData = await postService.buscarPorId(parseInt(id));
        setPost({
          titulo: postData.titulo,
          autor: postData.autor,
          descricao: postData.descricao
        });
        setIsPostLoaded(true); 
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

  const postId = parseInt(id || '0');
  const defaultPost = { titulo: '', autor: '', descricao: '' };
  
  const { 
    formData, 
    errors, 
    enviando, 
    enviado, 
    handleChange, 
    handleSubmit, 
    setFormData 
  } = usePostUpdate(postId, post || defaultPost);


  useEffect(() => {
    if (isPostLoaded && post) {
      setFormData(post);
    }
  }, [isPostLoaded, post, setFormData]);

  useEffect(() => {
    if (enviado) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [enviado, navigate]);

  if (loading) {
    return (
      <div className="content">
        <div className="edit-post">
          <h1>Editar Post</h1>
          <div className="loading-message">Carregando post...</div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="content">
        <div className="edit-post">
          <h1>Editar Post</h1>
          <div className="error-message">
            {error || 'Post não encontrado'}
          </div>
          <button onClick={() => navigate('/')} className="btn">
            Voltar para a Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="content">
      <div className="edit-post">
        <h1>Editar Post</h1>
        
        {enviado && (
          <div className="success-message">
            Post atualizado com sucesso!
          </div>
        )}

        {errors.form && (
          <div className="error-message">
            {errors.form}
          </div>
        )}
        
        <PostForm 
          formData={formData}
          errors={errors}
          enviando={enviando}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />

        <button onClick={() => navigate('/')} className="btn btn-secondary">
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default EditPost;