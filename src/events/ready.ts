import { event } from "jellycommands"
import { info } from "../logger/info.js"

export default event({
  name: "ready",
  run: () => info("What Keystone bot started!"),
})
