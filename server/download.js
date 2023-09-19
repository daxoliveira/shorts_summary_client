import ytdl from "ytdl-core"
import fs from "fs"
import { info } from "console"

export const download = (videoId) => {
  const videoUrl = "https://www.youtube.com/shorts/" + videoId
  console.log("Downloading video..." + videoId)

  ytdl(videoUrl, { quality: "lowestaudio", filter: "audioonly" })
    .on("info", (info) => {
      const seconds = info.formats[0].approxDurationMs / 1000

      if (seconds > 60) {
        throw new Error("Video is too long. Max length is 60 seconds.")
      }
    })
    .on("end", () => {
      console.log("Download finished.")
    })
    .on("error", (error) => {
      console.log("Error: " + error)
    })
}
