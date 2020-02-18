
  <img width=300px src="https://cdn.worldvectorlogo.com/logos/nodejs.svg">
  <h2>CRUD de Usuários</h2>

[![Heroku Status](https://heroku-badge.herokuapp.com/?app=jrmj-api)](https://jrmj-api.herokuapp.com)
[![Maintainability](https://api.codeclimate.com/v1/badges/6b23b5e23ccca4646c15/maintainability)](https://codeclimate.com/github/jrmmendes/desafio-concrete-api/maintainability)
![GitHub issues](https://img.shields.io/github/issues/jrmmendes/desafio-concrete-api)

# Configuração do Projeto (desenvolvimento)
## Requisitos
- Docker/Docker Compose
- Node 12.14.1

## Primeiros passos
- Clone o repositório:
```
git clone https://github.com/jrmmendes/desafio-concrete-api.git
```
- Entre na pasta criada (`desafio-concrete-api`) e instale as dependências do projeto:
```
yarn install
```
Execute os testes:
```
yarn test
```
> O comando `yarn tdd` executa os testes de maneira contínua, utilizando a flag `--watch`

Suba o container do banco de dados (pode levar algumas minutos):
```
docker-compose up -d
```
> Caso opte por não utilizar o `mongo-express`, substitua o comando anterior por:
> ```
> docker-compose up -d mongo
> ```

Algumas variáveis de ambiente são utilizadas (e.g. credenciais do banco de dados e tipo de ambiente). Neste projeto, o [`node-convict`](https://github.com/mozilla/node-convict) é utilizado e as mesmas podem ser modificadas no arquivo `src/config/settings`.

# Build
Para dar build, utilize o seguinte script:
```
yarn build
```
A aplicação pode ser iniciada utilizado:
```
yarn start
```
