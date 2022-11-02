import { trpc } from "../../utils/trpc";


export default function Points() {
  const { data } = trpc.point.getAll.useQuery();

  return (
    <pre>{JSON.stringify(data)}</pre>
  );
}
