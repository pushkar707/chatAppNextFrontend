import { z } from "zod"

import { publicProcedure, router } from "./trpc"
import prisma from "@/app/lib/prismaClient"

export const appRouter = router({
  searchUser : publicProcedure
    .input(z.string()) // username
    .query(async ({input}) => {
      const users = await prisma.user.findMany({
        where: {
          username:{
            search: input.toLowerCase()
          }
        },
        select: {
          id:true,
          username:true,
          name:true,
          imageUrl:true,
        }
      })

      if(users){
        return {result:true, users}
      }
    }),
    
  setData: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      // Here you would update a database using the
      // input string passed into the procedure
      console.log(input)
      return input
    }),
})
// This type will be used as a reference later...
export type AppRouter = typeof appRouter