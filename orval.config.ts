import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: {
      target: './swagger.json',
    },

    output: {
      mode: 'tags-split',

      target: './src/api/generated/index.ts',

      schemas: './src/api/generated/models',

      client: 'react-query',

      httpClient: 'axios',

      indexFiles: true,

      clean: true,

      override: {
        mutator: {
          path: './src/api/custom-instance.ts',
          name: 'customInstance',
        },
      },
    },
  },
});
