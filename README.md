# <img src="https://github.com/merucoding/rsschool-cv/blob/rsschool-cv-html/img/shop-icon.svg" width="55"> eCommerce Application

Our single-page e-commerce application (SPA) is an online store designed to provide a simple, intuitive, and enjoyable shopping experience from the comfort of home. The application is fully responsive, allowing users to shop seamlessly whether they're on a computer or a mobile device. Powered by CommerceTools, a leading provider of commerce solutions for B2C and B2B enterprises. The application was developed by a team of three talented developers with the support and guidance of experienced mentors.

## Key pages in the application include:

🔸 **Login Page** - contain fields for entering a username and password. To successfully proceed to the main page, the fields must be filled in. </br>
🔸 **Registration Page** - for registering new users. It contains fields for entering a username, email, and password. After successful registration, the user is directed to the login page. </br>
🔸 **Main Page** - provides links to key pages like the Catalog Product Page, Detailed Product Page, User Profile Page, Basket Page, and About Us Page. </br>
🔸 **Catalog Product Page** - displays a list of products in a specific category. Each product is shown as an interactive card featuring an image and essential details. Clicking on a card provides detailed information about the product. </br>
🔸 **Detailed Product Page** - displays the product image, a detailed description, price, and available options. Users can add the product to their basket from this page. </br>
🔸 **User Profile Page** - shows personal information like name, date of birth, addresses, and allows users to edit these details. </br>
🔸 **Basket Page** - shows products added to the basket, lets users adjust quantities or remove items, displays the subtotal and total prices with a checkout option. </br>
🔸 **About Us Page** - introduces the development team, showing each member's contributions to the project, role, short bio, photo, GitHub link and RSSchool logo. </br>

## Project goals:

✔️ Enhance skills in collaborative development and project coordination through the use of Git for version control, GitHub for code collaboration and peer review, and Jira for managing workflows, sprint planning, and task tracking.</br>
✔️ Master the fundamental principles and concepts of React.</br>
✔️ Enhance and deepen expertise in TypeScript.</br>
✔️ Master and apply unit testing for verifying the functionality of an application.</br>
✔️ Write quality, efficient, and maintainable code that follows best development practices and maintains good readability.

## Technology stack:

- <img src="https://github.com/merucoding/rsschool-cv/blob/rsschool-cv-html/img/typescript.svg" width="20" height="20"> [Typescript](https://www.typescriptlang.org/) (language)
- <img src="https://github.com/merucoding/rsschool-cv/blob/rsschool-cv-html/img/react.svg" width="20" height="20"> [React](https://react.dev/) (library)
- <img src="https://github.com/merucoding/rsschool-cv/blob/rsschool-cv-html/img/react.svg" width="20" height="20"> [React Router](https://reactrouter.com/) (routing)
- [Commercetools API](https://commercetools.com/)
- [Redux](https://redux.js.org/) (library)
- <img src="https://github.com/merucoding/rsschool-cv/blob/rsschool-cv-html/img/vite.png" width="20" height="20"> [Vite](https://vite.dev/) (bundler)
- <img src="https://github.com/merucoding/rsschool-cv/blob/rsschool-cv-html/img/eslint.svg" width="20" height="20"> [ESLint](https://eslint.org/) (linter)
- <img src="https://github.com/merucoding/rsschool-cv/blob/rsschool-cv-html/img/prettier.png" width="20" height="20"> [Prettier](https://prettier.io/) (formatter)
- <img src="https://github.com/merucoding/rsschool-cv/blob/rsschool-cv-html/img/scss.svg" width="20" height="20"> [SCSS](https://sass-lang.com/) (CSS preprocessor)
- <img src="https://github.com/merucoding/rsschool-cv/blob/rsschool-cv-html/img/tailwind.svg" width="20" height="20"> [Tailwind](https://tailwindcss.com/) (CSS Framework)
- [shadcn/ui](https://ui.shadcn.com/) (component library)
- [Husky](https://typicode.github.io/husky/) (pre-commit, pre-push)
- [Stylelint](https://stylelint.io/) (linter for SCSS)
- [Commitlint](https://commitlint.js.org/) (for linting commit messages)

## Repository Setup:

1. Clone the repository
2. Navigate to the repository that was cloned
3. Install packages:

```
npm ci
```

4. Generate types (once):

```
npm run typecheck
```

5. Prepare hooks (once):

```
npm run prepare:husky
```

6. To make a commit:

```
npx cz
```

## Available scripts:

Run DEV-server:

```
npm run dev
```

Build a production bundle:

```
npm run prod
```

Generate React Router types:

```
npm run typecheck
```

Commit compose helper (same as `npx cz`):

```
npm run commit
```

Init GIT hooks:

```
npm run prepare:husky
```

#### Prettier

Run prettier and save results:

```
npm run format
```

Run prettier w/o saving:

```
npm run ci:format
```

#### Eslint

Run eslint w/o saving

```
npm run lint
```

Run eslint and save results

```
npm run lint:fix
```

#### Stylelint

Run stylelint w/o saving

```
npm run stylelint
```

Run stylelint and save results

```
npm run stylelint:fix
```

#### Vitest

run vitest tests

```
npm run test
```

## CommerceTools API
> Add a .env file to the project’s root folder containing the following environment variables:
```
VITE_CTP_PROJECT_KEY=project-key
VITE_CTP_CLIENT_SECRET=client-secret
VITE_CTP_CLIENT_ID=client-id
VITE_CTP_AUTH_URL=auth-url
VITE_CTP_API_URL=api-url
VITE_CTP_SCOPES=scopes
```