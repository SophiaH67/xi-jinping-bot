import express, { Request, Response } from "express"
import cors from "cors"

const port = parseInt(process.env.PORT || '3000')

const app = express()

app.post('/check', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use(cors())

app.listen(port, () => console.log('yeah'))