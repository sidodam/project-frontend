import React from 'react'
import { MdPlace } from 'react-icons/md'
import Navigator from './Navigator'
import ImageAndText from './ImageAndText'

import Reserve from '../componenets/Reserve'
import Footer from './Footer'
import { useState } from 'react'

import { AiOutlineArrowLeft } from 'react-icons/ai'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { DynamicImage } from '../componenets/DynamicImage'
import useFetch from './hooks/useFetch'
import Loader from '../componenets/Loader'
import { AuthContext } from '../componenets/AuthContext'
import { useContext } from 'react'
import { useRouter } from 'next/router'

interface HotelProps {
  id: string | string[] | undefined
  daysBetween: number
  room: number
}

function Hotel({ id, daysBetween, room = 1 }: HotelProps) {
  const { data, loading, error } = useFetch(
    `http://localhost:8800/api/hotels/find/${id}`,
  ) as { data: any; loading: boolean; error: boolean }

  const { user } = useContext(AuthContext) as any

  const router = useRouter()

  const [slideNumber, setSlideNumber] = useState(0)
  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  // handle click if user exists

  const handleClick = () => {
    if (user) {
      setOpenModal(true)
    } else {
      router.push('/signInPage')
    }
  }

  function validNights(n: any) {
    return !isNaN(parseFloat(n)) && n > 0
  }

  return (
    <div className="">
      <Navigator
        NavigatorHeader={
          <>
            {/* <div>
                            <ImageAndText
                                image="/plans.svg"
                                title="Discvor your plans"
                                imageClassName="!w-fit"
                            >
                                Plan your trip with us and discover the best deals and offers
                            </ImageAndText>
                            <div></div>
                        </div> */}

            {loading ? (
              <Loader />
            ) : (
              <>
                <div className=" flex flex-col gap-2 mt-8 ml-5">
                  <div className="flex justify-between items-center md:mr-5">
                    <p className="text-2xl font-semibold">{data.name}</p>

                    {user ? (
                      <></>
                    ) : (
                      <>
                        <a href="signInPage">
                          <button className="bg-green-700 text-white p-2 rounded-md w-[12rem] text-lg ">
                            Reserve or Book Now!
                          </button>
                        </a>
                      </>
                    )}
                  </div>

                  <div className="flex gap-2 items-center">
                    <MdPlace></MdPlace>
                    <span>{data.address}</span>
                  </div>

                  <div className="text-blue-600 font-semibold">
                    Excellent location - {data.distance}m from the center
                  </div>

                  <div className="text-green-600 font-semibold">
                    Book a stay over {data.cheapest}€ ar the properety and get a
                    free airport taxi
                  </div>
                </div>
                <div className="flex mx-5 flex-col gap-2 justify-center">
                  {open && (
                    <div className=" ">
                      <AiOutlineCloseCircle></AiOutlineCloseCircle>
                      <AiOutlineArrowLeft></AiOutlineArrowLeft>
                      <div className="">
                        {/* <img src={photos[slideNumber]?.src} alt="" className=' w-full' /> */}
                        asdsa
                      </div>
                      <DynamicImage
                        src={data.photos[slideNumber]}
                      ></DynamicImage>
                      <AiOutlineArrowRight></AiOutlineArrowRight>
                    </div>
                  )}

                  <div>
                    <div className="md:grid md:grid-cols-3 flex flex-col gap-1">
                      {data.photos?.map((photo: any, index: any) => (
                        <div key={index}>
                          <DynamicImage src={data.photos[index]}></DynamicImage>
                        </div>
                      ))}
                    </div>
                    <div className="flex  md:flex-row flex-col  gap-9 my-10 ">
                      <div className="flex flex-col gap-4 md:w-3/4 ">
                        <p className="text-4xl font-semibold">{data.title}</p>
                        <p className="hotelDesc">{data.desc}</p>
                      </div>

                      {!isNaN(daysBetween) ? (
                        <>
                          <div className="flex  flex-col gap-4 md:w-1/4  bg-blue-400 p-4 rounded-md ">
                            <p className="text-2xl font-semibold text-slate-800">
                              Perfect for a {daysBetween}-night stay!
                            </p>
                            <span>
                              Located in the real heart of Krakow, this property
                              has an excellent location score of 9.8!
                            </span>
                            <h2 className="text-3xl">
                              <b>
                                €{' '}
                                {(
                                  Number(data.cheapest) *
                                  Number(daysBetween) *
                                  Number(room)
                                ).toString()}
                              </b>{' '}
                              ({daysBetween} nights)
                            </h2>
                            <button
                              onClick={handleClick}
                              className="bg-blue-700 m-2 p-2 rounded-md "
                            >
                              Reserve or Book Now!
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <p className="font-bold text-red-600 self-center">
                            Select a valid date before booking
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
                <div>
                  <Footer></Footer>
                </div>
              </>
            )}
          </>
        }
      />
    </div>
  )
}

export default Hotel
