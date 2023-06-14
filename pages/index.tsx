// @ts-nocheck
import type { NextPage } from "next";
import Head from "next/head";
import HeaderNavbar from "../componenets/HeaderNavbar";
import HomeHeader from "../componenets/HomeHeader";
import ImageWithTitle from "../componenets/ImageWithTitle";
import TextReview from "../componenets/TextReview";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Footer from "../componenets/Footer";
import Featured from "../componenets/Featured";
import MailList from "../componenets/MailList";
import useFetch from "../componenets/hooks/useFetch";
import Loader from "../componenets/Loader";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../componenets/AuthContext";
import dynamic from "next/dynamic";

const JoyRideWithNoSSR = dynamic(() => import("react-joyride"), {
  ssr: false,
});

var steps = [
  {
    target: ".home",
    content: "The main page of Spaion Travels.",
  },
  {
    target: ".about",
    content: "A brief introduction of who we are and our statistics data.",
  },

  {
    target: ".discover",
    content: "Advanced search engine to help you pick your next travelling destination.",
  },
  {
    target: ".contact",
    content: "Had a great time ? leave us a message and tell us how it went.",
  },

  {
    target: ".delete",
    content: "To delete your account and all your data.",
  },

  {
    target: ".out",
    content: "Sign out button",
  },

  {
    target: ".signin",
    content: "sign in button",
  },

  {
    target: ".reg",
    content: "Create a new account.",
  },

  {
    target: "#dist",
    content: "A quick search to find a destination of your interest.",
  },
  {
    target: "#date",
    content: "Select start and end date of your travel.",
  },

  {
    target: "#ppl",
    content: "Select How many People are going.",
  },

  {
    target: "#search",
    content: "Give it a go!.",
  },

  {
    target: ".feat",
    content: "featured destinations this summer.",
  },

  {
    target: ".prop-types",
    content: "types of properties we currently have.",
  },

  {
    target: ".node-mailer",
    content: "insert email here to get all new deals and discounts.",
  },

  {
    target: ".loved-homes",
    content: "highest rated Homes by our customers.",
  },

  {
    target: ".opinions",
    content: "check out what our customers have to say.",
  },

  {
    target: ".suggested",
    content: "suggested destinations to check out.",
  },

  {
    target: ".useful-links",
    content: "Download our Covid and our privacy policy.",
  },

  {
    target: ".go-top",
    content: "Go to top page.",
  },
];

const Home: NextPage = () => {
  const { data, loading, error } = useFetch("https://weak-lime-sea-urchin-cap.cyclic.app/api/hotels?featured=true") as {
    data: any[];
    loading: boolean;
    error: boolean;
  };
  const { data: datos } = useFetch("https://weak-lime-sea-urchin-cap.cyclic.app/api/contactus");

  const { data: nextDest } = useFetch("https://weak-lime-sea-urchin-cap.cyclic.app/api/hotels");

  const router = useRouter();

  const { user } = useContext(AuthContext) as any;

  //create handleclick function to handle click event and push route

  const x = Math.floor(Math.random() * nextDest.length);

  const handleClick = () => {
    router.push(
      `/discover?destination=${nextDest[x]?.city}&adult=2&room=1&startDate=%5B"2023-06-18"%5D&endDate=%5B"2023-06-19"%5D`
    );
  };

  return (
    <>
      {user ? (
        <>
          {
            <JoyRideWithNoSSR
              showProgress
              styles={{
                options: {
                  backgroundColor: "#eee",

                  primaryColor: "rgb(59 130 246)",
                  width: 400,
                },
              }}
              steps={steps}
              continuous
              scrollOffset={200}
            />
          }
        </>
      ) : (
        <></>
      )}

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

          <div className="prop-types flex flex-col mt-20">
            <p className="text-[2rem] font-bold mb-10 ">Browse by proprety type</p>

            <ImageWithTitle></ImageWithTitle>
          </div>

          <MailList class="node-mailer" />
          {loading ? (
            <Loader />
          ) : (
            <>
              <p className=" text-[2rem] font-bold mt-20 mb-10 ">Homes guests love</p>

              <div className="loved-homes flex md:flex-row flex-col  justify-around gap-4">
                {data &&
                  data.map((item, index) => {
                    return (
                      <div key={index} className="flex flex-col gap-4">
                        <img src={item.photos[0]} alt="header image" className="rounded-xl  max-h-[200px]" />
                        <span>{item.name}</span>
                        <span>{item.city}</span>
                        <span>Starting from {item.cheapest}</span>
                        {item.rating && (
                          <div className="flex justify-between items-center">
                            <span className="bg-blue-900 text-white p-2 rounded-md">{item.rating}</span>
                            <span>Excellent</span>
                          </div>
                        )}
                      </div>
                    );
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
              Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem.
            </p>
          </div>

          <div className="opinions md:grid md:grid-cols-3 mx-5 gap-4">
            {datos &&
              datos.map((item, index) => {
                return (
                  <div key={index}>
                    <TextReview text={item.textarea} author={item.fullname} />
                  </div>
                );
              })}
          </div>

          <div className="suggested flex md:flex-row flex-col justify-between md:mx-20 mx-5 mt-40 gap-10  ">
            <div className="md:w-1/2">
              <p className="text-[2rem] font-bold mb-5">Pick your next destination</p>

              <p className="uppercase font-bold ">{nextDest[x]?.city}</p>
              <p className="uppercase font-semibold italic my-2">{nextDest[x]?.name}</p>
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
    </>
  );
};

export default Home;
