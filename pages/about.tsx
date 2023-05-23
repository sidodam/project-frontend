import Navigator from '../componenets/Navigator'
import AboutCards from '../componenets/AboutCards'
import Footer from '../componenets/Footer'
import Counter from '../componenets/Counter'
import ImageAndText from '../componenets/ImageAndText'
import Image from 'next/image'
import { useMediaQuery } from '@mantine/hooks'

function About() {
  const tablet = useMediaQuery('(max-width: 900px)')
  return (
    <div>
      <Navigator
        NavigatorHeader={
          <>
            <div>
              <ImageAndText
                image="/statistics2.svg"
                title="We've got the numbers"
                imageClassName="md:mt-10"
              >
                Call us nerds, we don’t mind. At Spain travels , we keep track
                of the data that is being going through our website and make it
                public.
              </ImageAndText>
              <div className="md:flex grid grid-cols-2 mt-10 text-center md:mt-10 gap-12 justify-around">
                <Counter
                  from={0}
                  to={2154561}
                  ClassName="text-3xl text-red-600  "
                  CounterText="App installed"
                />

                <Counter
                  from={0}
                  to={4234961}
                  ClassName="text-3xl text-red-600  "
                  CounterText="Notification sent"
                />

                <Counter
                  from={0}
                  to={513430}
                  ClassName="text-3xl text-red-600  "
                  CounterText="Euros saved"
                />

                <Counter
                  from={0}
                  to={10740}
                  ClassName="text-3xl text-red-600  "
                  CounterText="Planned trips"
                />
              </div>
            </div>
          </>
        }
      />

      <div className="mt-20">
        <ImageAndText
          image="/backedup.svg"
          title="We’re backed by some of the world’s leading investors"
          className=" md:!flex-row-reverse"
        >
          Spain travels has raised over €590M. Our investors believe in our
          product and support our mission to change the way the world travels.
        </ImageAndText>
      </div>

      <div className="my-10 md:block hidden">
        <Image
          width={1442}
          height={53}
          src="/companies.jpg"
          alt="companies logos"
        />
      </div>

      <div className="mt-20">
        <ImageAndText
          image="/twoTraveleres.svg"
          title="We’re backed by some of the world’s leading investors"
        >
          Take our hand and we will gurantee you the perfect place that suits
          your needs ,wherever and whenever you are.
        </ImageAndText>
      </div>

      <p className="text-3xl font-bold text-center mt-20 mx-5 text-slate-600">
        What are we offering you ?
      </p>

      <div className="flex md:flex-row flex-col my-20">
        <AboutCards
          image="/healthy.jpg"
          title="Stay healthy"
          subtitle="Full medical, dental, and vision benefits. Life insurance. Long and short-term disability plans. All on us"
        />

        <AboutCards
          image="/savey.jpg"
          title="Get paid"
          subtitle="Save up to 20% on your next trip with Spain travels. We’ll pay you up to €1,000 for each flight you book."
        />
        <AboutCards
          image="/vacation.jpg"
          title="Take off"
          subtitle="Enjoy every moment of your long awaited travel , you deserve it!"
        />
      </div>

      <div className="mt-8">
        <Footer />
      </div>
    </div>
  )
}

export default About
