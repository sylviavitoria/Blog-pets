import PostForm from './form/PostForm';
import { usePostForm } from '../hooks/usePostForm';

function CriarPost() {
  const { formData, errors, enviando, enviado, handleChange, handleSubmit } = usePostForm();

  return (
    <div className="content">
      <div className="criar-post">
        <h1>Criar Post</h1>
        
        {enviado && (
          <div className="success-message">
            Post criado com sucesso!
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
      </div>
    </div>
  );
}

export default CriarPost;