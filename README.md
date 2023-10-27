# ExpressJS

[![Node.js Lint & Build](https://github.com/arf1e/team-5-express/actions/workflows/node.yml/badge.svg?branch=main)](https://github.com/arf1e/team-5-express/actions/workflows/node.yml)

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

In this project we use Express.js to implement a basic Library API.

## Table of content

- [Getting started](#getting-started)
- [Team 5](#team-5)
- [CRUD Operations](#crud-operations)
- [Error Handling and Logging](#error-handling-and-logging)

## Getting started

- Clone this project using `git clone https://github.com/arf1e/team-5-express.git` command;
- Install the project dependencies with `pnpm install`;
- Setup the database with `pnpm init-db` command;
- Run the project in dev mode with `pnpm dev`.

## Team 5

- [Quang Tri Cao](https://github.com/quangtricao) - Genres
- [Elizaveta Pashkovskaya](https://github.com/elis1386) - Authors
- [Thuy Hien Tran Nguyen](https://github.com/JuliaThTranNguyen) - Users
- [Egor Bulgakov](https://github.com/arf1e) - Books

## CRUD Operations

Prefix the following with `/api/v1/`:

**Books:**

1. Create a new (book or product) `POST /books`
2. Get a list of all (book or product) `GET /books`
3. Get a book by ISBN `GET /books/{isbn}`
4. Update (book or product) information `PUT /books/{isbn}`
5. Delete a (book or product) `DELETE /books/{isbn}`

**Genres:**

1. Create a new genre `POST /genres`
2. Get a list of all genres `GET /genres`
3. Get a genre by ID `GET /genres/{genreId}`
4. Update genre information `PUT /genres/{genreId}`
5. Delete a genre `DELETE /genres/{genreId}`

**Authors:**

1. Create a new author `POST /authors`
2. Get a list of all authors `GET /authors`
3. Get an author by ID `GET /authors/{authorId}`
4. Update author information `PUT /authors/{authorId}`
5. Delete an author `DELETE /authors/${authorId}`

**Users:**

1. Create a new user `POST /users`
2. Get a list of all users `GET /users`
3. Get a user by ID `GET /users/{userId}`
4. Update user information `PUT /users/{userId}`
5. Delete a user `DELETE /users/{userId}`

## Error Handling and Logging

- [x] Errors for 4xx and 5xx code statuses
- [x] Global Error

**Logging middlware:**

- [x] Log every incoming request (We use morgan);
- [x] Monitor status of your application. when entities are created ie, user is created.
