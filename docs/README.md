# Unstrip Log wiki

VitePress site for the mod. Bark types, item names, recipes, the bark burn time and item textures are read from the mod itself, so regenerate the mod's data before building when it changes.

```bash
./gradlew :neoforge:runData   # from the repository root, when mod data changed
cd docs
npm install
npm run dev                   # syncs data, then serves http://localhost:5173
npm run build                 # syncs data, then builds to .vitepress/dist
```

`npm run sync` (run automatically by `dev` and `build`) writes `.vitepress/data/data.json`, which is git-ignored.

No textures are bundled. Vanilla items and blocks load from `https://storage.googleapis.com/coolerpromc/textures/minecraft/`, and the mod's item textures from `https://storage.googleapis.com/coolerpromc/textures/unstriplog/` (1024x1024, uploaded with the mod-texture-uploader skill). When you add or change a texture in the mod, upload it there too; otherwise its icon shows initials.

Pushes to the repository's default branch publish the site to GitHub Pages through `.github/workflows/docs.yml`.
