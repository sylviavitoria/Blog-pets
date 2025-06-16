import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePostUpdate } from '../hooks/usePostUpdate';
import { usePostDetail } from '../hooks/usePostDetail';
import PostForm from './form/PostForm';

const EditPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { post: postData, loading, error } = usePostDetail(id);

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
  } = usePostUpdate(postId, defaultPost);

  useEffect(() => {
    if (postData) {
      setFormData({
        titulo: postData.titulo,
        autor: postData.autor,
        descricao: postData.descricao
      });
    }
  }, [postData, setFormData]);

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

  if (error || !postData) {
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