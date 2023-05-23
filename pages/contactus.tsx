import React from 'react'
import ContactForm from '../componenets/ContactForm'
import Navigator from '../componenets/Navigator'
import MailList from '../componenets/MailList'
import Footer from '../componenets/Footer'
import { motion } from 'framer-motion'

function FadeInWhenVisible({ children }: any) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.2 }}
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0 },
      }}
    >
      {children}
    </motion.div>
  )
}

function Contactus() {
  return (
    <div>
      <Navigator
        NavigatorHeader={
          <>
            <div className="flex md:flex-row flex-col justify-between items-center mt-20 gap-10 mx-10">
              <ContactForm FormClassName="md:w-1/2 self-baseline  order-1 " />
              <div className="md:w-1/2  order-1  ">
                <FadeInWhenVisible>
                  <img src="contactus.svg" />
                </FadeInWhenVisible>
              </div>
            </div>
          </>
        }
      ></Navigator>

      <div className="md:m-20">
        <MailList></MailList>
      </div>

      <Footer></Footer>

      {/* <Hotel></Hotel> */}
    </div>
  )
}

export default Contactus
