import { z } from 'zod';
import { router, publicProcedure } from '../trpc';


const newPoint = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
})

export const pointsRouter = router({
  get: publicProcedure
    .input(z.object({ uuid: z.string().uuid() }))
    .query(({ ctx, input }) => 
      ctx.prisma.point.findFirst({ where: { uuid: input.uuid }})
    ),

  getAll: publicProcedure
    .query(async ({ ctx }) => {
      return await ctx.prisma.point.findMany();
    }),

  register: publicProcedure
    .input(newPoint)
    .mutation(({ ctx, input }) =>
      ctx.prisma.point.create({ data: input })
    )
});
