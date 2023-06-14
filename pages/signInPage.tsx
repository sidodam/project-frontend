import Hotel from "../componenets/Hotel";
import ContactForm from "../componenets/ContactForm";
import Navigator from "../componenets/Navigator";
import MailList from "../componenets/MailList";
import Footer from "../componenets/Footer";
import { motion } from "framer-motion";
import SigninForm from "../componenets/SigninForm";
import { useRouter } from "next/router";

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
  );
}

function signInPage() {
  return (
    <div className="">
      <Navigator
        NavigatorHeader={
          <>
            <div className="flex  md:flex-row flex-col justify-between items-center mt-20 gap-10 m-10 ">
              <SigninForm></SigninForm>
              <div className="md:w-1/2  order-1  ">
                <FadeInWhenVisible>
                  <img src="login.svg" />
                </FadeInWhenVisible>
              </div>
            </div>
          </>
        }
      ></Navigator>
    </div>
  );
}

export default signInPage;
