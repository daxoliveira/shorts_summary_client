import cors from "cors"
import express from "express"

const app = express()
app.use(cors())

app.get("/summary", (request, response) => {
  response.send("This is just a test!")
})

app.listen(3333, () => console.log("Server running on port 3333!"))
