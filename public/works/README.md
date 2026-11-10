# Works

Drop your project images here (`.jpg`, `.png`, `.webp`, `.svg`).

Then update `src/lib/works.ts` so each entry points at the right file:

```ts
{ id: "01", title: "Project name", src: "/works/your-file.webp", alt: "Short description" }
```

The flip intro and Works page both read from that list.
