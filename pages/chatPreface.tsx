import Navigator from '../componenets/Navigator'

import Button from '@mui/material/Button'

import ImageAndText from '../componenets/ImageAndText'

import { useMediaQuery } from '@mantine/hooks'

function chatPreface() {
  const tablet = useMediaQuery('(max-width: 900px)')
  return (
    <div>
      <Navigator
        NavigatorHeader={
          <>
            <div className="mt-20">
              <ImageAndText
                image="/introduction.svg"
                title="Introducing SpainTime!"
                className=" md:!flex-row-reverse"
              >
                SpainTime is a real-time stand-alone beta Chat app that is
                simple and completely free!
              </ImageAndText>
            </div>

            <div className="mt-20">
              <ImageAndText image="/group.svg" title="Who is SpainTime for?">
                SpainTime is for everyone! whether you already have Spain
                Travels account or not , all you need is a Google account and
                you're good to go!
              </ImageAndText>
            </div>
          </>
        }
      />

      <div className="mt-20">
        <ImageAndText
          image="/question.svg"
          title="Why SpainTime?"
          className=" md:!flex-row-reverse"
        >
          SpainTime is a multi-platform app that works on all devices. it offers
          you a blazing fast and secure messaging experience.
        </ImageAndText>
      </div>

      <div className="my-20 text-center">
        <Button variant="contained" href="/chat" className="px-24">
          Start chatting now!
        </Button>
      </div>
    </div>
  )
}

export default chatPreface
