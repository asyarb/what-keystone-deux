import prisma from "@prisma/client"
import { IS_DEV } from "../env.js"

export const db = new prisma.PrismaClient({
  log: IS_DEV ? ["query", "info", "warn", "error"] : ["info", "warn", "error"],
})
