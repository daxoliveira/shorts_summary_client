import cors from "cors"
import express from "express"

import { download } from "./download.js"
import { transcribe } from "./transcribe.js"
import { summarize } from "./summarize.js"
import { convert } from "./convert.js"

const app = express()
app.use(express.json())
app.use(cors())

app.all("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  return res.json({ message: "Hello World!" })
  next()
})

// app.use((req, res, next) => {
//   res.setHeader(
//     "Access-Control-Allow-Origin",
//     "https://shorts-summary-ai.netlify.app"
//   )
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
//   )
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
//   )
//   res.setHeader("Access-Control-Allow-Credentials", true)
//   res.setHeader("Access-Control-Allow-Private-Network", true)
//   res.setHeader("Access-Control-Max-Age", 7200)

//   next()
// })

// app.use((req, res, next) => {
//   res.header(
//     "Access-Control-Allow-Origin",
//     "https://shorts-summary-ai.netlify.app"
//   )
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   )
//   next()
// })

// app.get("/", (request, response) => {
//   res.header("Access-Control-Allow-Origin", "*")
//   return response.json({ message: "Hello World!" })
// })

app.get("/summary/:id", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  try {
    await download(req.params.id)
    const audioConverted = await convert()
    const result = await transcribe(audioConverted)

    return res.json({ result })
  } catch (error) {
    console.log(error)
    return res.json({ error })
  }
})

app.post("/summary", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  try {
    const result = await summarize(req.body.text)
    return res.json({ result })
  } catch (error) {
    console.log(error)
    return res.json({ error })
  }
})

app.listen(3333, () => console.log("Server running on port 3333!"))
