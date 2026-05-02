# Sanity seed

`seed.ndjson` mirrors the 12-item mock catalogue from
`constants/shop.ts` (4 categories + 12 flavors + 12 products), ready to
import into the `production` dataset of project `gk5aolof`.

## Import

```bash
cd ../legend-vape-store-studio
npx sanity dataset import ../vape-store-vitrine/sanity-seed/seed.ndjson production --replace
```

The `--replace` flag overwrites existing docs with the same `_id`.

## What gets imported

- `category-pods`, `category-puffs`, `category-capsules`, `category-liquid`
- `flavor-strawberry-mint`, `flavor-cookies-cream`, `flavor-dark-chocolate`,
  `flavor-iced-mint`, `flavor-vanilla-tobacco`, `flavor-watermelon-ice`,
  `flavor-caffeine-boost`, `flavor-pure-mint`, `flavor-mango-chill`,
  `flavor-nordic-berry`, `flavor-espresso-crema`, `flavor-caramel-tobacco`
- `product-p001` through `product-p012`

## Caveats

- **Images are NOT included.** The schema marks `mainImage` as required,
  so the studio will flag each product as invalid until you upload an
  image. (You can still publish — just open each product, drag a PNG into
  the Main Product Image field.)
- The mapper in `lib/products.ts` falls back to the placeholder
  `/products/device-refill.png` when a Sanity product has no image, so
  the shop keeps rendering even mid-migration.

## Reset / wipe

If you need to start over:

```bash
npx sanity dataset import seed.ndjson production --replace --missing
```

Or delete everything in the dataset:

```bash
npx sanity documents delete '*[_type in ["product","flavor","category"]]'
```
