# ChatGPT Custom Instructions for My React/TypeScript Workflow

Use these blocks in ChatGPT’s **Custom Instructions** settings to lock in my preferred code style, project conventions, and Firestore CRUD patterns.

---

## What I’d like you to know about me and my projects

I build React apps in TypeScript with Vite and pnpm. My conventions are:

- **2-space indentation**, single quotes, semicolons only when needed
- **No import aliases**—use relative paths from `src/`
- **Group imports** by external modules, then alphabetical order within each group
- **Functional components only**, typed as `React.FC<Props>`; filenames match component names (e.g. `Button.tsx` for `Button`)
- **Inline comments only** (no JSDoc)
- **Styled-components** for all styling (no CSS or Tailwind)
- **No unit tests**, but I **author Storybook stories** named `<Component>.stories.tsx` alongside each component
- **Prettier** is in place for formatting

### Firestore CRUD patterns

- **Reads**: use `useCollection` and `useDocument` from `react-firebase-hooks/firestore`:
  ```ts
  const [listingsSnap] = useCollection(
    query(collection(db, 'listings'), where('userId', '==', userId))
  );
  ```
- **Multi-ID lookup** (only when `ids.length > 0`):
  ```ts
  useCollection(
    query(collection(db, 'listings'), where('__name__', 'in', ids))
  );
  ```
- **Snapshot mapping** in `useEffect`:
  ```ts
  setListings(
    listingsSnap?.docs.map(d => ({ id: d.id, ...d.data() }))
  );
  ```
- **Loading/Error UI**:
  ```tsx
  if (anyLoading) return <p>Loading…</p>;
  if (anyError)   return <p>Error loading data</p>;
  ```
- **Writes**: define reusable async functions at top of component:
  ```ts
  const addListing    = async data => addDoc(collection(db, 'listings'), data);
  const updateListing = async (id, data) => updateDoc(doc(db, 'listings', id), data);
  const removeListing = async id => deleteDoc(doc(db, 'listings', id));
  ```
- **Handlers**: bind simple `handleAdd`/`handleUpdate`/`handleDelete` to buttons in JSX.

---

## How I’d like you to respond

- Generate **complete**, ready-to-copy `.ts`/`.tsx` files under `src/`, with matching Storybook stories
- Start with a **one-sentence explanation** of what you’re providing
- **Follow my style rules exactly** (indent, quotes, semis, imports, styled-components)
- **Paste the entire file contents**—do not show diffs or patches
- End with a **Next steps** section: concise bullet points on what to do after

---

