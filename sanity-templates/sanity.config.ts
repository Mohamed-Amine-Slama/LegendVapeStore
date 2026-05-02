import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "legend-vape-store",
  title: "LEGEND VAPE STORE Admin",

  // ⚠️ Replace this with the project ID Sanity printed during `sanity init`,
  //   or look it up at https://sanity.io/manage.
  projectId: "YOUR_PROJECT_ID",
  dataset: "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("LEGEND VAPE STORE")
          .items([
            S.listItem()
              .title("🛒 Products")
              .child(S.documentTypeList("product").title("All Products")),
            S.listItem()
              .title("🏷️  Categories")
              .child(S.documentTypeList("category").title("Categories")),
            S.listItem()
              .title("🍓 Flavors")
              .child(S.documentTypeList("flavor").title("Flavors")),
          ]),
    }),
    // Lets you test GROQ queries inside the studio (Vision tab).
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
