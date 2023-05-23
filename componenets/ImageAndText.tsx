import { motion } from 'framer-motion'
interface ImageAndTextProps {
  image: string
  children: string
  title: string
  className?: string
  imageClassName?: string
  twentyM?: boolean
  textClassName?: string
}

function FadeInWhenVisible({ children }: any) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0 },
      }}
    >
      {children}
    </motion.div>
  )
}

function ImageAndText({
  image,
  children,
  title,
  className,
  imageClassName,
  twentyM,
  textClassName
}: ImageAndTextProps) {
  return (
    <FadeInWhenVisible>
      <div
        className={`flex md:flex-row flex-col items-center justify-around mx-5  md:w-[85%] md:m-auto  ${className}`}
      >
        <div className={`md:w-1/2 ${textClassName}   mx-5  m-auto `}>
          <p className="font-bold mb-5 text-3xl text-center text-slate-600  ">

            {title}
          </p>
          <div className="flex flex-col gap-10  ">
            <p className=" text-xl text-center leading-[1.45] text-[#7b7878]">
              {children}
            </p>
          </div>
        </div>

        <div className={`md:w-1/2 ${imageClassName} `}>
          <img src={image} ></img>
        </div>
      </div>
    </FadeInWhenVisible>
  )
}

export default ImageAndText
