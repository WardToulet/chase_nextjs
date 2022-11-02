import { router } from "../trpc";

import { pointsRouter } from './points.router'

export const appRouter = router({
  point: pointsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
