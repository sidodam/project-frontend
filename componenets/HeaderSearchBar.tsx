// @ts-nocheck
import React from 'react'
import { MdPlace } from 'react-icons/md'
import { BsFillCalendarEventFill } from 'react-icons/bs'
import { BsFillPeopleFill } from 'react-icons/bs'
import { useState } from 'react'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import { format } from 'date-fns'
import Link from 'next/link'
import Router from "next/router";
import { useMediaQuery } from '@mantine/hooks'

import { searchState } from '../componenets/searchState'
import { useRecoilState } from 'recoil'



function HeaderSearchBar() {

  const [openDate, setOpenDate] = useState(false)
  const [destination, setDestination] = useState('')
  const [openOptions, setOpenOptions] = useState(false)
  const tablet = useMediaQuery('(max-width: 900px)')
  const [options, setOptions] = useState({
    adult: 2,
    room: 1,
  })

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date().setDate(new Date().getDate() + 1),
      key: 'selection',
    },
  ])

  const handleOption = (name: keyof typeof options, operation: string) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === 'i' ? options[name] + 1 : options[name] - 1,
      }
    })
  }


  const [obj, setObj] = useRecoilState(searchState)
  const handleClick = () => {

    Router.push({
      pathname: '/discover',
      query: {

        destination, adult: JSON.stringify(options.adult), room: JSON.stringify(options.room), startDate: JSON.stringify(date.map((d) => format(d.startDate, 'yyyy-MM-dd'))),
        endDate: JSON.stringify(date.map((d) => format(d.endDate, 'yyyy-MM-dd')))
      }
    }
    )

    setObj({
      destination: destination,

      adult: options.adult,
      room: options.room,
      startDate: date.map((d) => format(d.startDate, 'yyyy-MM-dd')),
      endDate: date.map((d) => format(d.endDate, 'yyyy-MM-dd'))
    })
  }




  return (
    <div className={`flex  xl:flex-row flex-col  gap-4  `}>
      <div className="flex  items-center border-2 bg-white  rounded-lg  p-2  ">
        <MdPlace></MdPlace>
        <input
          type="text "
          placeholder=" Where are you going?"
          className="bg-white  rounded-lg ml-1"
          onChange={(e) => setDestination(e.target.value.toLowerCase())}
        />
      </div>

      <div className="relative">
        <span
          onClick={() => setOpenDate(!openDate)}
          className="bg-white border-2  p-2 flex items-center gap-2 rounded-lg  whitespace-nowrap  cursor-pointer"
        >
          <BsFillCalendarEventFill></BsFillCalendarEventFill>
          {`${format(date[0].startDate, 'MM/dd/yyyy')} to ${format(
            date[0].endDate,
            'MM/dd/yyyy',
          )} `}
        </span>

        {openDate && (
          <div >
            <DateRange
              editableDateInputs={true}
              onChange={(item: any) => setDate([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={date}
              className="absolute"
              minDate={new Date()}

            />
          </div>
        )}
      </div>
      <div className="relative">
        <span
          onClick={() => setOpenOptions(!openOptions)}
          className="bg-white   p-2 px-3 border-2 flex gap-2 items-center whitespace-nowrap  rounded-lg  cursor-pointer"
        >
          <BsFillPeopleFill></BsFillPeopleFill>
          {`${options.adult} adults . ${options.room} rooms`}
        </span>
        {openOptions && (
          <div

            className="flex flex-col shadow-lg  p-2 absolute top-14  bg-white  items-center "
          >
            <div className="   text-gray-500 p-2   flex  gap-3 shadow-sm">
              <span>Adult</span>
              <button
                disabled={options.adult === 1}
                className="border-2 border-blue-400 w-7 font-bold"
                onClick={() => handleOption('adult', 'd')}
              >
                -
              </button>
              <span className="">{options.adult}</span>
              <button
                className="border-2 border-blue-400 w-7 font-bold"
                onClick={() => handleOption('adult', 'i')}
              >
                +
              </button>
            </div>

            <div className="   text-gray-500 p-2   flex  gap-3 ">
              <span>Room</span>
              <button
                disabled={options.room === 1}
                className="border-2 border-blue-400 w-7 font-bold"
                onClick={() => handleOption('room', 'd')}
              >
                -
              </button>
              <span className="">{options.room}</span>
              <button
                className="border-2  border-blue-400 w-7 font-bold"
                onClick={() => handleOption('room', 'i')}
              >
                +
              </button>
            </div>
          </div>
        )}
      </div>

      <button
        className="bg-white p-2 rounded-lg text-blue-600 "
        onClick={() => handleClick()}
      >
        Search
      </button>
    </div>
  )
}

export default HeaderSearchBar
