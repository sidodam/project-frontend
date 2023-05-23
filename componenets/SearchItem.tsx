import Image from 'next/image'
import Router from "next/router";
interface SearchItemProps {
    item: any,
    searchclicked: boolean
}



function SearchItem({ item, searchclicked }: SearchItemProps) {

    const handleClick = () => {

        Router.push({
            pathname: '/hotel',
            query: {

                id: item._id,
            }
        })

    }
    let maxLength = 200;
    let result = item.desc.substring(0, maxLength) + '...';


    return (
        <div className="p-2 flex md:flex-row flex-col justify-between gap-4 border border-slate-500 rounded-md">
            <div className="md:w-1/4 ">
                <img src={item.photos[0]} width={500} height={525} className="h-[85%]  rounded-md" alt="header image" />
            </div>

            <div className="flex md:flex-row flex-col gap-4 md:w-3/4 justify-between">
                <div className="flex flex-col md:w-2/3  gap-4">
                    <p className="font-bold text-3xl my-5">{item.name}</p>
                    <div className='flex gap-10'>
                        <span className="text-xl font-semibold">{item.distance}m from center</span>
                        <span className="text-xl font-semibold">Free airport taxi</span>
                    </div>

                    <span className="text-xl font-bold">
                        Metro access
                    </span>
                    <span className="text-xl"> {result} </span>
                    <span className="text-xl text-green-800 font-bold">
                        Free cancellation
                    </span>
                    <span className="text-xl text-green-600">
                        cancel later , reserve today!{' '}
                    </span>
                </div>

                <div className="flex flex-col md:w-1/3 my-5 justify-end  md:gap-0  md:text-center ">
                    {item.rating && (
                        <div className="flex   md:flex-col  md:gap-0  gap-4  items-end">

                            <div className="h-9 w-9 p-2 bg-blue-900 text-white font-bold flex justify-center items-center rounded-sm">
                                {item.rating}
                            </div>
                            <p className="text-lg font-semibold te mt-2">Excellent</p>
                        </div>
                    )}

                    <div className="font-bold text-2xl md:mr-2 mt-2 text-right">
                        € {item.cheapest}
                    </div>
                    <div className="text-right md:my-4 my-5 text-lg md:mr-2">
                        Include taxes
                    </div>

                    <button disabled={!searchclicked} onClick={handleClick} className="bg-blue-700 text-lg md:mr-0 -mr-2 p-2 rounded-lg">
                        See availibilty
                    </button>

                </div>
            </div>

            <div className="diDetails"></div>
        </div>
    )
}

export default SearchItem
