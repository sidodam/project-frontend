import React from "react";
import Image from "next/image";
import { FiFacebook } from "react-icons/fi";
import { FiTwitter } from "react-icons/fi";
import { FiInstagram } from "react-icons/fi";
function Footer() {
  return (
    <div className="flex md:flex-row relative flex-col justify-between bg-slate-700">
      <p className=" text-slate-300 absolute top-[90%] left-4  whitespace-nowrap italic ">
        Spain travels © 2023 all rights reserved{" "}
      </p>
      <div className=" flex  md:gap-40  justify-evenly   py-10">
        <div className="flex flex-col gap-4 text-[#f7f7f7] mx-5">
          <p className="font-bold">MENU</p>

          <a href="/about">About us</a>
          <a href="/contactus">Contact</a>
          <a href="https://www.dropbox.com/s/bbdjf2ty3w83oq8/FAQ-COVID_19.pdf?dl=1">
            COVID-19 FAQ
          </a>
        </div>

        <div className="useful-links flex flex-col gap-4 text-[#f7f7f7] ">
          <p className="font-bold">LEGAL</p>

          <a href="https://www.dropbox.com/s/gppqvrbzadad426/Politica_de_cookies.pdf?dl=1">
            Cookies Policy
          </a>
          <a href="https://www.dropbox.com/s/6v2ay1uqlygata4/privacy-policy-es_ES-20210706.pdf?dl=1">
            Privacy Policy
          </a>
        </div>

        <div className=" social-media flex flex-col gap-4 text-[#f7f7f7] ">
          <p className="font-bold">SOCIAL</p>

          <div className="flex gap-4">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.facebook.com/profile.php?id=100082140622579"
            >
              <FiFacebook />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://mobile.twitter.com/travels_spain"
            >
              <FiTwitter />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.instagram.com/spaintravels96/"
            >
              <FiInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="go-top flex flex-col  items-end">
        <a href="#" className={` md:m-auto md:block hidden z-10  `}>
          <Image
            src="/st.svg"
            alt="Spain travels"
            width={200}
            height={200}
            className=" white-logo "
          />
        </a>
      </div>
    </div>
  );
  //
}

export default Footer;
