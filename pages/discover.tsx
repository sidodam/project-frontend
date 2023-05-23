import Navigator from '../componenets/Navigator'
import List from '../componenets/List'

import { useRouter } from 'next/router';



function Discover() {

  const router = useRouter();


  const {
    query: { destination, adult, room, startDate, endDate },

  } = router;

  const props = {
    destination, adult, room, startDate, endDate

  }



  return (
    <>
      <div>

        <List destination={destination} adult={adult} room={room} startDate={startDate?.slice(2, startDate.length - 2)} endDate={endDate?.slice(2, endDate.length - 2)} ></List>
      </div>

    </>
  )
}

export default Discover
