import React from 'react'
import Image from 'next/image'
import useFetch from '../componenets/hooks/useFetch'
import Loader from '../componenets/Loader'


function ImageWithTitle() {


  const { data, loading, error } = useFetch("http://localhost:8800/api/hotels/countByType") as { data: { type: string, count: number }[], loading: boolean, error: boolean }


  const images = [

    "/villas.jpg",
    "/hotels.jpg",
    "/apartments.jpg",
    "/resorts.jpg",
    "/cabins.jpg"

  ]


  return (
    <div className='flex md:flex-row flex-col gap-4'>


      {loading ? <Loader /> : <>

        {
          data && data.map((item, index) => {

            return (
              <div key={index}>
                <Image
                  src={images[index]}
                  alt="header image"
                  height={300}
                  width={500}
                  className="rounded-xl"
                />
                <div className="flex justify-between mt-5">
                  <h1 className="text-[1.8rem] mb-2 capitalize">{item.type}</h1>
                </div>
                <h2 className="text-[1rem] mb-1">{`${item.count} ${item.type == "hotel" ? "hotels" : item.type}`}</h2>



              </div>
            )

          }
          )}

      </>}
    </div>


  )


}

export default ImageWithTitle

// if rate is equal or biggger than 8 then stringifiedRate is Excellent
// if rate is equal or biggger than 7 then stringifiedRate is Good
// if rate is equal or biggger than 6 then stringifiedRate is Average
