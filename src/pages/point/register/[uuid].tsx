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


  return (
    <>
      <form onSubmit={handleSubmit(({ name }) => registerPointMutation.mutate({ uuid, name, longitude: location.longitude, latitude: location.latitude }))}>
        <fieldset>
          <legend>Point</legend>

          <label htmlFor="uuid">Uuid</label>
          <output id="uuid">{uuid}</output>

          <label htmlFor="name">name</label>
          <input id="name" type="text" {...register('name', { required: true })} />
        </fieldset>

        <fieldset>
          <legend>Location</legend>

          <label htmlFor="lat">lat</label>
          <output id="lat">{location.latitude}</output>

          <label htmlFor="long">Long</label>
          <output id="long">{location.longitude}</output>
        </fieldset>

        <input type="submit" value="Register" />
      </form>
    </>
  )
}
