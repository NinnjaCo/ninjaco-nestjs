<img src="README_ASSETS/README_HEADER.svg"/>

<div align="center">

> The project is a web application that allows kids to learn and practice programming using visual blocks with a user-friendly editor

**[PROJECT PHILOSOPHY](#project-philosophy) • [ER DIAGRAM](#er-diagram) • [SYSTEM ARCHITECTURE](#sys-arch) • [TECH STACK](#tech-stack) • [API DOCS](#api-docs) • [HOW TO RUN](#how-to-run)**
</div>

<a id="project-philosophy"></a>
<br><br>
<img src="README_ASSETS/README_PHILO.svg"/>

> Programming is a skill that is becoming more and more important in our society. However, it is not easy to learn and practice programming. This project aims to make programming more accessible to kids by providing a visual block-based editor that allows them to learn and practice programming in a fun and engaging way.
>
> The project main goal is to empower young kids with programming knowledge and skills. The project is designed to be fun, engaging, and easy to use. The project is also designed to be a tool for teachers to help them teach programming to kids.

<a id="er-diagram"></a>
<br><br>
<img src="README_ASSETS/README_ER.svg"/>

| ER Diagram Non transparent <> Download 4k [here](https://github.com/NinnjaCo/ninjaco-nestjs/raw/dev/README_ASSETS/er_4k_non_trans.png)|
| :---: |
| <img src="README_ASSETS/er_4k_non_trans.png"/> |
| ER Diagram Transparent <> Download 4k [here](https://github.com/NinnjaCo/ninjaco-nestjs/raw/dev/README_ASSETS/er_4k_trans.png)|
| <img src="README_ASSETS/er_4k_trans.png"/>

<a id="sys-arch"></a>
<br><br>
<img src="README_ASSETS/README_ARCH.svg"/>

| System Architecture <> Download SVG [here](https://github.com/NinnjaCo/ninjaco-nestjs/raw/dev/README_ASSETS/er_4k_non_trans.png)|
| :---: |
| <img src="README_ASSETS/system_architecture_non_trans.svg"/> |

<a id="tech-stack"></a>
<br><br>
<img src="README_ASSETS/README_STACK.svg"/>

Here's a brief high-level overview of the tech stack the NinjaCo app uses:

- This project uses the [NextJs](https://nextjs.org/) library. Nextjs is a React framework that allows you to build server-side rendered React apps. It is a framework that allows you to build React apps with a lot of features out of the box, such as routing, server-side rendering, and more.
- For styling, the app uses [Tailwind CSS](https://tailwindcss.com/), a utility-first CSS framework for rapidly building custom user interfaces.
- For authentication, the app uses [NextAuth](https://next-auth.js.org/), an open source authentication library for Next.js.

- For testing, the app uses [Jest](https://jestjs.io/), a JavaScript testing framework. Jest is a complete and easy to set-up JavaScript testing solution. It works with projects using: Babel, TypeScript, Node, React, Angular, Vue and more!

- For linting, the app uses [ESLint](https://eslint.org/), a pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript. ESLint is built into most text editors and you can run ESLint as part of your continuous integration pipeline.

- For persistent storage, the app uses [MongoDB](https://www.mongodb.com/), a general purpose, document-based, distributed database built for modern application developers and for the cloud era.

- For backend API, the app uses [NestJS](https://nestjs.com/), a progressive Node.js framework for building efficient, reliable and scalable server-side applications.

- For image storage, the app uses [Minio](https://min.io/), an open source object storage server compatible with Amazon S3 APIs. Minio is a high performance distributed object storage server, designed for large-scale private cloud infrastructure.

- For code formatting, the app uses [Prettier](https://prettier.io/), an opinionated code formatter. Prettier is an opinionated code formatter with support for JavaScript, TypeScript, CSS, JSON, GraphQL, Markdown, and more. It removes all original styling and ensures that all outputted code conforms to a consistent style.

<br><br>

<div style="display:grid; grid-template-columns: repeat(3, 0.4fr); justify-items: center; align-items: center;">

<img src="https://img.shields.io/badge/TypeScript-v4.9.5-3178c6?style=for-the-badge&logo=typescript" width="150px" />

<img src="https://img.shields.io/badge/React-v18.2.0-61DAFB?style=for-the-badge&logo=react" width="150px" />

<img src="https://img.shields.io/badge/Next.js-v13.2.3-black?style=for-the-badge&logo=next-dot-js" width="150px" />

<img src="https://img.shields.io/badge/Jest-v29.5.0-C21325?style=for-the-badge&logo=jest" width="150px" />

<img src="https://img.shields.io/badge/Prettier-v2.8.4-F7B93E?style=for-the-badge&logo=prettier" width="150px" />

<img src="https://img.shields.io/badge/ESLint-v7.27.0-4B3263?style=for-the-badge&logo=eslint" width="150px" />

<img src="https://img.shields.io/badge/Axios-v0.21.1-5A2A82?style=for-the-badge&logo=axios" width="150px" />

<img src="https://img.shields.io/badge/Next--Auth-v4.20.1-000000?style=for-the-badge&logo=next-dot-js" width="150px" />

<img src="https://img.shields.io/badge/Tailwind%20CSS-v3.2.7-38B2AC?style=for-the-badge&logo=tailwind-css" width="150px" />
</div>

<br />
<hr>

<a id="how-to-run"></a>
<a id="api-docs"></a>
<br><br>
<img src="README_ASSETS/README_RUN.svg"/>

<h2>API Documentation Online</h2>
<a href="https://ninjaco-nestjs.herokuapp.com/api/doc">Link To Documentation</a>

<br>

> To get a local copy up and running follow these simple example steps.

### Prerequisites 📝

- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)

<!-- add icons to  below text -->
### Setup 🚀

1. Clone the repository 🎉

```bash
git clone https://github.com/NinnjaCo/ninjaco-nextjs.git
```

2. Install dependencies ✨

```bash
npm install
```

3. Copy the `.env.example` file and rename it to `.env`

```bash
cp .env.example .env
```

> Edit the `.env` file and add your own values.

4. Run the server

> You should have docker and docker-compose installed.
> Use docker-compose to run the app.

```bash
docker-compose up
```

> This will run:

- MongoDB

- MongoDB Express

- NestJs App

- Minio

- MailDev
