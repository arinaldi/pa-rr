# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

---

### Generate Supabase types

```bash
 supabase gen types typescript --db-url postgres://postgres:[YOUR-PASSWORD]@db.[YOUR-DB-ID].supabase.co:5432/postgres > ./utils/db-types.ts
```

```bash
 supabase gen types typescript --project-id [PROJECT-ID] >> ./utils/db-types.ts
```

---

[Notion avatar maker](https://notion-avatar.vercel.app/)
