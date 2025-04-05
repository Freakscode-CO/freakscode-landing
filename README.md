# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

# FreaksCode Landing Page

Este repositorio contiene el sitio web principal de FreaksCode, incluyendo la página de encuesta para el proyecto AURA.

## 🚀 Estructura del Proyecto

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── survey/
│   │       ├── SurveyForm.tsx
│   │       └── ... (otros componentes)
│   ├── data/
│   │   └── surveyDefinition.ts
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── aura/
│   │       └── survey.astro
│   └── utils/
│       └── api.ts
└── package.json
```

## 🧞 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto:

| Comando                   | Acción                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Instala dependencias                             |
| `npm run dev`             | Inicia servidor local en `localhost:4321`        |
| `npm run build`           | Compila el sitio para producción en `./dist/`    |
| `npm run preview`         | Vista previa de la build antes de desplegar      |

## 🔧 Configuración

### Variables de Entorno

Para que la aplicación funcione correctamente, necesitas configurar las variables de entorno:

1. Crea un archivo `.env` en la raíz del proyecto, basándote en `.env.example`
2. Establece las siguientes variables:

```
PUBLIC_SURVEY_ENDPOINT=https://oyvtmor2xd.execute-api.us-east-1.amazonaws.com/survey
```

Por defecto, la encuesta enviará datos al endpoint de AWS definido. Si necesitas usar un endpoint diferente, simplemente actualiza esta variable.

## 📊 Encuesta AURA

La encuesta para profesionales de la salud está implementada usando:

- React para los componentes interactivos
- TypeScript para seguridad de tipos
- Tailwind CSS para estilos
- Astro para el renderizado y estructura de la página

La encuesta envía los datos al endpoint configurado en AWS API Gateway, que procesa las respuestas y las almacena para análisis posterior.

### Personalización

Si necesitas personalizar la encuesta:

- Modifica `src/data/surveyDefinition.ts` para cambiar preguntas, opciones y estructura
- Ajusta los componentes en `src/components/survey/` para cambiar el diseño y la interactividad
- Personaliza los mensajes de agradecimiento en `src/data/thankYouMessages.ts`

## 👀 ¿Quieres aprender más?

Visita nuestra web: [freakscode.tech](https://freakscode.tech)
