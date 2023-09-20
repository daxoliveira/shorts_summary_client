const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", () => {
  event.preventDefault()
  const videoUrl = input.value

  if (!videoUrl.includes("shorts")) {
    return (content.textContent = "This video is not a short")
  }

  const [_, params] = videoUrl.split("/shorts/")
  const [videoId] = params.split("?si")

  content.textContent = "Getting text from audio..."
})
