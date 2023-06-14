import Image from "next/image";
import { useMediaQuery } from "@mantine/hooks";
import useFetch from "./hooks/useFetch";
import Loader from "./Loader";
interface FeaturedProps {
  className?: string;
}
function Featured({ className }: FeaturedProps) {
  const tablet = useMediaQuery("(max-width: 900px)");
  const { data, loading, error } = useFetch(
    "https://weak-lime-sea-urchin-cap.cyclic.app/api/hotels/countByCity?cities=berlin,japan,france"
  );

  return (
    <div className=" feat rounded-xl justify-center flex md:flex-row flex-col gap-4 ">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className=" relative">
            <Image src="/berlin.jpg" alt="" height={450} width={500} className="rounded-xl " />
            <div className=" absolute z-50 top-4 pl-2 ">
              <h1 className={`text-white ${tablet ? "text-4xl" : ""}`}>Berlin</h1>
              <p className="text-white font-bold text-2xl">{data[0]} propreties</p>
            </div>
          </div>

          <div className="relative">
            <Image src="/japan.jpg" alt="" height={450} width={500} className="rounded-xl " />
            <div className=" absolute z-50 top-4 pl-2 ">
              <h1 className={`text-white feat-dist ${tablet ? "text-4xl" : ""}`}>Japan</h1>
              <p className="feat-prop text-white font-bold text-2xl">{data[1]} propreties</p>
            </div>
          </div>

          <div className="relative">
            <Image src="/france.jpg" alt="" height={450} width={500} className="rounded-xl " />
            <div className="absolute z-50 top-4 pl-2 ">
              <h1 className={`text-white ${tablet ? "text-4xl" : ""}`}>France</h1>
              <p className="text-white font-bold text-2xl">{data[2]} propreties</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Featured;
