import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { postService } from '../service/postService';
import { PostResponse } from '../types/post';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { usePostDelete } from '../hooks/usePostDelete';

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { excluirPost, loading: loadingDelete } = usePostDelete();

  const handleDelete = async () => {
    if (post && window.confirm('Tem certeza que deseja excluir este post?')) {
      const sucesso = await excluirPost(post.id);
      if (sucesso) {
        navigate('/');
      }
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      
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

  if (loading) {
    return (
      <div className="content">
        <div className="post-detail loading">
          <div className="loading-message">Carregando post...</div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="content">
        <div className="post-detail error">
          <h2>Erro</h2>
          <div className="error-message">
            {error || 'Post não encontrado'}
          </div>
          <Link to="/" className="btn">Voltar para a Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="content">
      <div className="post-detail">
        <h1>{post.titulo}</h1>

        <div className="post-meta">
          <span className="post-author">Por: {post.autor}</span>
          {post.dataCriacao && (
            <span className="post-date">
              {format(new Date(post.dataCriacao), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </span>
          )}
        </div>

        <div className="post-content">
          {post.descricao.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="post-actions">
          <button onClick={() => navigate('/')} className="btn">
            Voltar para a Home
          </button>
          <Link to={`/edit-post/${post.id}`} className="btn btn-edit">
            Editar
          </Link>
          <button
            onClick={handleDelete}
            className="btn btn-delete"
            disabled={loadingDelete}
          >
            {loadingDelete ? 'Excluindo...' : 'Excluir'}
          </button>
        </div>
      </div>
    </div>
  );
}
export default PostDetail;