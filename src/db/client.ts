import prisma from "@prisma/client"
import { IS_DEV } from "../env.js"
import { info } from "../logger/info.js"

info(IS_DEV)

export const db = new prisma.PrismaClient({
  log: IS_DEV ? ["query", "info", "warn", "error"] : ["info", "warn", "error"],
})
