import express, {json} from 'express'
import { readJson } from './utils.js'
import { webRouter } from './routes/websites.js'
import { drouter } from './routes/default.js'
import { corsMiddleware } from './middlewares/cors.js'
const data = readJson('./data.json')


try {
  const app = express()
  app.use(json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')


app.use('/websites', webRouter)
app.use('/', drouter)

const port = process.env.PORT ?? 2222;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
  
} catch (error) {
  console.error(error)
}

