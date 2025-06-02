import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';

function CriarPost() {
    const [titulo, setTitulo] = useState<string>('');
    const [autor, setAutor] = useState<string>(''); 
    const [descricao, setDescricao] = useState<string>('');
    
    const [errors, setErrors] = useState<{
        titulo?: string;
        autor?: string;
        descricao?: string;
        form?: string; 
    }>({});
    
    const [enviando, setEnviando] = useState<boolean>(false);
    const [enviado, setEnviado] = useState<boolean>(false);

    const validarFormulario = (): boolean => {
        const novosErros: {
            titulo?: string;
            autor?: string;
            descricao?: string;
        } = {};
        
        if (!titulo.trim()) {
            novosErros.titulo = 'O título é obrigatório';
        } else if (titulo.trim().length < 5) {
            novosErros.titulo = 'O título deve ter pelo menos 5 caracteres';
        } else if (titulo.trim().length > 100) {
            novosErros.titulo = 'O título deve ter no máximo 100 caracteres';
        }
        
        if (!autor.trim()) {
            novosErros.autor = 'O autor é obrigatório';
        } else if (autor.trim().length < 3) {
            novosErros.autor = 'O nome do autor deve ter pelo menos 3 caracteres';
        }
        
        if (!descricao.trim()) {
            novosErros.descricao = 'A descrição é obrigatória';
        } else if (descricao.trim().length < 10) {
            novosErros.descricao = 'A descrição deve ter pelo menos 10 caracteres';
        }
        
        setErrors(novosErros);
        
        return Object.keys(novosErros).length === 0;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!validarFormulario()) {
            return;
        }
        
        setEnviando(true);
        
        try {
            const response = await fetch('http://localhost:8080/api/v1/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    titulo,
                    autor,
                    descricao
                })
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log('Post criado com sucesso:', data);
                
                setTitulo('');
                setAutor('');
                setDescricao('');
                setEnviando(false);
                setEnviado(true);
                
                setErrors({});
                
                setTimeout(() => {
                    setEnviado(false);
                }, 3000);
            } else {
                const errorData = await response.json();
                console.error('Erro ao criar post:', errorData);
                
                if (errorData.errors) {
                    const newErrors: {[key: string]: string} = {};
                    errorData.errors.forEach((error: {field: string, defaultMessage: string}) => {
                        const field = error.field;
                        newErrors[field] = error.defaultMessage;
                    });
                    setErrors(prevErrors => ({...prevErrors, ...newErrors}));
                } else {
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        form: 'Erro ao processar a requisição. Por favor, tente novamente.'
                    }));
                }
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            setErrors(prevErrors => ({
                ...prevErrors,
                form: 'Erro ao conectar com o servidor. Verifique sua conexão de internet.'
            }));
        } finally {
            setEnviando(false);
        }
    };

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
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="titulo">
                            Título: <span className="required">*</span>
                        </label>
                        <input 
                            type="text" 
                            id="titulo" 
                            name="titulo"
                            value={titulo}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitulo(e.target.value)}
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
                            value={autor}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setAutor(e.target.value)}
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
                            value={descricao}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescricao(e.target.value)}
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
            </div>
        </div>
    );
}

export default CriarPost;