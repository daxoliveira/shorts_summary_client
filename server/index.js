import cors from "cors"
import express from "express"

import { download } from "./download.js"
import { transcribe } from "./transcribe.js"
import { summarize } from "./summarize.js"
import { convert } from "./convert.js"

const app = express()
app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://shorts-summary-ai.netlify.app"
  )
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
})

app.get("/", (request, response) => {
  return response.json({ message: "Hello World!" })
})

app.get("/summary/:id", async (request, response) => {
  try {
    await download(request.params.id)
    const audioConverted = await convert()
    const result = await transcribe(audioConverted)

    return response.json({ result })
  } catch (error) {
    console.log(error)
    return response.json({ error })
  }
})

app.post("/summary", async (request, response) => {
  try {
    const result = await summarize(request.body.text)
    return response.json({ result })
  } catch (error) {
    console.log(error)
    return response.json({ error })
  }
})

app.listen(3333, () => console.log("Server running on port 3333!"))
