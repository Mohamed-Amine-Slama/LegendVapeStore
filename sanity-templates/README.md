# Sanity Studio Templates

These files are **templates** for the separate Sanity studio project — they do **not** run from inside this Next.js repo. The studio is its own Sanity project created with `sanity init` (per `../DataHandling.md`).

## Quick setup

1. **Create the studio** in a separate directory (NOT inside `vape-store-vitrine/`):
   ```bash
   cd ~/projects
   npm install -g sanity@latest
   sanity init
   ```
   When prompted, name the project `legend-vape-store` and the output folder `legend-vape-store-studio`. Pick the "Clean project with no predefined schemas" template.

2. **Copy the template files** from this directory into the new studio:
   ```
   cp sanity-templates/sanity.config.ts          ../legend-vape-store-studio/sanity.config.ts
   cp -r sanity-templates/schemaTypes/*          ../legend-vape-store-studio/schemaTypes/
   ```
   Then edit the `projectId` in the new `sanity.config.ts` — replace `YOUR_PROJECT_ID` with the value Sanity printed during `sanity init`.

3. **Run the studio locally** to verify:
   ```bash
   cd ../legend-vape-store-studio
   npm install
   npm run dev   # opens http://localhost:3333
   ```

4. **Deploy the studio** so your team can edit content from the web:
   ```bash
   sanity deploy
   # → choose hostname like "legend-vape-store"
   # → studio is now live at https://legend-vape-store.sanity.studio
   ```

5. **Connect the Next.js site** by setting env vars:
   ```bash
   # In vape-store-vitrine/.env.local
   NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxxx
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
   Restart `npm run dev` — the shop now pulls products from Sanity instead of the mock catalogue. If you don't set these, the site keeps using the mock.

## Files

| File | Purpose |
|------|---------|
| `sanity.config.ts` | Studio configuration — project ID, sidebar, plugins. Replace `YOUR_PROJECT_ID`. |
| `schemaTypes/index.ts` | Registers all schemas with Sanity. |
| `schemaTypes/category.ts` | The 4 categories (Pods, Puffs, Capsules, Liquid). |
| `schemaTypes/flavor.ts` | Flavor profiles — name, family, color, prop image. |
| `schemaTypes/product.ts` | Main product schema with all fields the shop uses. |

Field-name and brand-value naming **must** match `lib/sanity-types.ts` and `lib/products.ts` in this repo (the mapper depends on them). If you change something here, update the mapper.
