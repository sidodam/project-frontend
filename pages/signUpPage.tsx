
import Hotel from '../componenets/Hotel'
import ContactForm from '../componenets/ContactForm'
import Navigator from '../componenets/Navigator'
import MailList from '../componenets/MailList'
import Footer from '../componenets/Footer'
import { motion } from 'framer-motion'
import SignupForm from '../componenets/SignupForm'
import { BsTag } from 'react-icons/bs'
import { useRouter } from 'next/router'


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




function signUpPage() {




    return <div >
        <Navigator NavigatorHeader={<>


            <div className='flex md:flex-row   flex-col  items-center  md:gap-40  m-10'>

                <SignupForm></SignupForm>
                <div className='   order-1  '>
                    <FadeInWhenVisible >
                        <img src='signup.svg' className='h-[65vh] md:w-[50vw] -mt-[50px] md:mt-0' />

                    </FadeInWhenVisible>
                </div>

            </div>


        </>} ></Navigator>







    </div>
}

export default signUpPage