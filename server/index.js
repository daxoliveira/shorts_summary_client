import cors from "cors"
import express from "express"

import { download } from "./download.js"

const app = express()
app.use(cors())

app.get("/summary/:id", (request, response) => {
  download(request.params.id)

  response.json({ result: "Video was successfully downloaded!" })
})

app.listen(3333, () => console.log("Server running on port 3333!"))
