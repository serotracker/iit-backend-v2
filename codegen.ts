import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3000/api/graphql",
  generates: {
    "src/api/graphql-types/__generated__/graphql-types.ts": {
      plugins: ["typescript", "typescript-resolvers"]
    },
    "./graphql.schema.json": {
      plugins: ["introspection"]
    }
  }
};

export default config;
