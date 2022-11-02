import { useRouter } from "next/router"
import { useForm } from 'react-hook-form';
import useGeolocation from "react-hook-geolocation";
import { trpc } from "../../../utils/trpc";

export default function RegistePoint() {
  const router = useRouter();

  const { uuid } = router.query as { uuid: string };

  const registerPointMutation = trpc.point.register.useMutation();

  const location = useGeolocation();
  const { register, handleSubmit } = useForm();


  if (registerPointMutation.isSuccess) {
    return 'finsihed'
  }

  if (registerPointMutation.isError) {
    return <pre>{JSON.stringify(registerPointMutation.error, null, 2)}</pre>
  }

  return (
    <>
      <h1>Register point</h1>

      <form onSubmit={handleSubmit(({ name }) => registerPointMutation.mutate({ uuid, name, longitude: location.longitude, latitude: location.latitude }))}>
        <fieldset>
          <legend>Point</legend>

          <label htmlFor="uuid">Uuid</label>
          <pre id="uuid">{uuid}</pre>

          <label htmlFor="name">name</label>
          <input id="name" type="text" {...register('name', { required: true })} />
        </fieldset>

        <fieldset>
          <legend>Location</legend>

          <label htmlFor="lat">lat</label>
          <pre id="lat">{location.latitude}</pre>

          <label htmlFor="long">Long</label>
          <pre id="long">{location.longitude}</pre>
        </fieldset>

        <input type="submit" value="Register" />
      </form>
    </>
  )
}
