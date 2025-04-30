# eCommerce Application 🛍️🌐

Welcome to our eCommerce application! This platform replicates real-world shopping experiences in a digital environment 🏪. It's a comprehensive online shopping portal that provides an interactive and seamless experience to users. From product discovery to checkout, the application ensures a smooth journey for the user, enhancing their engagement and boosting their purchasing confidence 🚀.

Users can browse through a vast range of products 📚👗👟, view detailed descriptions, add their favorite items to the basket 🛒, and proceed to checkout 💳. It includes features such as user registration and login 📝🔐, product search 🔍, product categorization, and sorting to make the shopping experience more streamlined and convenient.

An important aspect of our application is that it's responsive 📲, ensuring it looks great on various devices with a minimum resolution of 390px. This feature makes the shopping experience enjoyable, irrespective of the device users prefer.

Key pages in the application include:

- Login and Registration pages 🖥️
- Main page 🏠
- Catalog Product page 📋
- Detailed Product page 🔎
- User Profile page 👤
- Basket page 🛒
- About Us page 🙋‍♂️🙋‍♀️

The application is powered by CommerceTools 🌐, a leading provider of commerce solutions for B2C and B2B enterprises. CommerceTools offers a cloud-native, microservices-based commerce platform that enables brands to create unique and engaging digital commerce experiences.

# Repository Setup

1. Clone the repository
2. Navigate to the repository that was cloned
3. Install packages: `npm ci`
4. Generate types: `npm run typecheck` (once)
5. Prepare hooks: `npm run prepare:husky` (once)
6. To make a commit, run: `npx cz`

## Available commands

- `npm run dev` - run DEV-server
- `npm run prod` - build a production bundle
- `npm run preview` - preview production build
- `npm run typecheck` - generate react router types

---

- `npm run commit` - same as `npx cz` (commit compose helper)
- `npm run prepare:husky` - init GIT hooks

---

- `npm run format` - run prettier and save results
- `npm run ci:format` - run prettier w/o saving

---

- `npm run lint` - run eslint w/o saving
- `npm run lint:fix` - run eslint and save results

---

- `npm run stylelint` - run stylelint w/o saving
- `npm run stylelint:fix` - run stylelint and save results

---

- `npm run test` - run vitest tests
