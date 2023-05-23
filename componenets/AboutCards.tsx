import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
interface AboutCardsProps {
  image: string
  title: string
  subtitle: string
}

function AboutCards({ image, title, subtitle }: AboutCardsProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      className=" mx-5 flex flex-col gap-4 border  md:mb-0 mb-5  md:w-1/3  rounded-2xl shadow-2xl items-center"
    >
      <img src={image} alt="about image" className="top-rounded" />

      <p className="font-bold text-xl">{title}</p>
      <p className="p-5 text-center pt-0"> {subtitle}</p>
    </motion.div>
  )
}

export default AboutCards
