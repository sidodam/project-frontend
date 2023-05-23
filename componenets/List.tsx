// @ts-nocheck
import Navigator from './Navigator'
import { useState, useRef, useEffect } from 'react'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import { format } from 'date-fns'
import SearchItem from '../componenets/SearchItem'
import useFetch from '../componenets/hooks/useFetch'
import Loader from '../componenets/Loader'
import { searchState } from '../componenets/searchState'
import { useRecoilState } from 'recoil'

interface ListProps {
  destination: any
  startDate: any
  endDate: any
  adult: any
  room: any
}

function List({ destination, startDate, endDate, adult, room }: ListProps) {
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(0)
  const [dest, setDest] = useState(destination)
  const [roomNumber, setRoomNumber] = useState(room)
  const [adultNumber, setAdultNumber] = useState(adult)
  const [searchclicked, setSearchClick] = useState(true)

  const ref = useRef(null)

  const { data, loading, error, reFetch } = useFetch(
    `https://weak-lime-sea-urchin-cap.cyclic.app/api/hotels?city=${dest}&min=${min || 0}&max=${
      max || 9999
    }`,
  ) as { data: any[]; loading: boolean; error: boolean; reFetch: () => void }
  const [openDate, setOpenDate] = useState(false)

  const [date2, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date().setDate(new Date().getDate() + 1),
      key: 'selection',
    },
  ])

  const handleClick = () => {
    setSearchClick(false)
    setOpenDate(!openDate)

    let element = document.getElementById('activeDate')

    if (element)
      element.innerHTML = `${format(
        date2[0].startDate,
        'MM/dd/yyyy',
      )} to ${format(date2[0].endDate, 'MM/dd/yyyy')} `
  }

  const handleSearchClick = () => {
    setSearchClick(true)
    let el = document.getElementById('activeDate')
    setObj({
      destination: dest,
      startDate: el?.innerHTML.split('to')[0].trim(),
      endDate: el?.innerHTML.split('to')[1].trim(),
      room: roomNumber,
      adult: adultNumber,
    })

    reFetch()
  }

  const [obj, setObj] = useRecoilState(searchState)

  console.log(searchclicked)

  return (
    <div>
      <Navigator
        NavigatorHeader={
          <>
            <div className="bg-slate-400   m-auto    md:mx-10 rounded-lg mx-1 mb-10 md:mb-0 z-50 top-[6rem] p-3 ">
              <p className="font-bold text-xl text-slate-700  ">Search</p>
              <div className=" "></div>
              <div className="flex flex-col  ">
                <label className="mt-2 mb-1">Destination</label>

                <input
                  type="text"
                  className="pl-1 rounded-sm"
                  onChange={(e) => setDest(e.target.value)}
                  onClick={() => setSearchClick(false)}
                  placeholder={dest}
                />
              </div>

              <div className="flex flex-col ">
                <label className="mt-2 mb-1">Check-in Date</label>
                <span
                  className="pl-1 bg-white cursor-pointer rounded-sm"
                  id="activeDate"
                  onClick={handleClick}
                >
                  {` ${
                    startDate != undefined && endDate != undefined
                      ? `${startDate} to ${endDate}`
                      : `
        
        
        
        ${format(date2[0].startDate, 'MM/dd/yyyy')} to ${format(
                          date2[0].endDate,
                          'MM/dd/yyyy',
                        )}
        
        `
                  } `}
                </span>

                {openDate && (
                  <div>
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item: any) => setDate([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={date2}
                      minDate={new Date()}
                    />
                  </div>
                )}

                <label className=" mt-5 mb-4  text-lg font-semibold">
                  Options
                </label>

                <div className="flex flex-col md:grid md:grid-cols-2 gap-4 ">
                  <div className="flex justify-between">
                    <p>Min price (per night)</p>

                    <input
                      type="number"
                      onChange={(e) => setMin(Number(e.target.value))}
                      className="max-w-[70px] text-center rounded-sm"
                      min={1}
                    />
                  </div>

                  <div className="flex justify-between">
                    <p>Max price (per night)</p>

                    <input
                      type="number"
                      onChange={(e) => setMax(Number(e.target.value))}
                      className="max-w-[70px] text-center rounded-sm"
                      min={1}
                    />
                  </div>

                  <div className="flex justify-between">
                    <p>Adult</p>

                    <input
                      type="number"
                      className="max-w-[70px] text-center rounded-sm"
                      placeholder={adult}
                      min={1}
                      onChange={(e) => setAdultNumber(Number(e.target.value))}
                      onClick={() => setSearchClick(false)}
                    />
                  </div>

                  <div className="flex justify-between">
                    <p>Room</p>

                    <input
                      type="number"
                      className="max-w-[70px] text-center rounded-sm "
                      placeholder={room}
                      min={1}
                      onChange={(e) => setRoomNumber(Number(e.target.value))}
                      onClick={() => setSearchClick(false)}
                    />
                  </div>

                  <button
                    onClick={handleSearchClick}
                    className="bg-blue-500 md:hidden block  rounded-md"
                    ref={ref}
                  >
                    Search
                  </button>
                </div>
                <button
                  onClick={handleSearchClick}
                  className="bg-blue-500 mt-5 mx-5 py-2 md:block hidden rounded-md"
                >
                  Search
                </button>
              </div>
            </div>
          </>
        }
      />

      <div className=" flex mx-5  flex-col md:mt-10  -mt-10  ">
        <div className="flex   justify-center gap-4 md:w-fit md:mx-0 mx-5  rounded-lg    mt-[20px] "></div>

        <div className={`flex-col gap-4`}>
          {loading ? (
            <Loader />
          ) : (
            <>
              {data.map((item: any) => (
                <SearchItem
                  key={item._id}
                  item={item}
                  searchclicked={searchclicked}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default List
