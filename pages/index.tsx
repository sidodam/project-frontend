// @ts-nocheck
import type { NextPage } from 'next'
import Head from 'next/head'
import HeaderNavbar from '../componenets/HeaderNavbar'
import HomeHeader from '../componenets/HomeHeader'
import ImageWithTitle from '../componenets/ImageWithTitle'
import TextReview from '../componenets/TextReview'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Footer from '../componenets/Footer'
import Featured from '../componenets/Featured'
import MailList from '../componenets/MailList'
import useFetch from '../componenets/hooks/useFetch'
import Loader from '../componenets/Loader'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const { data, loading, error } = useFetch(
    'https://weak-lime-sea-urchin-cap.cyclic.app/api/hotels?featured=true',
  ) as { data: any[]; loading: boolean; error: boolean }
  const { data: datos } = useFetch('https://weak-lime-sea-urchin-cap.cyclic.app/api/contactus')

  const { data: nextDest } = useFetch('https://weak-lime-sea-urchin-cap.cyclic.app/api/hotels')

  const router = useRouter()

  //create handleclick function to handle click event and push route

  const x = Math.floor(Math.random() * nextDest.length)

  const handleClick = () => {
    router.push(
      `/discover?destination=${nextDest[x]?.city}&adult=2&room=1&startDate=%5B"2022-06-18"%5D&endDate=%5B"2022-06-19"%5D`,
    )
  }

  return (
    <div className="">
      <Head>
        <title>Spain Travels</title>
      </Head>
      <HeaderNavbar></HeaderNavbar>
      <HomeHeader></HomeHeader>
      <div className="mt-20   md:mx-20 mx-5">
        {/* <p className="text-[1.5rem] font-bold">Top destination</p>
        <p className="w-1/2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,
          tempora.
        </p> */}

        <Featured></Featured>

        <div className="flex flex-col mt-20">
          <p className="text-[2rem] font-bold mb-10 ">
            Browse by proprety type
          </p>

          <ImageWithTitle></ImageWithTitle>
        </div>

        <MailList />
        {loading ? (
          <Loader />
        ) : (
          <>
            <p className="text-[2rem] font-bold mt-20 mb-10 ">
              Homes guests love
            </p>

            <div className="flex md:flex-row flex-col  justify-around gap-4">
              {data &&
                data.map((item, index) => {
                  return (
                    <div key={index} className="flex flex-col gap-4">
                      <img
                        src={item.photos[0]}
                        alt="header image"
                        className="rounded-xl  max-h-[200px]"
                      />
                      <span>{item.name}</span>
                      <span>{item.city}</span>
                      <span>Starting from {item.cheapest}</span>
                      {item.rating && (
                        <div className="flex justify-between items-center">
                          <span className="bg-blue-900 text-white p-2 rounded-md">
                            {item.rating}
                          </span>
                          <span>Excellent</span>
                        </div>
                      )}
                    </div>
                  )
                })}
            </div>
          </>
        )}
      </div>
      <div>
        <div className="flex md:flex-row flex-col gap-8 md:mx-20 mx-5"></div>

        <div className="m-auto text-center md:w-1/2 mt-10">
          <p className="text-[2rem] font-bold">What travellers say about us?</p>

          <p className="mb-10">
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Rem.
          </p>
        </div>

        <div className="md:grid md:grid-cols-3 mx-5 gap-4">
          {datos &&
            datos.map((item, index) => {
              return (
                <div key={index}>
                  <TextReview text={item.textarea} author={item.fullname} />
                </div>
              )
            })}
        </div>

        <div className="flex md:flex-row flex-col justify-between md:mx-20 mx-5 mt-40 gap-10  ">
          <div className="md:w-1/2">
            <p className="text-[2rem] font-bold mb-5">
              Pick your next destination
            </p>

            <p className="uppercase font-bold ">{nextDest[x]?.city}</p>
            <p className="uppercase font-semibold italic my-2">
              {nextDest[x]?.name}
            </p>
            <p>{nextDest[x]?.desc}</p>

            <button
              onClick={handleClick}
              className=" border py-3 px-20 w-full sm:w-auto bg-blue-600 text-white font-semibold mt-10 rounded-lg hover:bg-blue-700 hover:text-white"
            >
              More Destinations
            </button>
          </div>

          <div className="md:w-1/2 self-end  ">
            <Carousel showStatus={false}>
              <div>
                <img src={nextDest[x]?.photos[0]} className="max-h-[450px]" />
              </div>
              <div>
                <img src={nextDest[x]?.photos[1]} className="max-h-[450px]" />
              </div>
              <div>
                <img src={nextDest[x]?.photos[2]} className="max-h-[450px]" />
              </div>
            </Carousel>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <Footer />
      </div>
    </div>
  )
}

export default Home
