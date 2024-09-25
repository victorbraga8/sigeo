# Sigeo - Dados

Este projeto é uma aplicação baseada em [Next.js](https://nextjs.org), construída com diversas funcionalidades como integração com o ArcGIS, gerenciamento de dados GeoJSON e suporte a UI moderna utilizando Radix UI e Tailwind CSS.

## Instalação e Configuração

Para começar a usar o projeto, siga os passos abaixo:

### 1. Clonando o repositório

```bash
git clone https://github.com/victorbraga8/sigeo.git
cd sigeo
```

### 2. Instalando as dependências

Instale todas as dependências necessárias para o projeto. Você pode utilizar npm, yarn, pnpm ou bun:

```bash
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

### 3. Configurando o ambiente

Crie um arquivo `.env` na raiz do projeto e adicione as variáveis de ambiente necessárias, como as de conexão com o banco de dados Neon e qualquer outra variável específica para sua configuração. Um exemplo de variável pode ser:

```
DATABASE_URL=seu-database-url
```

### 4. Iniciando o servidor de desenvolvimento

Para iniciar o servidor de desenvolvimento, execute o seguinte comando:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

O servidor estará rodando em [http://localhost:3000](http://localhost:3000).

### 5. Iniciando o JSON Server (para GeoJSON)

Para rodar a API local para lidar com os dados do GeoJSON, execute o seguinte comando:

```bash
npm run server
```

Isso iniciará o servidor JSON em [http://localhost:3003](http://localhost:3003), onde você pode acessar os dados GeoJSON.

## Estrutura do Projeto e Tecnologias Utilizadas

Este projeto foi construído com várias tecnologias modernas para garantir desempenho, escalabilidade e facilidade de uso. Abaixo estão os principais componentes e ferramentas utilizados:

### Frontend e UI:

- **Next.js 14.2.13**: Framework React para renderização híbrida (SSR e SSG), fornecendo uma experiência otimizada para o usuário.
- **Tailwind CSS**: Um framework utilitário para estilização rápida e responsiva, facilitando a criação de designs consistentes.
- **ShadCN UI**: Biblioteca de componentes acessíveis e estilizados, garantindo uma interface moderna e intuitiva.
- **React Table**: Biblioteca para exibição de tabelas de dados, com suporte a filtros, buscas e paginação de forma eficiente.
- **React Toastify**: Para a exibição de notificações toast, melhorando a comunicação de status com o usuário.

### Mapeamento e Dados Geoespaciais:

- **ArcGIS API for JavaScript**: Utilizada para exibir e manipular mapas diretamente no navegador, oferecendo interatividade com os dados geoespaciais.
- **GeoJSONLayer**: Para carregar e renderizar dados geoespaciais em formato GeoJSON, exibindo informações detalhadas no mapa com suporte a filtros.

### Backend e Banco de Dados:

- **Drizzle ORM**: Um ORM simples e eficiente, responsável pela gestão do banco de dados, consultas e migrações.
- **JSON Server**: Um servidor local simulado para servir dados GeoJSON, ideal para testes e desenvolvimento de APIs RESTful.
- **Axios**: Biblioteca para realizar requisições HTTP, usada para buscar dados de APIs e servidores externos.
- **Context API**: Utilizada para gerenciamento de estados globais dentro da aplicação, garantindo uma comunicação eficiente entre componentes.

## Scripts

No `package.json`, você encontrará scripts úteis para facilitar o desenvolvimento:

- `npm run dev`: Inicia o servidor de desenvolvimento Next.js.
- `npm run build`: Compila o projeto para produção.
- `npm run start`: Inicia o servidor Next.js em modo de produção.
- `npm run lint`: Executa o ESLint para verificar erros de código.
- `npm run server`: Inicia o JSON Server para servir os dados GeoJSON na porta 3003.
- `npm run drizzle-studio`: Inicia o estúdio do Drizzle ORM para visualização do banco de dados.
- `npm run db-generate`: Gera a tipagem e migrações do banco de dados com o Drizzle ORM.
- `npm run db-push`: Executa as migrações do banco de dados com o Drizzle ORM.

## Funcionamento

O projeto é dividido em duas partes principais:

1. **Visualização de dados geoespaciais**: A aplicação carrega e exibe um mapa usando a API do ArcGIS, com uma camada GeoJSON. Esses dados são obtidos através de um servidor local (JSON Server), e exibidos dinamicamente no mapa conforme o termo de pesquisa inserido pelo usuário.

2. **Tabela de dados e busca**: Utiliza React Table para exibir dados de locais (praças, status, equipamentos etc.) de maneira interativa. O usuário pode fazer buscas por esses locais, e o mapa será atualizado em tempo real com os resultados.

## Deploy

A forma mais fácil de implantar este projeto é utilizando a plataforma [Vercel](https://vercel.com) (a mesma que mantém o Next.js).

1. Faça login ou crie uma conta no [Vercel](https://vercel.com).
2. Siga o guia de deploy para [Next.js](https://nextjs.org/docs/deployment).

## Contribuição

Este projeto está aberto para contribuições. Se você tiver alguma sugestão ou encontrar algum bug, fique à vontade para abrir uma issue ou enviar um pull request no [repositório GitHub](https://github.com/victorbraga8/sigeo).

## Licença

Este projeto está licenciado sob os termos da [MIT License](LICENSE).
