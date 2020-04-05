<h1 align="center">
<br>
  <img src="src/assets/logo.png" alt="Fastfeet" width="300">
<br>
<br>
</h1>

<p align="center">API desenvolvida para gerenciamento e cadastro de entregadores de uma transportadora</p>

<p align="center">
  <a href="http://makeapullrequest.com">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="License MIT">
  </a>
</p>

<hr />

## Features

Uma API do Node.js criada com o Express e todas as ferramentas e práticas recomendadas mais recentes em desenvolvimento!

- ⚡ **Express** — Framework para Node.js
- 💾 **Sequelize** — ORM, dialeto SQL para Node.js
- ⌨️ **Yup** - Validação de esquema de objeto
- 💖 **Lint** — ESlint/Prettier/Editor Config - Ferramentas para organização e padronização de códigos

## Dependencies

- [Node.js](https://nodejs.org/en/) 8.0.0 ou >
- [Yarn](https://yarnpkg.com/pt-BR/docs/install)
- [Docker](https://www.docker.com/)

## Prerequisites

Para executar este servidor, você precisará de um contêiner em execução na sua máquina.

Para fazer isso, você precisará executar os seguintes comandos:

- `docker run --name some-postgres -e POSTGRES_PASSWORD=docker -p 5433:5432 -d postgres`;

_Lembre-se: Se você reiniciar sua máquina, será necessário iniciar novamente o servidor com `docker start <container_id>` ._

## Getting started

Para a integração visual acesse as pastas com o projeto Web `https://github.com/ArmandoAAJ/FastFeet/tree/master/web`
e mobile ANDROID `https://github.com/ArmandoAAJ/FastFeet/tree/master/appfastfeet`

1. Clone este repositório
2. Execute `yarn` para instalar as dependências.<br />
3. Execute `yarn dev` para execução do servidor.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
