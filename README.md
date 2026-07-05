# DR. MOBILE - API de Clientes

Este é um microsserviço RESTful desenvolvido como parte do desafio técnico da DR. MOBILE, focado no gerenciamento cadastral de clientes com alta consistência de dados, regras de negócio isoladas e segurança.

## Tecnologias Utilizadas

* **Node.js + Express:** Servidor HTTP ágil.
* **TypeScript:** Tipagem estrita e blindagem contra erros lógicos em tempo de compilação.
* **MongoDB + Mongoose:** Banco de dados NoSQL com esquemas rigorosos e índices únicos.
* **Zod:** Validação de payload de requisições.
* **Swagger/OpenAPI:** Documentação visual e interativa dos endpoints.
* **Docker & Docker Compose:** Containerização e padronização de ambiente de desenvolvimento.

## Arquitetura

O projeto foi construído inspirado nos conceitos de **Clean Architecture** e **SOLID**, garantindo baixo acoplamento e alta coesão:
* **Routes & Controllers:** Camada de apresentação e tratamento de requisições web.
* **Services:** Camada agnóstica de frameworks onde residem as regras de negócio puras (validação de maioridade, checagem matemática de CPF e tratamento de duplicidade).
* **Repositories:** Abstração completa da camada de persistência  de dados.

## Diferenciais Implementados:
* Validação matemática customizada para CPFs.
* Soft Delete (Exclusão Lógica) para preservar históricos médicos/cadastrais de auditoria.
* Tratamento centralizado de exceções através do Middleware `errorHandler`.

## Como executar o projeto localmente

### Pré-Requisitos
* Node.js (v18 ou superior)
* Conta no MongoDB Atlas (Cluster configurado)

### Passo a Passo

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/dr-mobile-clientes-api.git

2. Instale as dependências:
npm install

3. Configure as variáveis de ambiente. Crie um arquivo .env na raiz do projeto e adicione sua string de conexão:
PORT=3000
MONGODB_URI=mongodb+srv://<usuario>:<senha>@cluster0.exemplo.mongodb.net/clientes?retryWrites=true&w=majority

### Execute em modo de desenvolvimento:
npm run dev

### Execução via Docker (Recomendado)
Se você possui o Docker instalado, basta rodar o comando abaixo para iniciar o contêiner virtual isolado:
docker-compose up --build

### Documentação e Testes
Swagger: Com o servidor rodando, acesse http://localhost:3000/docs para visualizar e interagir com os endpoints pelo navegador.

Postman: Dentro da pasta /postman, existem arquivos de Collection e Environment com fluxos de requisições configurados e testes automatizados (pm.test). Importe os arquivos diretamente no Postman.