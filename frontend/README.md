# RefuConnect — Frontend

This folder contains the React + Vite frontend for RefuConnect (UI for an animal shelter).

## Quick start

Requirements

- Node.js 18+ and npm

Install and run (from the `frontend` folder):

```bash
cd frontend
npm install
npm run dev        # start Vite dev server (opens on the printed URL, e.g. http://localhost:5178/)
```

Build for production

```bash
npm run build
npm run preview    # preview the production build locally
```

Lint

```bash
npm run lint
```

## Demo credentials

- Admin: `admin@refuge.com` / `admin123` → redirects to `/admin`
- Visitor: `visitor@refuge.com` / `visitor` → redirects to `/user`

## Useful paths

- Public pages: `/`, `/animaux`, `/animaux/:id`, `/connexion`
- Admin: `/admin`, `/admin/animaux`, `/admin/adoptions`
- User: `/user`, `/user/profile`

Key files

- `src/context/AuthContext.jsx` — authentication state (login/logout, localStorage)
- `src/context/AnimalsContext.jsx` — animals state, `getAnimalById(id)` used by `AnimalDetail`
- `src/pages/public/AnimalDetail.jsx` — animal detail view
- `src/components/features/animals/AnimalGrid.jsx` — grid view
- `src/components/features/animals/AnimalCard.jsx` — card with "Voir le profil" button

## Notes & troubleshooting

- Animal IDs in `src/data/mockAnimals.js` are strings (e.g. `"1"`). The app tolerates string/number ids, but if you see "Animal introuvable" check the URL id matches an entry in `mockAnimals.js`.
- Quick-demo login buttons were removed; demo credentials are shown as a hint on the login page.
- Navbar displays role-aware items (Admin vs Mon espace) after login.

## Commit & push (example)

```bash
cd frontend
git add .
git commit -m "chore(frontend): recent fixes and README"
git push
```

If you want, I can create the commit and push for you.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
