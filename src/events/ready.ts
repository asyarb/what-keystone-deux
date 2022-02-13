import { event } from "jellycommands"

export default event({
  name: "ready",
  run: () => console.info("bot online"),
})
