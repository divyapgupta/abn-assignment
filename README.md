
# ABN AMRO Frontend Developer Assignment

An interactive and responsive Vue 3 application that displays TV shows categorized by genre and sorted by rating. Users can browse genres, search shows by name, and view detailed information for each show.

---

## 🚀 Project Overview

This project is a solution to the ABN AMRO Frontend Developer Assignment. The goal is to demonstrate clean, reusable code using modern frontend best practices while building a visually appealing and intuitive user interface with Vue.js.

Key features include:
- Fetching and displaying TV shows from the [TVMaze API](https://www.tvmaze.com/api)
- Grouping shows by genre (e.g. Drama, Comedy, Sports, etc.)
- Sorting shows by rating within each genre
- Detailed view for individual shows
- Search functionality
- Responsive and mobile-friendly design

---

## 🏗️ Architecture & Design Decisions

- **Framework**: [Vue 3](https://vuejs.org/) with Composition API — chosen due to its modern reactivity system and ABN AMRO's preference.
- **Routing**: [Vue Router 4](https://router.vuejs.org/) for managing page navigation.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) — chosen for rapid UI development and responsive design capabilities.
- **Tooling**: [Vite](https://vitejs.dev/) for fast builds and hot module replacement.
- **Type Safety**: TypeScript is used throughout the codebase to catch errors early and enhance developer experience.
- **Linting & Formatting**: ESLint and Prettier with `lint-staged` + Husky for consistent code quality during development.
- **Testing**: [Vitest](https://vitest.dev/) and [@testing-library/vue](https://testing-library.com/docs/vue-testing-library/intro) are used to write unit tests for key components and utilities.
- **E2E**: Todo: Cypress or Playwright can be used for end-to-end testing in the future.

---

## 📦 Tech Stack

| Category       | Tool/Library                 |
|----------------|------------------------------|
| UI Framework   | Vue 3                        |
| Router         | Vue Router                   |
| Styling        | Tailwind CSS                 |
| Build Tool     | Vite                         |
| Linting        | ESLint, Prettier             |
| Testing        | Vitest, Testing Library Vue  |
| Language       | TypeScript                   |

---

## 🛠️ Installation & Running the App

### ✅ Prerequisites

- **Node.js**: `>=v22.16.0`
- **NPM**: `>=11.4.1`

> You can use [nvm](https://github.com/nvm-sh/nvm) to easily manage Node versions.

### 📥 Installation

```bash
git clone https://github.com/divyapgupta/abn-assignment.git
cd abn-assignment
npm install
```

### 🚧 Development

```bash
npm run dev
```

### 🔍 Preview Production Build

```bash
npm run preview
```
Open your browser and navigate to [http://localhost:4173](http://localhost:4173) to view the application.

### 🧪 Run Tests

```bash
npm run test
```

### 🧹 Lint and Format

```bash
npm run format
```

---

## 📁 Project Structure (simplified)

```
.
├── src/
│   ├── api/              # Api calls to fetch and search shows and its details
│   ├── components/       # Reusable UI components structured by atomic design principles
│   ├── features/         # Featurs-specific components and logic like Home, Search and ShowDetail
│   ├── pages/            # Application pages for routing like Home, Search, ShowDetail
│   ├── router/           # Vue Router setup
│   ├── types/            # TypeScript interfaces/types
│   └── styles/           # Global styles and Tailwind configuration
├── public/
├── vite.config.ts
└── package.json
```

---

## 🧪 Testing

The application includes unit tests for key components and logic using **Vitest** and **@testing-library/vue**. Test files are colocated with components or in a `tests/` folder.

Run all tests:

```bash
npm run test
```

---

## 📝 Notes & Considerations

- Since the TVMaze API does not provide direct genre-filtered endpoints, genres are extracted and grouped client-side from the full shows dataset.
- Shows are sorted by rating within each genre section to highlight the top-rated content.
- Search feature queries shows by name using the `/search/shows?q=` endpoint.
- Designed to be minimal yet visually appealing, ensuring clarity and usability across devices.

---

## 🧑‍💻 Author

**Divya Prakash Gupta**  

---

## 📜 License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).
