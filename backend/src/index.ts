import { Hono } from 'hono'
import { initPrisma } from './middlewares/initPrisma'
import { PrismaClient } from '@prisma/client/extension'
import { router } from './routes/router'

const app = new Hono<{
  Bindings: {
    DTABASE_URL: string
  },
  Variables: {
    prisma: PrismaClient
  }
}>()

app.use('*', initPrisma)
app.route('/api/v1', router)


export default app