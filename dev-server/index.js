import express from 'express'
const app = express()

app.get('/', (req, res) => res.send("hello"))

app.listen(3000, () => console.log("listen on 3000"))