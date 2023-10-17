import { server } from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  content.classList.add("placeholder")

  const videoUrl = input.value

  if (!videoUrl.includes("shorts")) {
    return (content.textContent = "This video is not a short")
  }

  const [_, params] = videoUrl.split("/shorts/")
  const [videoId] = params.split("?si")

  content.textContent = "Getting text from audio..."

  const transcription = await server.get("/summary/" + videoId)

  content.textContent = "Creating summary..."

  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })

  content.textContent = summary.data.result
  content.classList.remove("placeholder")
})
