import type { FormEvent } from 'react';
import { FormErrors } from '../types/post';

interface PostFormProps {
  formData: {
    titulo: string;
    autor: string;
    descricao: string;
  };
  errors: FormErrors;
  enviando: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const PostForm = ({ formData, errors, enviando, onChange, onSubmit }: PostFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="titulo">
          Título: <span className="required">*</span>
        </label>
        <input 
          type="text" 
          id="titulo" 
          name="titulo"
          value={formData.titulo}
          onChange={onChange}
          className={errors.titulo ? "input-error" : ""}
          disabled={enviando}
        />
        {errors.titulo && (
          <div className="error-text">{errors.titulo}</div>
        )}
      </div>
      
      <div className="form-group">
        <label htmlFor="autor">
          Autor: <span className="required">*</span>
        </label>
        <input 
          type="text" 
          id="autor" 
          name="autor"
          value={formData.autor}
          onChange={onChange}
          className={errors.autor ? "input-error" : ""}
          disabled={enviando}
        />
        {errors.autor && (
          <div className="error-text">{errors.autor}</div>
        )}
      </div>
      
      <div className="form-group">
        <label htmlFor="descricao">
          Descrição: <span className="required">*</span>
        </label>
        <textarea 
          id="descricao" 
          name="descricao"
          value={formData.descricao}
          onChange={onChange}
          rows={5}
          className={errors.descricao ? "input-error" : ""}
          disabled={enviando}
        />
        {errors.descricao && (
          <div className="error-text">{errors.descricao}</div>
        )}
        <div className="form-help">
          Descreva o conteúdo do seu post de forma clara e objetiva.
        </div>
      </div>
      
      <button 
        type="submit" 
        disabled={enviando}
      >
        {enviando ? 'Publicando...' : 'Publicar'}
      </button>
    </form>
  );
};

export default PostForm;