import { event } from "jellycommands"
import * as logger from "../logger.js"

export default event({
  name: "ready",
  run: () => logger.info("What Keystone bot started!"),
})
