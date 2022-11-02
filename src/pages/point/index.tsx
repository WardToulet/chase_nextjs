import { trpc } from "../../utils/trpc";


export default function Points() {
  const { data } = trpc.pointsRouter.getAll.useQuery();

  return (
    <pre>{JSON.stringify(data)}</pre>
  );
}
