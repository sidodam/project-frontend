import React, { useContext, useState } from 'react'

import { AuthContext } from '../componenets/AuthContext'

import { AppShell, Navbar, Header, Burger } from '@mantine/core'

import { useWindowScroll } from '@mantine/hooks'

import { AiFillHome } from 'react-icons/ai'
import { MdAccountCircle } from 'react-icons/md'
import { BsFillPeopleFill } from 'react-icons/bs'
import { RiCompassDiscoverFill } from 'react-icons/ri'
import { MdPlace } from 'react-icons/md'
import { GoSignOut } from 'react-icons/go'
import Image from 'next/image'
import { useMediaQuery } from '@mantine/hooks'
import HeaderSearchBar from './HeaderSearchBar'
import { BsFillChatDotsFill } from 'react-icons/bs'
import SimpleListMenu from './SimpleListMenu'
export default function HeaderNavbar() {
  const [opened, setOpened] = useState(false)
  const [scroll, scrollTo] = useWindowScroll()

  const isBelow = scroll.y > 50 ? true : false
  const tablet = useMediaQuery('(max-width: 1280px)')
  const { user } = useContext(AuthContext) as any

  const signOut = () => {
    localStorage.removeItem('user')
    window.location.reload()
  }

  return (
    <>
      <AppShell
        styles={(theme) => ({
          main: {
            minHeight: `60vh`,
          },
        })}
        //bg-[url('/womanbag.svg')]
        className={` bg-slate-100 md:mx-5 4  flex justify-center items-center  `}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        fixed
        navbar={
          <Navbar
            p="md"
            className={`  w-[50%] xl:hidden     ${
              opened
                ? 'brbr opacity-100 block'
                : ' opacity-0 hidden delay-500  brbr2 '
            } ${isBelow ? '' : 'bg-transparent text-white '}  `}
          >
            <div
              className={`flex flex-col gap-4 items-start  text-xl    ${
                opened ? '' : 'hidden'
              }`}
            >
              {/* to hide hamb menu items    */}

              <div className=" flex items-center justify-center gap-2 text-black font-semibold ">
                <AiFillHome />
                <a href="/"> Home</a>
              </div>
              {user ? (
                <>
                  <div className="flex items-center justify-center gap-2 text-black font-semibold order-1">
                    <GoSignOut></GoSignOut>
                    <button
                      onClick={signOut}
                      className="flex items-center justify-center text-xl gap-2 text-red-600 font-bold  "
                    >
                      Sign out
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className=" flex items-center justify-center gap-2 text-black font-semibold ">
                    <MdAccountCircle />
                    <a href="/signInPage">Sign in </a>
                  </div>

                  <div className=" flex items-center justify-center gap-2 text-black font-semibold ">
                    <MdAccountCircle />
                    <a href="/signUpPage">Register</a>
                  </div>
                </>
              )}

              <div className=" flex items-center justify-center gap-2 text-black font-semibold ">
                <BsFillPeopleFill />
                <a href="/about">About</a>
              </div>

              <div className=" flex items-center justify-center gap-2 text-black font-semibold ">
                <MdPlace />
                <a href="/discover">Discover</a>
              </div>

              <div className=" flex items-center justify-center gap-2 text-black font-semibold whitespace-nowrap ">
                <RiCompassDiscoverFill />
                <a href="/contactus">Contact us</a>
              </div>

         

              {/* <div className=" flex items-center justify-center gap-2 text-black font-semibold ">
                <BsFillChatDotsFill />
                <a href="/admin">Admin Panel</a>
              </div> */}
            </div>
          </Navbar>
        }
        header={
          <Header
            height={70}
            p="md"
            className={` text-lg ${
              isBelow ? 'bg-white' : 'bg-transparent border-0 text-black'
            }`}
          >
            <div
              className={`flex items-center h-[100%] justify-between overflow-hidden `}
            >
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                // color={theme.colors.gray[6]}
                mr="xl"
                className=" order-1  block xl:hidden  "
              />

              <a href="#" className={`mt-[2.9rem]  z-10  ml-5`}>
                <Image
                  src="/st.svg"
                  alt="Spain travels"
                  width={200}
                  height={200}
                  className=" h-full"
                />
              </a>

              <nav className=" xl:flex hidden justify-end mr-40 h-20 items-center fixed top-0 left-0 right-0">
                <div>
                  <ul className=" flex gap-11 items-center  -mt-4 justify-between ">
                    <li className="hover:text-[#4f47ea] transition-all  ">
                      <a href="/">Home</a>
                    </li>

                    <li className="hover:text-[#4f47ea] transition-all  ">
                      <a href="/about">About</a>
                    </li>
                    <li className="hover:text-[#4f47ea] transition-all  ">
                      <a href="/discover">Discover</a>
                    </li>
                    <li className="hover:text-[#4f47ea] transition-all  ">
                      <a href="/contactus" className=" cursor-pointer">
                        Contact us
                      </a>
                    </li>

                    <li className="hover:text-[#4f47ea] transition-all  ">
                      <a href="/chatPreface" className=" cursor-pointer">
                        SpainTalk
                      </a>
                      <sub className="text[50%] font-semibold italic ml-1 cursor-pointer">
                        Beta
                      </sub>
                    </li>

                    <div className="flex gap-4 items-center">
                      {user ? (
                        <>
                          <div>
                            <SimpleListMenu
                              name={user.username}
                              id={user._id}
                            ></SimpleListMenu>
                          </div>

                          <button
                            onClick={signOut}
                            className="border px-10 py-1 transition-all fadein  bg-white font-semibold  rounded-lg hover:bg-red-600 hover:text-white"
                          >
                            Sign out
                          </button>
                        </>
                      ) : (
                        <>
                          <button>
                            <a
                              href="/signInPage"
                              className=" cursor-pointer    px-10 py-1  transition-all fadein    font-semibold mt-10 rounded-lg hover:bg-red-600 hover:text-white"
                            >
                              Sign in
                            </a>
                          </button>

                          <button>
                            <a
                              href="/signUpPage"
                              className=" cursor-pointer border px-10 py-1 transition-all fadein  bg-white font-semibold mt-10 rounded-lg hover:bg-red-600 hover:text-white"
                            >
                              Register
                            </a>
                          </button>
                        </>
                      )}
                    </div>
                  </ul>
                </div>
              </nav>
            </div>
          </Header>
        }
      >
        <div
          className={`${
            !isBelow && opened && tablet ? 'blur-md transition-all ' : ''
          }   `}
        >
          <div
            className={`flex   gap-2   md:flex-row flex-col  md:mx-10 xl:justify-around    justify-between md:my-10`}
          >
            <div className="  md:self-center fadein">
              <div className="">
                <h1 className="my-4 text-slate-700">Live your best moments</h1>

                <HeaderSearchBar></HeaderSearchBar>
              </div>
            </div>

            <Image
              src="/womanbag.svg"
              alt="Spain travels"
              width={400}
              height={400}
            />
          </div>
        </div>

        {/* <div className=" flex justify-center items-center">
      
      <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, error.</p></div> */}
      </AppShell>
    </>
  )
}
