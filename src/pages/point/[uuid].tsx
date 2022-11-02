import { prisma } from '../../server/db/client';

export async function getServerSideProps(context: { params: { uuid: string }}) {
  const point = await prisma?.point.findFirst({ where: { uuid: context.params.uuid }});

  // If we try to capture a non existing point we redirect to the register endpoint
  if (!point) {
    return {
      redirect: {
        destination: `/point/register/${context.params.uuid}`
      },
    }
  }

  return {
    props: { uuid: context.params.uuid }
  }
}

export default function Point(uuid: string) {
  return <>{uuid}</>
}
