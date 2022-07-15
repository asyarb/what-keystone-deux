import prisma from "@prisma/client"
import { DEV } from "../env.js"

export const db = new prisma.PrismaClient({
  log: DEV ? ["query", "info", "warn", "error"] : ["info", "warn", "error"],
  errorFormat: "pretty",
})
