import { defineConfig } from '@prisma/internals'

export default defineConfig({
  datasources: {
    db: {
      url: 'file:./prisma/dev.db',
    },
  },
})
