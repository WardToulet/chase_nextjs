import { useRouter } from 'next/router';
import { trpc } from '../../utils/trpc';

export async function getServerSideProps(context: { params: { uuid: string }}) {
  return {
    props: { uuid: context.params.uuid }
  }
}

export default function Point({ uuid }: { uuid: string }) {
  const router = useRouter();
  const pointQuery = trpc.point.get.useQuery({ uuid });
  // const captureMutation = trpc.point.capture({ uuid });
    
  if (pointQuery.isSuccess && !pointQuery.data) {
    router.replace(`/point/register/${uuid}`);
  }

  return <>
    <h1>{pointQuery.data?.name}</h1>
    <button>Capture</button>
  </>
}
