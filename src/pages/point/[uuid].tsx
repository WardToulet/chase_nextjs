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
    
  if (pointQuery.isSuccess && !pointQuery.data) {
    router.replace(`/point/register/${uuid}`);
  }

  return <>{ uuid }</>
}
