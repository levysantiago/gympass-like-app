import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333),
})

const validation = envSchema.safeParse(process.env)

if (validation.success === false) {
  console.error(validation.error.format())
  throw new Error('Invalid environment variables!')
}

export const env = validation.data
