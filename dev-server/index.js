import express from 'express'
const app = express()
import { registerRoutes } from './routes'

registerRoutes(app);

app.get('/', (req, res) => res.send("hello"))
app.listen(3000, () => console.log("listen on 3000"))