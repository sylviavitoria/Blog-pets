# 🐾 MundoPet - Blog Interativo sobre Pets

## 📝 Descrição

O **MundoPet** é um blog interativo desenvolvido para compartilhar conteúdo sobre pets. A aplicação permite que os usuários criem, visualizem, editem e excluam posts sobre animais de estimação. É uma plataforma dedicada a todos os amantes de animais que desejam compartilhar conhecimentos sobre cuidados, alimentação, comportamento e curiosidades sobre seus pets.

---

## 🚀 Tecnologias Utilizadas

### Frontend

- React   
- TypeScript  
- React Router  
- Axios  
- date-fns  
- Vite 

### Backend

- **Spring Boot 3.4.4**: Framework Java para desenvolvimento de aplicações
- **Spring Data JPA**: Para persistência de dados
- **PostgreSQL**: Banco de dados relacional
- **H2 Database**: Banco de dados em memória para testes
- **Flyway**: Controle de versão para banco de dados
- **Swagger/OpenAPI 3**: Documentação automática da API
- **MapStruct**: Para mapeamento de objetos
- **Lombok**: Redução de código boilerplate
- **Docker e Docker Compose**: Containerização da aplicação

---

## 🎨 Imagem do layout:
![image](https://github.com/user-attachments/assets/28e93866-26ad-4679-ac7b-131128f8335e)

### Criar posts:
![image](https://github.com/user-attachments/assets/e223aca9-93da-42bd-ade2-fbf1ba7b2b2b)

### Página sobre:
![image](https://github.com/user-attachments/assets/c7fcf1eb-3365-4e84-815b-815f790fa32c)

### Visualizar o post, onde você consegue voltar para a HOME, editar e remover:
![image](https://github.com/user-attachments/assets/6077f833-3c65-4995-aae9-b863181e31cd)
### Responsivo:
![image](https://github.com/user-attachments/assets/7ac5eb17-2640-41b6-aabc-d0d3f715636d)



## ✨ Funcionalidades

- **Visualização de Posts:** Listagem de posts com paginação  
- **Detalhes do Post:** Visualização completa de um post específico  
- **Criação de Posts:** Formulário para criação de novos posts com validações  
- **Edição de Posts:** Possibilidade de editar posts existentes  
- **Exclusão de Posts:** Remoção de posts do blog  
- **Paginação:** Navegação entre páginas de posts de forma intuitiva
- **Design Responsivo**: Adaptação para diferentes tamanhos de tela

---

## 📂 Estrutura do Projeto

```
blog-pets/
├── public/
├── src/
│   ├── assets/            # Imagens e recursos estáticos
│   ├── components/        # Componentes React
│   │   ├── __tests__/     # Testes de componentes
│   │   └── form/          # Componentes de formulário
│   ├── hooks/             # Custom hooks
│   │   └── __tests__/     # Testes de hooks
│   ├── pages/             # Páginas da aplicação
│   ├── service/           # Serviços para chamadas de API
│   │   └── __tests__/     # Testes de serviços
│   ├── types/             # Definições de tipos TypeScript
│   ├── App.tsx            # Componente principal
│   ├── index.css          # Estilos globais
│   ├── main.tsx           # Ponto de entrada da aplicação
│   └── setupTests.ts      # Configuração de testes
└── package.json           # Dependências do projeto
```

---

## 🌐 API Endpoints

A aplicação consome uma API REST com os seguintes endpoints:

- `GET /api/v1/posts?page={page}&size={size}` – Lista posts com paginação  
- `GET /api/v1/posts/{id}` – Obtém detalhes de um post específico  
- `POST /api/v1/posts` – Cria um novo post  
- `PUT /api/v1/posts/{id}` – Atualiza um post existente  
- `DELETE /api/v1/posts/{id}` – Remove um post  

---

## 📱 Páginas

### Home (`/`)

- Banner principal  
- Listagem de posts com paginação

### Detalhes do Post (`/post/:id`)

- Visualização completa de um post  
- Opções para editar e excluir

### Criar Post (`/criar-post`)

- Formulário para criação de novos posts

### Editar Post (`/edit-post/:id`)

- Formulário para edição de posts existentes

### Sobre (`/sobre`)

- Informações sobre o blog MundoPet

---

## 🔒 Validações

O sistema implementa várias validações de formulário:

- **Título:** Obrigatório, mínimo de 5 e máximo de 100 caracteres  
- **Autor:** Obrigatório, mínimo de 3 caracteres  
- **Descrição:** Obrigatória, mínimo de 10 caracteres  

---

## 🎨 Estilização

O projeto utiliza **CSS puro** com uma estrutura bem organizada. Os estilos estão definidos no arquivo `index.css`.

---

## 🔄 Estado da Aplicação

Cada componente gerencia seu próprio estado usando **hooks React**, e os custom hooks abstraem a lógica de negócio:

- `usePostList`: Gerencia a listagem e paginação de posts  
- `usePostForm`: Gerencia o formulário de criação  
- `usePostUpdate`: Gerencia a atualização de posts  
- `usePostDelete`: Gerencia a exclusão de posts

## 🧪 Testes
O projeto utiliza Jest e Testing Library para testes unitários. Execute os testes com:
```bash
npm run test           # Executa todos os testes
npm run test:coverage  # Gera relatório de cobertura
```
### Relatório de cobertura
![image](https://github.com/user-attachments/assets/b2d5d797-1e37-4aed-a40a-83af4a8256d6)

---

# 🌬️ Como Executar

### Pré-requisitos

- Node.js (v18 ou superior)  
- npm ou yarn  
- Clone o repositório do back-end, para que você consiga rodar o projeto. Siga as instruções e configurações do back-end: [back-blog-pets](https://github.com/sylviavitoria/back-blog-pets)

## Passo a passo para Execução

### 1. Clone o repositório do Front-end e do Back-end
```bash
# Clone o repositório do FRONT-END
git clone https://github.com/sylviavitoria/Blog-pets.git
cd blog-pets

# Siga as instruções do repositório do BACK-END para conseguir rodar a aplicação
Link repositório: https://github.com/sylviavitoria/back-blog-pets
git clone https://github.com/sylviavitoria/back-blog-pets.git
cd back-blog-pets
```

### 2. Instale as dependências
```bash
npm install
```
### 3. Execute o projeto em modo de desenvolvimento
```bash
npm run dev
```

Acesse a aplicação em: [http://localhost:5173](http://localhost:5173)
