# +Cultura Docs

A plataforma +Cultura é um projeto desenvolvido com o intuito de estimular e criar autonomia para diversas organizações e povos das mais variadas culturas do planeta.

Este projeto possibilita com que as pessoas possam acessar conteúdos e artigos sobre a cultura de povos locais, sem que estejam no continente, país ou local de origem desta cultura.

• O projeto dispõe das seguintes funcionalidades:  
· Login e registro de organizações;  
· Cadastro, leitura, edição e exclusão (CRUD) de artigos, textos, imagens sobre as culturas;  
· Acesso de usuários pelo modo visitante para poder visualizar as culturas que desejar.  

• As seguintes tecnologias foram empregadas:  
· Frontend desenvolvido em HTML5, CSS3 e JavaScript;  
· Banco de dados em PostgreSQL hospedado no Supabase, onde permite maior escalabilidade para o projeto;  
· Bucket do Supabase para armazenamento das imagens;  
· Comunicação com o Supabase ocorre através de códigos com JavaScript;  
· Hospedagem e deploy na Vercel, além da configuração de _environment variables_ com a URL e chaves do Banco de Dados, garantindo maior segurança.  

Para acessar a aplicação web basta acessar o website contido no "About" deste repositório.

### Execução

Para rodar localmente o repositório é necessário clonar o ambinete, configurar a URL e chave pública do Banco de Dados e criar as tabelas dentro da base.

Altere a URL e AnonKey do Supabase para os seus dados, dentro do arquivo _supabase_example.js_:
```
window.appConfig = { 
  SUPABASE_URL: 'SUA_URL_AQUI',
  SUPABASE_ANON_KEY: 'SUA_ANON_KEY_AQUI'
};
```
**Altere o nome do arquivo _supabase_example.js_ para _supabase.js_**

Para configurar o Banco de dados é necessário ter uma conta na [Supabase](https://supabase.com/) e criar as seguintes tabelas e tipos de dados:
```
CREATE TABLE ongs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password TEXT NOT NULL, # Para casos em que o sistema será apenas para fins acadêmicos
    cnpj VARCHAR(14) NOT NULL
);
```
```
CREATE TABLE posts (
    id SERIAL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    titulo TEXT NOT NULL,
    descricao TEXT NOT NULL,
    url_imagem TEXT NOT NULL,
    cidade TEXT NOT NULL,
    data DATE NOT NULL,
    ong_id INT REFERENCES ongs(id) ON DELETE CASCADE
)
```

Através do Visual Studio Code com a extensão _Live Server_ será possível rodar localmente o projeto.  

# Imagens
### Index.html
Esta é a pagina inicial do usuário, na qual, a ONG precisa se autenticar ou se for um visitante, apenas entrar como visitante.
![image](https://github.com/user-attachments/assets/76e2eca2-938e-4ac3-8ea7-083624a355d9)

### Ongs-main-page.html
Nesta página são disponibilizadas as postagens feitas pelas ONGs, neste projeto, apenas as ONGs que criaram cada evento podem editar as suas respectivas postagens, além disso, visitantes apenas podem visualizar, não podem editar.
![image](https://github.com/user-attachments/assets/800a4463-be0b-455b-9b35-95ba33bdba4e)

### Criação de Posts na Ongs-main-page.html
![image](https://github.com/user-attachments/assets/5d7a56b0-88d0-4d7c-9889-2e63d1e44954)

### Post-detail.html
No menu a direita é possível abrir mais informações sobre a postagem.
![image](https://github.com/user-attachments/assets/4d7dc2af-c4ab-4634-94c2-e126cd62c1c1)

### Edição e exclusão de Posts no post-detail.html
![image](https://github.com/user-attachments/assets/c80a7473-e774-4e1c-a2bd-e51e4b632480)

### Profile-edit.html
Somente usuários autenticados conseguem acessar esta página e mudar os dados de seu próprio perfil.
![image](https://github.com/user-attachments/assets/d1363884-6e51-4db1-b8ca-61eb41ec8bb4)




