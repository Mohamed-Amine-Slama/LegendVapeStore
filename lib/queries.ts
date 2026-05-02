/**
 * GROQ queries used by the shop. Field shape matches the Sanity schema in
 * `sanity-templates/schemaTypes/product.ts`.
 *
 * Every query projects only the fields the frontend actually consumes —
 * keeps payloads small and easy to type.
 */

export const ALL_PRODUCTS_QUERY = /* groq */ `
  *[_type == "product"] | order(featured desc, publishedAt desc) {
    _id,
    name,
    "slug": slug.current,
    price,
    compareAtPrice,
    badge,
    featured,
    inStock,
    nicotineStrength,
    caffeinated,
    volume,
    puffCount,
    brand,
    shortDescription,
    cardBackground,
    publishedAt,
    mainImage,
    "category": category->{ title, "slug": slug.current },
    "flavor": flavor->{
      name,
      family,
      color,
      propImage
    }
  }
`;

export const PRODUCTS_BY_CATEGORY_QUERY = /* groq */ `
  *[_type == "product" && category->title == $category]
    | order(featured desc, publishedAt desc) {
    _id,
    name,
    "slug": slug.current,
    price,
    compareAtPrice,
    badge,
    featured,
    inStock,
    nicotineStrength,
    caffeinated,
    volume,
    puffCount,
    brand,
    shortDescription,
    cardBackground,
    publishedAt,
    mainImage,
    "category": category->{ title, "slug": slug.current },
    "flavor": flavor->{ name, family, color, propImage }
  }
`;

export const FEATURED_PRODUCTS_QUERY = /* groq */ `
  *[_type == "product" && featured == true] | order(publishedAt desc) [0...6] {
    _id,
    name,
    "slug": slug.current,
    price,
    mainImage,
    cardBackground,
    "category": category->{ title },
    "flavor": flavor->{ name, family, color, propImage }
  }
`;

export const SINGLE_PRODUCT_QUERY = /* groq */ `
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    price,
    compareAtPrice,
    badge,
    inStock,
    stockCount,
    nicotineStrength,
    caffeinated,
    volume,
    puffCount,
    brand,
    shortDescription,
    ingredients,
    mainImage,
    galleryImages,
    cardBackground,
    publishedAt,
    "category": category->{ title, "slug": slug.current },
    "flavor": flavor->{ name, family, color, propImage }
  }
`;

export const ALL_CATEGORIES_QUERY = /* groq */ `
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    icon
  }
`;

export const ALL_FLAVORS_QUERY = /* groq */ `
  *[_type == "flavor"] | order(name asc) {
    _id,
    name,
    family,
    color,
    propImage
  }
`;
