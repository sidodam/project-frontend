import Hotel from '../componenets/Hotel'
import Navigator from '../componenets/Navigator'
import { useRouter } from 'next/router'
import { searchState } from '../componenets/searchState'
import { useRecoilValue } from 'recoil'

function hotel() {
    const router = useRouter()


    const {
        query: { id },
    } = router

    const props = {
        id
    }

    const obj = useRecoilValue(searchState);


    const daysBetween = (date1: string, date2: string) => {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        const diffTime = Math.abs(d2.getTime() - d1.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }


    return (
        <div>
            <Navigator
                NavigatorHeader={
                    <>


                        <Hotel id={id} daysBetween={daysBetween(obj.startDate, obj.endDate)} room={obj.room} ></Hotel>
                    </>
                }
            />
        </div>
    )
}

export default hotel
