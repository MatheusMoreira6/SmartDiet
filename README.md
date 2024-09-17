# SmartDiet

## Descrição do Projeto

O **SmartDiet** é um sistema desenvolvido para otimizar o gerenciamento de pacientes de nutricionistas. Ele resolve a carência de sistemas especializados ao permitir cadastro de pacientes, recomendação de dietas personalizadas, comunicação direta com os pacientes via chat seguro, e acompanhamento do progresso com gráficos. Com funcionalidades como agendamento de consultas, notificações automáticas por e-mail e ferramentas de planejamento de refeições, o SmartDiet facilita o trabalho diário dos nutricionistas.

## Tecnologias Utilizadas

- **Laravel** (Backend)
- **React** (Frontend)
- **Bootstrap 5.3.3** (Interface Responsiva)
- **PostgreSQL** (Banco de Dados)

## Requisitos

- **PHP** (>= 7.4)
- **Composer**
- **Node.js** (>= 14.x)
- **PostgreSQL**

## Instalação

Siga os passos abaixo para configurar e rodar o projeto localmente.

### Passo 1: Clonar o Repositório

```bash
git clone https://github.com/MatheusMoreira6/SmartDiet.git
cd SmartDiet
```

### Passo 2: Instalar Dependências

- Instale as dependências do PHP usando o Composer:
  ```bash
  composer install
  ```

- Instale as dependências do Node.js:
  ```bash
  npm install
  ```

### Passo 3: Configurar o Banco de Dados

1. Crie um banco de dados no PostgreSQL.
2. Renomeie o arquivo `.env.example` para `.env` e configure as credenciais de acesso ao banco de dados:
   
   ```bash
   DB_CONNECTION=pgsql
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_DATABASE=nome_do_banco_de_dados
   DB_USERNAME=seu_usuario
   DB_PASSWORD=sua_senha
   ```

3. Execute as migrações do banco de dados:
   ```bash
   php artisan migrate
   ```

### Passo 4: Executar o Projeto

Inicie o servidor do Laravel:

```bash
php artisan serve
```

Inicie o servidor de desenvolvimento do React:

```bash
npm run dev
```

Acesse o sistema no seu navegador em `http://localhost:8000`.

## Desenvolvedores

- **Danilo Silva de Lima**
  - CGM: 802.245
- **Matheus Moreira Mendes**
  - CGM: 802.238

## Licença

Este projeto é desenvolvido para fins acadêmicos no **Centro Universitário da Grande Dourados**.
