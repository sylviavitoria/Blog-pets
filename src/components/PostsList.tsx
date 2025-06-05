import { Link } from 'react-router-dom';
import { usePostList } from '../hooks/usePostList';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useEffect } from 'react';

const PostsList = () => {
  const { posts, loading, error, pageData, page, changePage } = usePostList();

  useEffect(() => {
    if (pageData) {
      console.log('Dados de paginação:', pageData);
    }
  }, [pageData]);

  if (loading) {
    return <div className="loading-message">Carregando posts...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (posts.length === 0) {
    return <div className="empty-message">Nenhum post encontrado.</div>;
  }

  const renderPageButtons = () => {
    if (!pageData) return null;
    
    const totalPagesToShow = Math.max(2, pageData.totalPages);
    const buttons = [];
    
    for (let i = 0; i < totalPagesToShow; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => changePage(i)}
          className={`page-number ${page === i ? 'active' : ''}`}
        >
          {i + 1}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="posts-list">
      {posts.map(post => (
        <div key={post.id} className="post-item">
          <h2 className="post-title">{post.titulo}</h2>
          
          <div className="post-meta">
            <span className="post-author">Por: {post.autor}</span>
            {post.dataCriacao && (
              <span className="post-date">
                {format(new Date(post.dataCriacao), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </span>
            )}
          </div>
          
          <p className="post-description">{post.descricao}</p>
          
          <div className="post-actions">
            <Link to={`/post/${post.id}`} className="btn btn-view">
              Visualizar
            </Link>
          </div>
        </div>
      ))}

      <div className="pagination">
        <button 
          onClick={() => changePage(page - 1)} 
          disabled={page === 0}
          className="page-btn prev"
        >
          &lt;
        </button>
        
        {renderPageButtons()}
        
        <button 
          onClick={() => changePage(page + 1)} 
          disabled={pageData && page >= pageData.totalPages - 1}
          className="page-btn next"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default PostsList;