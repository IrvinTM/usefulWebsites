import {createRequire} from 'node:module';
import express from 'express'
import { readJson } from './utils.js'
import { webRouter } from './routes/websites.js'
import { drouter } from './routes/default.js'
import { corsMiddleware } from './middlewares/cors.js'
const data = readJson('./data.json')


const app = express()
app.disable('x-powered-by')
app.use(express.json())
app.use(corsMiddleware("http://localhost:3000"))

app.use('/websites', webRouter)
app.use('/', drouter)

const port = process.env.PORT ?? 2222;
//comment

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
